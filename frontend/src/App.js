import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { message } from 'antd'
import 'antd/dist/antd.css'

import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
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
    try {
      const data = await userService.getUserData()
      setUserData(data)
    } catch(err) {
      message.error(err.message)
    }
    setLoading(false)
  }

  const handleLogin = async(credentials) => {
    setLoading(true)
    try {
      const user = await loginService.login(credentials)
      localStorageUtils.saveLoggedInUser(user)
      await setLoggedInUser(user)
    } catch(err) {
      message.error(err.message)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorageUtils.removeLoggedInUser()
    authUtils.removeAuthHeader()
    setUser(null)
    setUserData(null)
  }

  const handleRegister = async(credentials) => {
    setLoading(true)
    try {
      const user = await loginService.register(credentials)
      localStorageUtils.saveLoggedInUser(user)
      await setLoggedInUser(user)
    } catch(err) {
      message.error(err.message)
    }
    setLoading(false)
  }

  const handleUpload = async(files) => {
    setLoading(true)
    try {
      if (!files || !files.length) {
        throw Error('please select files before uploading')
      }
      const newActivities = await activitiesService.upload(files)
      message.success('Upload successful')
      setUserData({
        ...userData,
        activities: userData.activities.concat(newActivities),
      })
    } catch(err) {
      message.error(err.message)
    }
    setLoading(false)
  }

  const handleDelete = async(id) => {
    setLoading(true)
    try {
      await activitiesService.deleteActivity(id)
      message.success('Delete successful')
      setUserData({
        ...userData,
        activities: userData.activities.filter((activity) => activity.id !== id)
      })
    } catch(err) {
      message.error(err.message)
    }
    setLoading(false)
  }

  return (
    <Router>
      {loading && <LoadingSpinner />}
      <Switch>
        <PublicRoute 
          user={user} 
          exact path='/' 
          render={() => 
            <Home
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
