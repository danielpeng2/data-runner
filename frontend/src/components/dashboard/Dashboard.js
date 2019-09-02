import React from 'react'
import { Tabs } from 'antd'

import ActivityHeatmapContainer from './ActivityHeatmapContainer'
import ActivitiesTableContainer from './ActivitiesTableContainer'
import HistoryHeatmapContainer from './HistoryHeatmapContainer'
import TotalStatsContainer from './TotalStatsContainer'
import UploadForm from './UploadForm'

const { TabPane } = Tabs

const Dashboard = ({ 
  user,
  userData,
  handleLogout,
  handleUpload,
  handleDelete,
}) => {
  const getDashboardComponents = () => {
    if (!userData) {
      return <div>Loading activities.</div>
    } else if (userData.activities.length === 0) {
      return <div>Upload an activity to get started!</div>
    } else {
      return (
        <Tabs defaultActiveKey="1">
          <TabPane tab='Dashboard' key='1'>
            <TotalStatsContainer activities={userData.activities} />
            <HistoryHeatmapContainer activities={userData.activities} />
            <ActivityHeatmapContainer activities={userData.activities} />
          </TabPane>
          <TabPane tab='Activities' key='2'>
            <ActivitiesTableContainer 
              activities={userData.activities} 
              handleDelete={handleDelete} />
          </TabPane>
        </Tabs>
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
