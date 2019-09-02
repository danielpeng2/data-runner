import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'

import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
import LoginForm from './components/login/LoginForm'
import LoadingSpinner from './components/LoadingSpinner'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

import activitiesService from './services/activities'
import loginService from './services/login'
import userService from './services/user'

import authUtils from './utils/authUtils'
import localStorageUtils from './utils/localStorageUtils'

const App = () => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorageUtils.getLoggedInUser()
    if (loggedInUser) {
      setLoggedInUser(loggedInUser)
    }
  }, [])

  const setLoggedInUser = async(user) => {
    setUser(user)
    authUtils.setAuthHeader(user.token)
    setLoading(true)
    const data = await userService.getUserData()
    setLoading(false)
    setUserData(data)
  }

  const handleLogin = async(credentials) => {
    try {
      const user = await loginService.login(credentials)
      localStorageUtils.saveLoggedInUser(user)
      setLoggedInUser(user)
    } catch(err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorageUtils.removeLoggedInUser()
    authUtils.removeAuthHeader()
    setUser(null)
    setUserData(null)
  }

  const handleRegister = async(credentials) => {
    try {
      const user = await loginService.register(credentials)
      localStorageUtils.saveLoggedInUser(user)
      setLoggedInUser(user)
    } catch(err) {
      console.log(err)
    }
  }

  const handleUpload = async(files) => {
    setLoading(true)
    const newActivities = await activitiesService.upload(files)
    setLoading(false)
    setUserData({
      ...userData,
      activities: userData.activities.concat(newActivities),
    })
  }

  const handleDelete = async(id) => {
    setLoading(true)
    await activitiesService.deleteActivity(id)
    setLoading(false)
    setUserData({
      ...userData,
      activities: userData.activities.filter((activity) => activity.id !== id)
    })
  }

  return (
    <Router>
      {loading && <LoadingSpinner />}
      <Switch>
        <PublicRoute 
          user={user} 
          exact path='/' 
          render={() => <Home />}
        />
        <PublicRoute 
          user={user} 
          exact path='/login' 
          render={() => 
            <LoginForm 
              handleLogin={handleLogin} 
              handleRegister={handleRegister}
            />}
        />
        <PrivateRoute 
          user={user} 
          exact path='/user' 
          render={() => 
            <Dashboard 
              user={user}
              userData={userData}
              loading={loading}
              handleLogout={handleLogout}
              handleUpload={handleUpload}
              handleDelete={handleDelete}
            />}
        />
      </Switch>
    </Router>
  )
}

export default App;
