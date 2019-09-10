import React, { useEffect, useRef } from 'react'

import { connect } from 'react-redux'
import * as Actions from 'actions/orderBook'

import Text from 'components/Text'
import { Col, Row } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { toPrice, toAgo, toToken } from 'lib/util'
import { usePolling } from 'lib/react'
import { useLang } from 'language'
import theme from 'theme'

function OrderBookTitle() {
  return (
    <Row VS HS>
      {['Price', 'Amount', 'Total'].map( (text, index) =>
        <Col key={text} flex={1} right={index}>
          <Text note>{text}</Text>
        </Col>
      )}
    </Row>
  )
}

function RenderToken({value}) {
  return <Text code S>{toToken(value, { defaultValue: '' })}</Text>
}

function PriceAndBar({ color, value, record, max }) {
  return (
    <>
    <Col absolute width={`calc( ${record.amount/max* 100}% + 24px );`} height='16px' customBgColor={color} opacity='.1' absLeft='-12px'></Col>
    <Text color={color} code S>{value && value.toFixed(2)}&nbsp;</Text> 
    </>
  )
}

function OrderBook({ tableRef, values, color, reverse, max, stage, height }) {
  // const [{ trading: tradingText }] = useLang()
  const model = [
    { label: 'Price', value: 'price', layoutStyle: { left: true, flex: 1 }, component: p => <PriceAndBar color={color} max={max} {...p} />},
    { label: 'Amount', value: 'amount', layoutStyle: { right: true, flex: 1 }, component: RenderToken },
    { label: 'Total', value: 'total', layoutStyle: { right: true, flex: 1 }, component: RenderToken },
  ]  
  return (
    <Col HS flex={1} bottom={reverse} ref={tableRef}>
      <Table
        noScroll
        noBorderCol
        noHeader
        condensed
        animated
        backgroundColor={theme.bgColor}
        recordKey={'key'}
        model={model}
        noResultText={stage === 1 ? 'Available after this phase' : ''}
        values={reverse ? [...values].reverse() : values}
      />
    </Col>
  )
}

function OrderBookGroup({ 
  orderBook: { didFetch, currentPrice, changePercent, buyOrder: { orders: buyOrders, max: buyMax }, sellOrder: { orders: sellOrders, max: sellMax } },
  marketId, stage,
  getOrder, reset,
  height,
 }) {
  usePolling( () => getOrder(marketId), 2000, marketId)
  useEffect(() => reset, [])
  const contentRef = useRef()
  const topRef = useRef()
  const priceRef = useRef()
  const didScroll = useRef()
  const priceHeight = priceRef.current && priceRef.current.getBoundingClientRect().height
  const contentHeight = contentRef.current && contentRef.current.offsetHeight
  useEffect(() => {
    if(!didScroll.current) {
      if(didFetch && didFetch) didScroll.current = true
      const topRefHeight = topRef.current.getBoundingClientRect().height
      contentRef.current.scrollTo(0, 
        topRefHeight - contentHeight/2 + priceHeight/2
      )
    }
  }, [didFetch])
  return (
    <>
      <Text sectionTitle>Orders Book</Text>
      <Hr inset />
      <OrderBookTitle />
      <Hr inset />
      <Col overflowAuto ref={contentRef} flex={1}>
        <OrderBook tableRef={topRef} color={theme.red} reverse values={sellOrders} max={sellMax} height={contentHeight/2} />
        <Hr />
        <Row HS centerVertical ref={priceRef}>
          <Text code VBase green={changePercent > 0} red={changePercent < 0} L bold>{currentPrice ? toToken(currentPrice) : '-'}</Text>
          {/* <Text code VBase HS S note>USD$12.33</Text> */}
        </Row>
        <Hr />
        <OrderBook color={theme.green} values={buyOrders} max={buyMax} height={contentHeight/2} stage={stage} />
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  orderBook: state.orderBook,
  marketId: state.market.id,
  stage: state.market.stage
})

const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookGroup)
