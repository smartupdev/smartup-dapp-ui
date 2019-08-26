import React, { useEffect, useRef } from 'react'

import { connect } from 'react-redux'
import * as Actions from 'actions/orderBook'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { Col, Row } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { toPrice, toAgo, toToken } from 'lib/util'
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
  return <Text code>{toToken(value, { defaultValue: '' })}</Text>
}

function PriceAndBar({ color, value, record, max }) {
  return (
    <>
    <Col absolute width={`calc( ${record.amount/max* 100}% + 24px );`} height='18px' customBgColor={color} opacity='.1' absLeft='-12px'></Col>
    <Text color={color} code>{value && value.toFixed(2)}&nbsp;</Text> 
    </>
  )
}

function OrderBook({ values, color, reverse, max }) {
  // const [{ trading: tradingText }] = useLang()
  const model = [
    { label: 'Price', value: 'price', layoutStyle: { left: true, flex: 1 }, component: p => <PriceAndBar color={color} max={max} {...p} />},
    { label: 'Amount', value: 'amount', layoutStyle: { right: true, flex: 1 }, component: RenderToken },
    { label: 'Total', value: 'total', layoutStyle: { right: true, flex: 1 }, component: RenderToken },
  ]  
  return (
    <Col HS>
      <Table
        noScroll
        noBorderCol
        noHeader
        condensed
        backgroundColor={theme.bgColor}
        recordKey={'key'}
        model={model}
        values={reverse ? [...values].reverse() : values}
      />
    </Col>
  )
}

function OrderBookGroup({ 
  orderBook: { buyOrder: { orders: buyOrders, max: buyMax }, sellOrder: { orders: sellOrders, max: sellMax } },
  marketId,
  getBuyOrder, getSellOrder, reset,
  height,
 }) {
  useEffect( () => {
    getBuyOrder()
    getSellOrder()
    return reset
  }, [marketId])
  const contentRef = useRef()
  useEffect(() => {
    contentRef.current.scrollTo(0, (contentRef.current.scrollHeight - contentRef.current.getBoundingClientRect().height)/2 )
  }, [buyOrders.length, sellOrders.length])
  return (
    <>
      <Text sectionTitle>Orders Book</Text>
      <Hr inset />
      <OrderBookTitle />
      <Hr inset />
      <Col overflowAuto ref={contentRef}>
        <OrderBook color={theme.red} values={buyOrders} reverse max={buyMax} />
        <Hr />
        <Row HS centerVertical>
          <Text code VBase red L>12.33</Text>
          <Text code VBase HS primary S>USD$12.33</Text>
        </Row>
        <Hr />
        <OrderBook color={theme.green} values={sellOrders} max={sellMax} />
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  orderBook: state.orderBook,
  marketId: state.market.id
})

const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookGroup)
