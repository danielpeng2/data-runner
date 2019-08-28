import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

import localStorageUtils from './utils/localStorageUtils'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorageUtils.getLoggedInUser()
    if (loggedInUser) {
      setLoggedInUser(loggedInUser)
    }
  }, [])

  const setLoggedInUser = (user) => {
    setUser(user)
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

  const handleRegister = async(credentials) => {
    try {
      const user = await loginService.register(credentials)
      localStorageUtils.saveLoggedInUser(user)
      setLoggedInUser(user)
    } catch(err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorageUtils.removeLoggedInUser()
    setUser(null)
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
              handleLogout={handleLogout}
            />}
        />
      </Switch>
    </Router>
  )
}

export default App;
