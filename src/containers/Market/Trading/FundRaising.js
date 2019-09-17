import React from 'react'

import { connect } from 'react-redux'
import * as Actions from 'actions/trade'

import { Slider } from 'components/Input'
import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import Clock from 'components/Clock'
import Hr from 'components/Hr'

import { useLang } from 'language'
import styled from 'styled-components'
import { getDate, toToken, getMonth } from '../../../lib/util'

const SliderBox = styled(Col)`
  margin-top: ${p => p.theme.spacingBase}
  margin-left: -${p => p.theme.spacingM}
`

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
          <Clock endDate={closingTime} />
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