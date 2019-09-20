import React from 'react'
import { connect } from 'react-redux'
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

const Dashboard = ({ activities }) => {
  const getDashboardComponents = () => {
    if (activities === null) {
      return <div>Loading activities.</div>
    } else if (activities.length === 0) {
      return <Empty />
    } else {
      return (
        <Tabs defaultActiveKey="1" >
          <TabPane tab='Dashboard' key='1'>
            {withCard(
              'Total Stats',
              <TotalStatsContainer activities={activities} />
            )}
            {withCard(
              'Past 12 Months',
              <HistoryHeatmapContainer activities={activities} />
            )}
            {withCard(
              'Heatmap',
              <ActivityHeatmapContainer activities={activities} />
            )}
          </TabPane>
          <TabPane tab='Activities' key='2'>
            <ActivitiesTableContainer activities={activities} />
          </TabPane>
        </Tabs>
      )
    }
  }
  return (
    <DashboardContainer>
      <Header />
      <ColumnContainer>
        {getDashboardComponents()}
      </ColumnContainer>
    </DashboardContainer>
  )
}

const mapStateToProps = (state) => ({
  activities: state.activities
})

export default connect(mapStateToProps)(Dashboard)
