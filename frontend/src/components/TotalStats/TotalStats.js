import React from 'react'


const TotalStats = ({ 
  activityCount,
  totalDistance,
  totalTime,
  averageDistance,
  averagePace,
}) => (
  <div>
    <h2>Total Stats</h2>
    <div>Activities: {activityCount}</div>
    <div>Distance: {totalDistance} km</div>
    <div>Time: {totalTime}</div>
    <div>Average Distance: {averageDistance} km</div>
    <div>Average Pace: {averagePace} /km</div>
  </div>
)

export default TotalStats
