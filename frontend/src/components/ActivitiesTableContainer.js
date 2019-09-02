import React from 'react'
import { Table } from 'antd'

import formatUtils from '../utils/formatUtils' 

const ActivitiesTableContainer = ({ activities }) => {
  const data = activities.reverse()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',      
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',      
    },
    {
      title: 'Pace',
      dataIndex: 'pace',
      key: 'pace',      
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <a>Delete</a>
      ),
    },
  ]
  const dataSource = data.map((activity) => ({
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
