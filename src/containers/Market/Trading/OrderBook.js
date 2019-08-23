import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import * as Actions from 'actions/orderBook'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { Col } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

function OrderBook({ values }) {
  // const [{ trading: tradingText }] = useLang()
  const model = [
    { label: 'Amount', value: 'amount', layoutStyle: { right: true, flex: 1 } },
    { label: 'Price', value: 'price', layoutStyle: { right: true, flex: 1 } },
    { label: 'Total', value: 'total', layoutStyle: { right: true, flex: 1 }, component: ({ record }) => <Text>{record.amount * record.price}</Text> },
  ]  
  return (
    <Table
      recordKey={'price'}
      model={model}
      values={values}
    />
  )
}

function OrderBookGroup({ 
  orderBook: { buyOrder: { orders: buyOrders }, sellOrder: { orders: sellOrders } },
  marketId,
  getBuyOrder, getSellOrder, reset
 }) {
  useEffect( () => {
    getBuyOrder()
    getSellOrder()
    return reset
  }, [marketId])
  return (
    <Col HM>
      <Text sectionTitle>Orders Book</Text>
      <Hr />
      <OrderBook values={buyOrders} />
      {/* <Hr /> */}
      <Text center spacingM>Price: 12.33</Text>
      <Hr />
      <OrderBook values={sellOrders} />
    </Col>
  )
}

const mapStateToProps = state => ({
  orderBook: state.orderBook,
  marketId: state.market.id
})

const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookGroup)
