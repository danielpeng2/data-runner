import React from 'react'

import HistoryHeatmap from './HistoryHeatmap'
import dateUtils from '../../utils/dateUtils'
import formatUtils from '../../utils/formatUtils'

const HistoryHeatmapContainer = ({ activities }) => {
  const curYear = new Date().getFullYear()
  const curMonth = new Date().getMonth()

  const last12Months = dateUtils.getLast12MonthsArray()
  let highestDistance = 0
  activities.forEach((activity) => {
    const newDate = new Date(activity.date)
    const newYear = newDate.getFullYear()
    const newMonth = newDate.getMonth()
    const monthIndex = 11 - (curYear - newYear) * 12 - (curMonth - newMonth)
    if (monthIndex >= 0) {
      const dayIndex = newDate.getDate() - 1
      last12Months[monthIndex].data[dayIndex] += activity.distance
      highestDistance = Math.max(highestDistance, Math.ceil(last12Months[monthIndex].data[dayIndex]))
    }
  })
  const seriesData = last12Months.map((month) => (
    {
      ...month,
      data: month.data.map((dist) => formatUtils.formatDistance(dist))
    }
  ))
  return (
    <div>
      <h2>Past 12 Months</h2>
      <HistoryHeatmap 
        seriesData={seriesData.reverse()} 
        highestDistance={highestDistance} />
    </div>
  )
}

export default HistoryHeatmapContainer