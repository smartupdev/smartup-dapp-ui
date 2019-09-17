import React, { useEffect, useState } from 'react'
import { useInterval } from 'lib/react'
import { getDate, getHour, getMinute, getSecond, toToken, dateDif, getMonth } from 'lib/util'
import styled from 'styled-components'

import { Row, Col } from 'components/Layout'
import Text from 'components/Text'


const clockCircleSize = 50
const Circle = styled(Col)`
  width: ${clockCircleSize}px;
  height: ${clockCircleSize}px;
  background-color: ${p => p.theme.bgColorLight};
  border-radius: ${clockCircleSize}px;
  margin-bottom: 4px;
`

export default function Clock({ endDate, startDate = Date.now(), timeIntervalInMs = 1000 }) {
  function updateDate() { return dateDif(startDate, `2019-${getMonth(Date.now())}-${getDate(Date.now())} 18:00` || endDate) }
  const [{s, m, h, d}, setDate] = useState(updateDate())
  useInterval(() => setDate(updateDate()), timeIntervalInMs)
  return (
    <Row BottomS>
      {[
        { label: 'DAY', value: d },
        { label: 'HOUR', value: h },
        { label: 'MIN', value: m },
        { label: 'SECOND', value: s },
      ].map( ({ value, label }) => 
        <Col center LeftS key={label}>
          <Circle center centerVertical><Text L note>{value}</Text></Circle>
          <Text S note>{label}</Text>
        </Col>
      )}
    </Row>
  )
}
