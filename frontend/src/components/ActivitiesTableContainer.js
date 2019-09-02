import React from 'react'
import { Table } from 'antd'

import formatUtils from '../utils/formatUtils' 

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
        <a onClick={() => handleDelete(activity.id)}>Delete</a>
      ),
    },
  ]
  const dataSource = activities.map((activity) => ({
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
