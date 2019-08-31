import React from 'react'

import ActivityHeatmap from './ActivityHeatmap'

const ActivityHeatmapContainer = ({ activities }) => {
  let coords = []
  activities.forEach((activity) => {
    coords = coords.concat(activity.coords)
  })
  return (
    <div>
      <h2>Heatmap</h2>
      <ActivityHeatmap
        center={coords[0]}
        coords={coords} />
    </div>
  )
}

export default ActivityHeatmapContainer
