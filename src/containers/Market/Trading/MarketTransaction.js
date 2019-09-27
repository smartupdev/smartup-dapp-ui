import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { Col } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { DateText, TokenText } from 'containers/Common'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

const layoutStyle = { center: true, flex: 1 }
const titleStyle = { newline: true, center: true }

function Transaction({ orders }) {
  const [lang] = useLang()
  const model = [
    { label: l => l.trading.myOrderBook.time, value: 'time', layoutStyle, component: DateText },
    { label: l => l.trading.myOrderBook.amount, value: 'volume', layoutStyle, component: TokenText },
    { label: l => `${l.trading.myOrderBook.price}(${l.sutSymbol})`, value: 'price', layoutStyle, component: TokenText },
    { label: l => `${l.trading.myOrderBook.total}(${l.sutSymbol})`, value: 'total', layoutStyle, component: TokenText }
  ]
  return (
    <Table
      titleStyle={titleStyle}
      recordKey='time'
      model={model}
      values={orders}
      language={lang}
      // hasMore={hasNextPage} loadMore={() => getTradeList(true)} isLoading={gettingTrades} noResultText={tradingText.transactionRecord} 
    />
  )
}

const mapStateToProps = state => ({
  orders: state.orderBook.orders
})
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Transaction)