import React, { useEffect } from 'react'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { Col } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

export default ({ symbol }) => {
  const [{ trading: tradingText, sutSymbol }] = useLang()
  // useEffect(() => {
  //   getTradeList()
  // }, [market])
  const model = [
    { label: 'Time', value: 'createdTime', },
    { label: `Amount(${symbol})`, value: 'ctCount', },
    { label: `Remained ${symbol}`, value: 'filledAmount', },
    { label: `Sell Price(${sutSymbol})`, value: 'sellingPrice', },
    { label: `Avg Executed Price(${sutSymbol})`, value: 'avgTradedPrice', },
    { label: `Est. Total(${sutSymbol})`, value: 'total', },
    { label: 'Status', value: 'state', },
    { label: 'Action', value: 'action', },
  ]

  return (
    <Table
      model={model}
      values={[]}
      // hasMore={hasNextPage} loadMore={() => getTradeList(true)} isLoading={gettingTrades} noResultText={tradingText.transactionRecord} 
    />
  )
}