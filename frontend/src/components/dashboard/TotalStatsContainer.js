import React from 'react'

import formatUtils from '../../utils/formatUtils'
import TotalStats from './TotalStats'

const TotalStatsContainer = ({ activities }) => {
  const activityCount = activities.length
  let totalDistance = 0
  let totalTime = 0
  activities.forEach((activity) => {
    totalDistance += activity.distance
    totalTime += activity.time
  })
  const averageDistance = totalDistance / activityCount
  const averagePace = Math.round(totalTime / totalDistance)

  return (
    <TotalStats
      activityCount={activityCount}
      totalDistance={formatUtils.formatDistance(totalDistance)}
      totalTime={formatUtils.formatTime(totalTime)}
      averageDistance={formatUtils.formatDistance(averageDistance)}
      averagePace={formatUtils.formatTime(averagePace)} />
  )
}

export default TotalStatsContainer
