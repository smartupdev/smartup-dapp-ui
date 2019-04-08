import React, { useState } from 'react'
import styled from 'styled-components'
import Text from '../../components/Text'
import Hr from '../../components/Hr'
import ProgressBar from '../../components/ProgressBar'
import { Row, Col } from '../../components/Layout'
const options = ['Basic Information', 'Price Equation', 'Deposit', 'End', 'cc']
export default () => {
  const [activeIndex, setIndex] = useState(1)
  function add() {
    setIndex(activeIndex+1)
  }
  return (
    <Col>
      <Col center spacingBottomXS spacingTopXS>
        <Text center>CREATE MARKET</Text>
      </Col>
      <Hr />
      <ProgressBar options={options} activeIndex={activeIndex} onClick={add} />
    </Col>
  )
}