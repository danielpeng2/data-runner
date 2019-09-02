import React from 'react'
import { withRouter } from 'react-router-dom'

const Home = withRouter(({ history }) => {
  const redirectToLogin = (event) => {
    event.preventDefault()
    history.push('/login')
  }
  return (
    <div>
      Welcome to DataRunner!
      <button onClick={redirectToLogin}>Login / Register</button>
    </div>
  )
})

export default Home
