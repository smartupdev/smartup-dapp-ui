import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import * as Actions from 'actions/marketUserOrder'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { CloseWithCircle } from 'components/Icon'
import { Col, Row } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'
import { DateText, TokenText } from 'containers/Common'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

const layoutStyle = { center: true, flex: 1 }

function UserBuyOrder({ 
  symbol, marketId,
  buyOrder: { orders },
  getBuyOrder, reset
 }) {
  const [{ trading: tradingText, sutSymbol, api: { orderState } }] = useLang()
  useEffect(() => {
    getBuyOrder(marketId)
    return reset
  }, [marketId])
  console.log(orders)
  const model = [
    { label: 'Time', value: 'createdTime', layoutStyle, component: DateText },
    { label: `Amount(${symbol})`, value: 'totalAmount', layoutStyle, component: TokenText },
    { label: `Remained ${symbol}`, value: 'filledAmount', layoutStyle, component: TokenText },
    { label: `Sell Price(${sutSymbol})`, value: 'sellingPrice', layoutStyle, component: TokenText },
    { label: `Avg Executed Price(${sutSymbol})`, value: 'avgTradedPrice', layoutStyle, component: TokenText },
    { label: `Est. Total(${sutSymbol})`, value: 'total', layoutStyle, component: TokenText },
    { label: 'Status', value: 'state', layoutStyle, component: ({ value }) => <Text center>{orderState[value]}</Text> },
    { label: 'Action', value: 'action', layoutStyle, component: () => <CloseWithCircle primary S /> },
  ]

  return (
    <Col HS height='400px'>
      <Table
        recordKey='orderId'
        model={model}
        values={orders}
        // hasMore={hasNextPage} loadMore={() => getTradeList(true)} isLoading={gettingTrades} noResultText={tradingText.transactionRecord} 
      />
      {/* <Col>
        <Text>Add data</Text>
      </Col> */}
    </Col>
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  marketId: state.market.id,
  buyOrder: state.marketUserOrder.buyOrder
})
const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(UserBuyOrder)
