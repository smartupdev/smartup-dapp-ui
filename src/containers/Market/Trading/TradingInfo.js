import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'actions/trade'

import Chart from './Chart'
import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import Expand from 'components/Expand'
import { More } from 'components/Icon'

import { toPrice, toAgo, toFullDate } from 'lib/util'
import { usePolling } from 'lib/react'
import { useLang } from 'language'

import styled from 'styled-components'

const KlineMoreBox = styled(Col)`
  width: 200px;
  height: 30px;
  border-radius: 0 0 6px 6px;
  background-color: ${p => p.dump ? 'initial' : p.theme.bgColorDark};
  & > svg {
    fill: ${p => p.theme.colorSecondary}
  }
`

function KlineData({ market: { id, details, last, amount, ctTopAmount }, getTradingInfo }) { // TODO: should get data directly from store
  const [{ trading: tradingText, time: { months, weekdays } }] = useLang()
  useEffect(() => { getTradingInfo() }, [id])
  return (
    <Col LeftXL RightL BottomL bgDark width={['100%', '250px']}>
      <Text nowrap BottomS>{toFullDate(Date.now(), weekdays, months)}</Text>
      <Row bottom spacingTopS>
        <Text XL>{toPrice(details.low, 2)}</Text><Text red S>&nbsp;&nbsp;{tradingText.low}</Text>
      </Row>
      <Row bottom>
        <Text XL>{toPrice(details.high, 2)}</Text><Text green S>&nbsp;&nbsp;{tradingText.high}</Text>
      </Row>
      <Text note S>{tradingText.change}</Text>

      <Text XL price spacingTopS>{toPrice(last, 2)}</Text>
      <Text note S>{tradingText.price}</Text>

      <Text XL primary spacingTopS>{toPrice(details.amount, 2)}</Text>
      <Text note S>{tradingText.volume}</Text>

      <Text XL spacingTopS>{toPrice(amount, 2)}</Text>
      <Text note S>{tradingText.cap}</Text>

      <Text XL spacingTopS>{toPrice(ctTopAmount, 2)}</Text>
      <Text note S>{tradingText.ct}</Text>
    </Col>
  )
}

const mapStateToProps2 = state => ({
  market: state.market
})
const TradingDetails = connect(mapStateToProps2, Actions)(KlineData)

const TradingInfo = ({ 
  kline, 
  // highLowData, 
  marketId,
  getKlineList,
 }) => { 
  const [{ trading: tradingText }] = useLang()
  const [tabIndex, setTab] = useState(0)
  const klineTabs = [
    { label: tradingText.hour },
    { label: tradingText.day },
    { label: tradingText.week },
  ]
  const [klineOpen, setKlineOpen] = useState(false)
  usePolling(() => getKlineList(tabIndex), 20000, [marketId, tabIndex])
  return (
    <>
      <Row TopXL BottomS LeftL bgDark>
        {klineTabs.map( ({ label }, index) =>
          <Col bgPrimary={index === tabIndex} bgSecondary={index !== tabIndex} key={label} HXS MarginLeftS borderRadius='2px' onClick={() => setTab(index)}>
            <Text lineHeight>{label}</Text>
          </Col>
        )}
      </Row>
      <Row bgDark HL BottomL>
        <Col flex={1}>
          <Chart data={kline.list} />
        </Col>
        <Col hiddenMobile>
          <TradingDetails />
        </Col>
      </Row>
      
      <Col hiddenDesktop relative>
        <Col absolute width='100%' BottomM center style={{ zIndex: 1 }}>
          <Expand isOpen={klineOpen} width='100%'>
            <TradingDetails />
          </Expand>
          <KlineMoreBox center centerVertical onClick={() => setKlineOpen(!klineOpen)}>
            <More S reverse={klineOpen} />
          </KlineMoreBox>
        </Col>
        <KlineMoreBox dump />
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  kline: state.kline,
  marketId: state.market.id
})
const mapDispatchToProps = Actions
export default connect(mapStateToProps, mapDispatchToProps)(TradingInfo)