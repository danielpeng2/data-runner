import React from 'react'

import ActivityHeatmapContainer from './ActivityHeatmap/ActivityHeatmapContainer'
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
        ? <div> 
            <TotalStatsContainer activities={userData.activities} />
            <ActivityHeatmapContainer activities={userData.activities} />
          </div>
        : <div>loading</div>}
    </div>
  )
}

export default Dashboard
