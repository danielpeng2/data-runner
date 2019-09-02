import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'

import Dashboard from './components/Dashboard'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
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

  useEffect(() => {
    const loggedInUser = localStorageUtils.getLoggedInUser()
    if (loggedInUser) {
      setLoggedInUser(loggedInUser)
    }
  }, [])

  const setLoggedInUser = async(user) => {
    setUser(user)
    authUtils.setAuthHeader(user.token)
    const data = await userService.getUserData()
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
    const newActivities = await activitiesService.upload(files)
    setUserData({
      ...userData,
      activities: userData.activities.concat(newActivities),
    })
  }

  return (
    <Router>
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
              handleLogout={handleLogout}
              handleUpload={handleUpload}
            />}
        />
      </Switch>
    </Router>
  )
}

export default App;
