import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { onClickTnc } from 'actions/ipfs'
import * as Actions from 'actions/trade'

import Input, { Checkbox, Slider } from 'components/Input'
import Avatar from 'components/Avatar'
import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import Button from 'components/Button'
import Hr from 'components/Hr'
import { Trade } from 'components/Icon'

import { useLang } from 'language'
import theme from 'theme'
import styled from 'styled-components'
import { getDate, getHour, getMinute, getSecond, toToken, dateDif } from '../../../lib/util'
import { useInterval } from '../../../lib/react'

const clockCircleSize = 50
const Circle = styled(Col)`
  width: ${clockCircleSize}px;
  height: ${clockCircleSize}px;
  background-color: ${p => p.theme.bgColorLight};
  border-radius: ${clockCircleSize}px;
  margin-bottom: 4px;
`
const SliderBox = styled(Col)`
  margin-top: ${p => p.theme.spacingBase}
  margin-left: -${p => p.theme.spacingM}
`
function Clock({ date }) {
  function updateDate() { return dateDif(Date.now(), date) }
  const [{s, m, h, d}, setDate] = useState(updateDate())
  useInterval(() => setDate(updateDate()), 1000)
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

function Box({ value, text }) {
  return (
    <Col VS RightS>
      <Text bold L>{value}</Text>
      <Text note S>{text}</Text>
    </Col>  
  )
} 

function FundRaising({ market: { ctPrice, ctCount, ctRecyclePrice, symbol, numberOfSub, closingTime } }) {
  const [{ sutSymbol }] = useLang()
  return (
    <Col bgDark HL>
      <Text sectionTitle>Token Offering Phase</Text>
      <Hr />
      <Row>
        <Col flex={1} MarginRightXL>
          <Row TopS BottomBase bottom>
            <Text XL nowrap wordSpaceM>Fund Raised : {'????' || toToken(500000)}</Text>
            <Text S nowrap>{sutSymbol}</Text>
          </Row>
          <Text note wordSpaceS>Target: {toToken(ctPrice * ctCount)}</Text>
          <SliderBox>
            <Slider value={0.3} disabled />
          </SliderBox>
          <Row wrap='true'>
            <Box text={`Offering Price(${sutSymbol})`} value={toToken(ctPrice)} />
            <Box text={`Total ${symbol}`} value={toToken(ctCount)} />
            <Box text='Joined Users' value={numberOfSub} />
            <Box text={`Recycle Price(${sutSymbol})`} value={toToken(ctRecyclePrice)} />
            <Box text='Available Investment Fund' value={toToken((ctPrice-ctRecyclePrice) * ctCount)} />
          </Row>
        </Col>
        <Col width='280px' right VS>
          <Clock date={closingTime} />
          <Text right note S>This project will only be funded if it reaches its goal by {closingTime}</Text>
        </Col>
      </Row>
    </Col>
  )
}

const mapStateToProps = state => ({
  market: state.market
  // symbol: state.market.symbol,
  // trade: state.trade
})

const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(FundRaising)