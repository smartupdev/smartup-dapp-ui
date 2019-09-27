import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'actions/marketUserOrder'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { Col } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { DateText, TokenText, OrderStateTable } from 'containers/Common'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

const layoutStyle = { center: true, flex: 1 }
const titleStyle = { newline: true, center: true }

function History({ 
  symbol, marketId, loggedIn,
  order: {
    orders, error, hasNextPage, fetching
  },
  getHistoryOrder, reset, 
}) {
  const [lang] = useLang()
  useEffect(() => {
    getHistoryOrder()
    return reset
  }, [marketId, loggedIn])
  const model = [
    { label: l => l.trading.myOrderBook.time, value: 'createTime', component: DateText, layoutStyle },
    { label: l => l.trading.myOrderBook.type, value: 'type', layoutStyle }, // TODO: remove and add color
    { label: l => `${l.trading.myOrderBook.amount}\n(${symbol})`, value: 'entrustVolume', layoutStyle, component: TokenText },
    { label: l => `${l.trading.myOrderBook.filled} ${symbol}`, value: 'filledAmount', layoutStyle, component: TokenText },
    { label: l => `${l.trading.myOrderBook.price}\n(${l.sutSymbol})`, value: 'entrustPrice', layoutStyle, component: TokenText },
    { label: l => `${l.trading.myOrderBook.executedPrice}\n(${l.sutSymbol})`, value: 'avgTradedPrice', layoutStyle, component: TokenText },
    { label: l => `${l.trading.myOrderBook.estTotal}\n(${l.sutSymbol})`, value: 'total', layoutStyle, component: TokenText },
    { label: l => l.trading.myOrderBook.status, value: 'state', layoutStyle, component: OrderStateTable },
  ]

  return (
    <Table
      recordKey='orderId'        
      model={model}
      values={orders}
      fixedHeader
      noResultText={error ? error.message : undefined}
      hasMore={hasNextPage} loadMore={getHistoryOrder} isLoading={fetching}
      titleStyle={titleStyle}
      language={lang}
      // LoadMore issue. Keep getting new result no matter in which position
    />
  )
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  marketId: state.market.id,
  order: state.marketUserOrder.historyOrder,
  loggedIn: state.user.loggedIn
})
const mapDispatchToProps = Actions
export default connect(mapStateToProps, mapDispatchToProps)(History)