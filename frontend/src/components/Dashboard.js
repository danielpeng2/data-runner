import React from 'react'

import TotalStatsContainer from './TotalStats/TotalStatsContainer'
import UploadForm from './UploadForm'

const Dashboard = ({ 
  user,
  userData,
  handleLogout,
  handleUpload,
}) => {
  return (
    <div>
      Dashboard for {user.username}
      <button onClick={handleLogout}>Log out</button>
      <UploadForm handleUpload={handleUpload} />
      {userData
        ? <TotalStatsContainer activities={userData.activities} />
        : <div>loading</div>}
    </div>
  )
}

export default Dashboard
