import React, { useEffect } from 'react'

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
import { getDate, getHour, getMinute, getSecond, toToken } from '../../../lib/util';

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
  return (
    <Row BottomS>
      {[
        { label: 'DAY', fn: getDate },
        { label: 'HOUR', fn: getHour },
        { label: 'MIN', fn: getMinute },
        { label: 'SECOND', fn: getSecond },
      ].map( ({ fn, label }) => 
        <Col center LeftS key={label}>
          <Circle center centerVertical><Text L note>{fn(date)}</Text></Circle>
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

function FundRaising({ }) {
  const [{ sutSymbol }] = useLang()
  return (
    <Col bgDark HL>
      <Text sectionTitle>Token Offering Phase</Text>
      <Hr />
      <Row>
        <Col flex={1} MarginRightXL>
          <Row TopS BottomBase bottom>
            <Text XL nowrap wordSpaceM>Fund Raised : {toToken(500000)}</Text>
            <Text S nowrap>{sutSymbol}</Text>
          </Row>
          <Text note wordSpaceS>Target: {toToken(1000000)}</Text>
          <SliderBox>
            <Slider value={0.3} disabled />
          </SliderBox>
          <Row wrap='true'>
            <Box text={`Offering Price(${sutSymbol})`} value={10} />
            <Box text='Total CT is issuing' value={100000} />
            <Box text='Number of users joined' value={323} />
            <Box text={`Offering Price(${sutSymbol})`} value={10} />
            <Box text='Total CT is issuing' value={100000} />
          </Row>
        </Col>
        <Col width='280px' right VS>
          <Clock date={Date.now()} />
          <Text right note S>This project will only be funded if it reaches its goal by August 31 2019 2:59 PM HKT</Text>
        </Col>
      </Row>
    </Col>
  )
}

const mapStateToProps = state => ({
  // symbol: state.market.symbol,
  // trade: state.trade
})

const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(FundRaising)