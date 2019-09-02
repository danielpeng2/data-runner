import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Container = styled.div`
  position: fixed;
  top: 2em;
  left: 2em;
`

const LoadingSpinner = () => (
  <Container>
    <Spin />
  </Container>
)

export default LoadingSpinner
