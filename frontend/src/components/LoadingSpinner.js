import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Spinner = styled(Spin)`
  position: fixed;
  top: 6.5em;
  left: 2em;
`

const LoadingSpinner = () => (
  <Spinner />
)

export default LoadingSpinner
