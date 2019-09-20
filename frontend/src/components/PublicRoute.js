import React from 'react'
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ render, user, ...rest }) => (
  <Route 
    {...rest}
    render={user ? () => <Redirect to='/user' /> : render}
  />
)

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(PublicRoute)
