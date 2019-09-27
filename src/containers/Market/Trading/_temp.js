import React, { useEffect } from 'react'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { Col } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

const model = [
  { label: lang => lang.trading.myOrderBook.time, value: 'createdTime', },
  { label: l => `${l.amount}(${l.symbol})`, value: 'ctCount', },
  { label: l => `${l.remained} ${symbol}`, value: 'filledAmount', },
  { label: `Sell Price(${sutSymbol})`, value: 'sellingPrice', },
  { label: `Avg Executed Price(${sutSymbol})`, value: 'avgTradedPrice', },
  { label: `Est. Total(${sutSymbol})`, value: 'total', },
  { label: 'Status', value: 'state', },
  { label: 'Action', value: 'action', },
]
export default ({ symbol }) => {
  const [lang] = useLang()
  // useEffect(() => {
  //   getTradeList()
  // }, [market])


  return (
    <Table
      model={model}
      values={[]}
      language={lang}
      // hasMore={hasNextPage} loadMore={() => getTradeList(true)} isLoading={gettingTrades} noResultText={tradingText.transactionRecord} 
    />
  )
}