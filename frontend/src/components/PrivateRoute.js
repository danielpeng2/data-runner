import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ render, user, ...rest }) => (
  <Route 
    {...rest}
    render={user ? render : () => <Redirect to='/' />}
  />
)

export default PrivateRoute
