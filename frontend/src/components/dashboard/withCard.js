import React from 'react'
import { Card } from 'antd'
import styled from 'styled-components'

const WidgetCard = styled(Card)`
  margin-bottom: 1em;
`

const withCard = (title, render) => (
  <WidgetCard title={title} bordered={false}>
    {render}
  </WidgetCard>
)

export default withCard
