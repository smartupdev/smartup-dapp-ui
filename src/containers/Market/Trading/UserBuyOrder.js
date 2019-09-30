import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'actions/marketUserOrder'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { CloseWithCircle } from 'components/Icon'
import { Col, Row } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'
import { DateText, TokenText,  OrderStateTable } from 'containers/Common'

import { toPrice, toAgo } from 'lib/util'
import { useValue } from 'lib/react'
import { useLang } from 'language'

const layoutStyle = { center: true, flex: 1 }
const titleStyle = { newline: true, center: true }

function UserBuyOrder({ 
  symbol, marketId, loggedIn,
  buyOrder: { orders, error },
  getBuyOrder, reset
 }) {
  const [{ trading: { myOrderBook: myOrderBookText }, sutSymbol }] = useLang()
  const model = useValue([
    { label: myOrderBookText.time, value: 'createdTime', layoutStyle, component: DateText },
    { label: `${myOrderBookText.amount} \n(${symbol})`, value: 'totalAmount', layoutStyle, component: TokenText },
    { label: `${myOrderBookText.remained} \n${symbol}`, value: 'filledAmount', layoutStyle, component: TokenText },
    { label: `${myOrderBookText.buyPrice}\n(${sutSymbol})`, value: 'buyPrice', layoutStyle, component: TokenText },
    { label: `${myOrderBookText.executedPrice}\n(${sutSymbol})`, value: 'avgTradedPrice', layoutStyle, component: TokenText },
    { label: `${myOrderBookText.estTotal}\n(${sutSymbol})`, value: 'total', layoutStyle, component: TokenText },
    { label: myOrderBookText.status, value: 'state', layoutStyle, component: OrderStateTable },
    { label: `${myOrderBookText.sellPrice}\n(${sutSymbol})`, value: 'sellingPrice', layoutStyle, component: TokenText },
    { label: myOrderBookText.action, value: 'action', layoutStyle, component: () => <CloseWithCircle primary S /> },
  ], [symbol, myOrderBookText, sutSymbol])
  useEffect(() => {
    getBuyOrder()
    return reset
  }, [marketId, loggedIn])

  return (
    <Table
      recordKey='orderId'
      fixedHeader
      model={model}
      values={orders}
      noResultText={error ? error.message : undefined}
      titleStyle={titleStyle}
      // language={lang}
    />
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  marketId: state.market.id,
  buyOrder: state.marketUserOrder.buyOrder, 
  loggedIn: state.user.loggedIn
})
const mapDispatchToProps = Actions

export default connect(mapStateToProps, mapDispatchToProps)(UserBuyOrder)
