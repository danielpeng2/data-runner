import React, { useState } from 'react'

const LoginForm = ({
  handleLogin,
  handleRegister,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginEvent = (event) => {
    event.preventDefault();
    handleLogin({
      'username': username,
      'password': password
    })
  }

  const handleRegisterEvent = (event) => {
    event.preventDefault();
    handleRegister({
      'username': username,
      'password': password
    })
  }

  return (
    <div>
      <form onSubmit={handleLoginEvent}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
        <button onClick={handleRegisterEvent}>register</button>
      </form>
    </div>
  )
}

export default LoginForm
