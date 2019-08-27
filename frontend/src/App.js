import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (loginData) => {
    console.log(loginData)
  }

  const handleRegister = (loginData) => {
    console.log(loginData)
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Home />}/>
        <Route exact path='/login' render={() => 
          <LoginForm 
            handleLogin={handleLogin} 
            handleRegister={handleRegister}
          />
        }/>
        <PrivateRoute user={user} exact path='/dashboard' render={() => <Dashboard />}/>
      </Switch>
    </Router>
  )
}

export default App;
