import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import styled from 'styled-components'

import { deleteActivity } from '../../actions/activityActions'
import formatUtils from '../../utils/formatUtils'

const Action = styled.div`
  color: #1890ff;
  transition: 0.3s;
  &:hover {
    color: #40a9ff;
    cursor: pointer;
  }
`

const ActivityTable = styled(Table)`
  background-color: #ffffff;
`

const ActivitiesTableContainer = ({ activities, deleteActivity }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
    },
    {
      title: 'Time',
      dataIndex: 'time',   
    },
    {
      title: 'Distance',
      dataIndex: 'distance', 
    },
    {
      title: 'Pace',
      dataIndex: 'pace', 
    },
    {
      title: 'Action',
      render: (activity) => (
        <Action onClick={() => deleteActivity(activity.id)}>Delete</Action>
      ),
    },
  ]
  const dataSource = activities.map((activity, i) => ({
    key: i,
    id: activity.id,
    name: activity.name,
    date: formatUtils.formatDate(new Date(activity.date)),
    time: formatUtils.formatTime(activity.time),
    distance: `${formatUtils.formatDistance(activity.distance)} km`,
    pace: formatUtils.formatTime(activity.pace),
  }))
  return (
    <ActivityTable 
      columns={columns} 
      dataSource={dataSource}
      pagination={false} />
  )
}

export default connect(
  null,
  { deleteActivity }
)(ActivitiesTableContainer)
