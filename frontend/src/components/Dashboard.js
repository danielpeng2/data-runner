import React from 'react'

import ActivityHeatmapContainer from './ActivityHeatmap/ActivityHeatmapContainer'
import HistoryHeatmapContainer from './HistoryHeatmap/HistoryHeatmapContainer'
import TotalStatsContainer from './TotalStats/TotalStatsContainer'
import UploadForm from './UploadForm'

const Dashboard = ({ 
  user,
  userData,
  handleLogout,
  handleUpload,
}) => {
  const getDashboardComponents = () => {
    if (!userData) {
      return <div>Loading</div>
    } else if (userData.activities.length === 0) {
      return <div>Upload an activity to get started!</div>
    } else {
      return (
        <div> 
          <TotalStatsContainer activities={userData.activities} />
          <HistoryHeatmapContainer activities={userData.activities} />
          <ActivityHeatmapContainer activities={userData.activities} />
        </div>
      )
    }
  }
  return (
    <div>
      Dashboard for {user.username}
      <button onClick={handleLogout}>Log out</button>
      <UploadForm handleUpload={handleUpload} />
      {getDashboardComponents()}
    </div>
  )
}

export default Dashboard
