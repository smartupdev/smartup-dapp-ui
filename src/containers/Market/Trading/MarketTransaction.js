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
  const [{ sutSymbol }] = useLang()
  const model = [
    { label: 'Time', value: 'time', layoutStyle, component: DateText },
    { label: `Amount`, value: 'volume', layoutStyle, component: TokenText },
    { label: `Price(${sutSymbol})`, value: 'price', layoutStyle, component: TokenText },
    { label: `Total(${sutSymbol})`, value: 'total', layoutStyle, component: TokenText }
  ]
  return (
    <Table
      titleStyle={titleStyle}
      recordKey='time'
      model={model}
      values={orders}
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