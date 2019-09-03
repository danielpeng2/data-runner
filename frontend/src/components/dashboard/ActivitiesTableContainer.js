import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'

import formatUtils from '../../utils/formatUtils'

const Action = styled.div`
  color: #1890ff;
  transition: 0.3s;
  &:hover {
    color: #40a9ff;
    cursor: pointer;
  }
`

const ActivitiesTableContainer = ({ activities, handleDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
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
        <Action onClick={() => handleDelete(activity.id)}>Delete</Action>
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
    <Table 
      columns={columns} 
      dataSource={dataSource} />
  )
}

export default ActivitiesTableContainer
