import React, { useEffect } from 'react'
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
import { useLang } from 'language'

const layoutStyle = { center: true, flex: 1 }
const titleStyle = { newline: true, center: true }

function UserBuyOrder({ 
  symbol, marketId, loggedIn,
  buyOrder: { orders, error },
  getBuyOrder, reset
 }) {
  const [{ sutSymbol }] = useLang()
  useEffect(() => {
    getBuyOrder()
    return reset
  }, [marketId, loggedIn])
  const model = [
    { label: 'Time', value: 'createdTime', layoutStyle, component: DateText },
    { label: `Amount\n(${symbol})`, value: 'totalAmount', layoutStyle, component: TokenText },
    { label: `Remained ${symbol}`, value: 'filledAmount', layoutStyle, component: TokenText },
    { label: `Sell Price\n(${sutSymbol})`, value: 'sellingPrice', layoutStyle, component: TokenText },
    { label: `Executed Price\n(${sutSymbol})`, value: 'avgTradedPrice', layoutStyle, component: TokenText },
    { label: `Est. Total\n(${sutSymbol})`, value: 'total', layoutStyle, component: TokenText },
    { label: 'Status', value: 'state', layoutStyle, component: OrderStateTable },
    { label: 'Action', value: 'action', layoutStyle, component: () => <CloseWithCircle primary S /> },
  ]

  return (
    <Table
      recordKey='orderId'
      fixedHeader
      model={model}
      values={orders}
      noResultText={error ? error.message : undefined}
      titleStyle={titleStyle}
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
