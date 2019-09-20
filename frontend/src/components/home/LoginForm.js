import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Input, Button } from 'antd'
import styled from 'styled-components'

import { loginUser, registerUser } from "../../actions/loginActions"

const FormItem = styled.div`
  margin-bottom: 1em;
`

const SubmitButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginEvent = (event) => {
    event.preventDefault();
    props.loginUser({
      'username': username,
      'password': password
    })
  }

  const handleRegisterEvent = (event) => {
    event.preventDefault();
    props.registerUser({
      'username': username,
      'password': password
    })
  }

  return (
    <form onSubmit={handleLoginEvent} >
      <FormItem>
        <Input
          placeholder='Username'
          value={username}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={({ target }) => setUsername(target.value)} />
      </FormItem>
      <FormItem>
        <Input.Password 
          placeholder='Password'
          value={password}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={({ target }) => setPassword(target.value)} />
      </FormItem>
      <SubmitButtonsContainer>
        <Button type='primary' htmlType='submit'>
          Log in
        </Button>
        <Button onClick={handleRegisterEvent}>
          Register
        </Button>
      </SubmitButtonsContainer>
    </form>
  )
}

export default connect(
  null,
  { loginUser, registerUser }
)(LoginForm)
