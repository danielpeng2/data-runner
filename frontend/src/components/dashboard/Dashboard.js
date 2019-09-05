import React from 'react'
import { Empty, Tabs } from 'antd'
import styled from 'styled-components'

import ActivityHeatmapContainer from './ActivityHeatmapContainer'
import ActivitiesTableContainer from './ActivitiesTableContainer'
import Header from './Header'
import HistoryHeatmapContainer from './HistoryHeatmapContainer'
import TotalStatsContainer from './TotalStatsContainer'
import withCard from './withCard'

const { TabPane } = Tabs

const DashboardContainer = styled.div`
  background-color: #F5F5FA;
  min-height: 100vh;
  padding-bottom: 1em;
  width: 100%;
`

const ColumnContainer = styled.div`
  margin: 0 auto;
  max-width: 60em;
`

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
      return <Empty />
    } else {
      return (
        <Tabs defaultActiveKey="1" >
          <TabPane tab='Dashboard' key='1'>
            {withCard(
              'Total Stats',
              <TotalStatsContainer activities={userData.activities} />
            )}
            {withCard(
              'Past 12 Months',
              <HistoryHeatmapContainer activities={userData.activities} />
            )}
            {withCard(
              'Heatmap',
              <ActivityHeatmapContainer activities={userData.activities} />
            )}
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
    <DashboardContainer>
      <Header 
        username={user.username}
        handleLogout={handleLogout}
        handleUpload={handleUpload} />
      <ColumnContainer>
        {getDashboardComponents()}
      </ColumnContainer>
    </DashboardContainer>
  )
}

export default Dashboard
