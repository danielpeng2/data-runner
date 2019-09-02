import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: #0083f7;
  font-size: 3em;
  font-weight: bold;
`

const LandingInfo = () => (
  <div>
    <h4>Welcome to</h4>
    <Title>Data Runner</Title>
    <p>Upload your activity files to get interesting stats, heatmaps, and more!</p>
    <p>Sign in or register to get started!</p>
  </div>
)

export default LandingInfo