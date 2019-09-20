import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'

import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
import LoadingSpinner from './components/LoadingSpinner'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import localStorageUtils from './utils/localStorageUtils'
import { setUserAndGetData } from './actions/loginActions'

const App = ({ loading, setUserAndGetData }) => {
  useEffect(() => {
    const loggedInUser = localStorageUtils.getLoggedInUser()
    if (loggedInUser) {
      setUserAndGetData(loggedInUser)
    }
  }, [setUserAndGetData])

  return (
    <Router>
      {loading && <LoadingSpinner />}
      <Switch>
        <PublicRoute 
          exact path='/' 
          render={() => <Home />}
        />
        <PrivateRoute 
          exact path='/user' 
          render={() => <Dashboard />}
        />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  loading: state.loading,
})

export default connect(
  mapStateToProps,
  { setUserAndGetData }
)(App)
