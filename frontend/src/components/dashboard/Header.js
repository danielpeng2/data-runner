import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

import UploadForm from './UploadForm'

const HeaderBar = styled.div`
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
  margin-bottom: 1em;
  padding: 0.2em;
  width: 100%;
`

const ColumnContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
  min-height: 3.5em;
`

const Header = ({ username, handleLogout, handleUpload }) => (
  <HeaderBar>
    <ColumnContainer>
      <UploadForm handleUpload={handleUpload} />
      <div>
        Logged in as <strong>{username}</strong>&nbsp;&nbsp;&nbsp;
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </ColumnContainer>
  </HeaderBar>
)

export default Header
