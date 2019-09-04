import React from 'react'
import { Statistic, Row, Col } from 'antd'
import styled from 'styled-components'

const Break = styled.div`
  margin-bottom: 1em;
`

const TotalStats = ({ 
  activityCount,
  totalDistance,
  totalTime,
  averageDistance,
  averagePace,
}) => (
  <div>
    <Row gutter={16}>
      <Col span={8}>
        <Statistic title="Activities" value={activityCount} />
      </Col>
      <Col span={8}>
        <Statistic title="Distance" value={`${totalDistance} km`} />
      </Col>
      <Col span={8}>
        <Statistic title="Time" value={totalTime} />
      </Col>
    </Row>
    <Break />
    <Row gutter={16}>
      <Col span={8} />
      <Col span={8}>
        <Statistic title="Average Distance" value={`${averageDistance} km`} />
      </Col>
      <Col span={8}>
        <Statistic title="Average Pace" value={averagePace} />
      </Col>
    </Row>
  </div>
)

export default TotalStats
