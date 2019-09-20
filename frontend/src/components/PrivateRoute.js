import React from 'react'
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ render, user, ...rest }) => (
  <Route 
    {...rest}
    render={user ? render : () => <Redirect to='/' />}
  />
)

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)
