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

function FundRaising({ market: { ctPrice, ctCount, ctRecyclePrice, symbol, numberOfSub, closingTime, ctRest } }) {
  const [{ sutSymbol, ...lang }] = useLang()
  return (
    <Col bgDark HL>
      <Text sectionTitle> {lang.trading.phaseOne.tokenOffering} </Text>
      <Hr />
      <Row>
        <Col flex={1} MarginRightXL>
          <Text TopS BottomBase bottom XL nowrap wordSpaceS sut={sutSymbol}>{lang.trading.phaseOne.raised}{toToken(ctPrice * (ctCount - ctRest))}</Text>
          <Text note wordSpaceS sut={sutSymbol}> {lang.trading.phaseOne.targetFundingPool} {toToken(ctPrice * ctCount)}</Text>
          <SliderBox><Slider value={(ctCount - ctRest)/ctCount} disabled /></SliderBox>
          <Row wrap='true'>
            <Box text={`${lang.trading.phaseOne.offeringPrice}(${sutSymbol})`} value={toToken(ctPrice)} />
            <Box text={`${lang.trading.phaseOne.totalCT} (${symbol})`} value={toToken(ctCount)} />
            <Box text={lang.trading.phaseOne.communityMember} value={numberOfSub} />
            <Box text={`${lang.trading.phaseOne.floorPrice}(${sutSymbol})`} value={toToken(ctRecyclePrice)} />
            <Box text={lang.trading.phaseOne.withdrawableFunding} value={toToken((ctPrice-ctRecyclePrice) * ctCount)} />
          </Row>
        </Col>
        <Col width='280px' right VS>
          <Clock endDate={closingTime} />
  <Text right note S> {lang.trading.phaseOne.hints} {closingTime}</Text>
  <Text right note S> {lang.trading.phaseOne.hintsTwo} </Text>
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