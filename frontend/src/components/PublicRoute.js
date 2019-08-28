import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ render, user, ...rest }) => (
  <Route 
    {...rest}
    render={user ? () => <Redirect to='/user' /> : render}
  />
)

export default PublicRoute
