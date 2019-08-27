import React from 'react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogin = props.handleLogin.bind(this)
    this.handleRegister = props.handleRegister.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLoginEvent(event) {
    event.preventDefault();
    this.handleLogin(this.state)
  }

  handleRegisterEvent(event) {
    event.preventDefault();
    this.handleRegister(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLoginEvent.bind(this)}>
          <div>
            username
            <input
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            password
            <input
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <button type='submit'>login</button>
          <button onClick={this.handleRegisterEvent.bind(this)}>register</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
