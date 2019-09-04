import React from 'react'

import ActivityHeatmap from './ActivityHeatmap'

const ActivityHeatmapContainer = ({ activities }) => {
  let coords = []
  activities.forEach((activity) => {
    coords = coords.concat(activity.coords)
  })
  return (
    <ActivityHeatmap
      center={coords[0]}
      coords={coords} />
  )
}

export default ActivityHeatmapContainer
