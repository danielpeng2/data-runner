import React from 'react'
import styled from 'styled-components'

import LandingInfo from './LandingInfo'
import LoginForm from './LoginForm'

import background from'./landing-background.jpg'

const LandingContainer = styled.div`
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`

const Column = styled.div`
  align-items: center;
  display: flex;
  float: left;
  height: 100vh;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }
`

const InfoContainer = styled(Column)`
  background-image: url(${background});
  background-position: center center;
  background-size: cover;
  width: 60%;
`

const LoginContainer = styled(Column)`
  width: 40%;
`

const Home = ({ handleLogin, handleRegister }) => (
  <LandingContainer>
    <InfoContainer>
      <LandingInfo />
    </InfoContainer>
    <LoginContainer>
      <LoginForm 
        handleLogin={handleLogin}
        handleRegister={handleRegister}/>
    </LoginContainer>
  </LandingContainer>
)

export default Home
