import React from 'react'

import UploadForm from './UploadForm'

const Dashboard = ({ 
  user, 
  handleLogout,
  handleUpload,
}) => {
  return (
    <div>
      Dashboard for {user.username}
      <button onClick={handleLogout}>Log out</button>
      <UploadForm handleUpload={handleUpload} />
    </div>
  )
}

export default Dashboard
