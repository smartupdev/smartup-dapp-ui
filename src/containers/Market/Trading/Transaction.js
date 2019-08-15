import React, { useEffect } from 'react'

import Avatar from 'components/Avatar'
import Text from 'components/Text'
import { Col } from 'components/Layout'
import Hr from 'components/Hr'
import Table from 'components/Table'

import { toPrice, toAgo } from 'lib/util'
import { useLang } from 'language'

function TimeComponent({ value }) {
  const [{ time: { now, min, hour, day } }] = useLang()
  return <Text>{toAgo(value, now, min, hour, day)}</Text>
}

export default ({ gettingTrades, getTradeList, trades, hasNextPage }) => {
  const [{ trading: tradingText }] = useLang()
  // useEffect(() => {
  //   getTradeList()
  // }, [market])
  const model = [
    { label: tradingText.table.buySell, value: 'type', layoutStyle: { flex: 1, center: true, width: '50px' }, component: ({ value }) => <Text red={value === 'sell'} green={value !== 'sell'}>{value === 'sell' ? tradingText.table.sell : tradingText.table.buy }</Text> },
    { label: tradingText.table.user, value: 'userAddress', layoutStyle: { flex: 1, width: '160px' }, component: ({ record }) => <Avatar icon={record.userIcon} username={record.username} /> },
    { label: tradingText.table.time, value: 'createTime', layoutStyle: { flex: 1, width: '80px', center: true }, component: TimeComponent },
    { label: tradingText.table.avgPrice, value: 'avgAmount', layoutStyle: { flex: 1, width: '80px', center: true }, component: ({ value }) => <Text>{toPrice(value)}</Text> },
    { label: tradingText.table.ct, value: 'ctAmount', layoutStyle: { flex: 1, width: '80px', center: true }, },
    { label: tradingText.table.stage, value: 'stage', layoutStyle: { flex: 1, width: '80px', center: true }, component: ({ value }) => <Text>{tradingText.table.stageValue[value] || value}</Text> },
  ]

  return (
    <Col spacingLeftM spacingRightM>
      <Text L center spacingBottomS spacingTopS>{tradingText.trans}</Text>
      <Hr />
      <Table
        model={model}
        values={trades}
        hasMore={hasNextPage} loadMore={() => getTradeList(true)} isLoading={gettingTrades} noResultText={tradingText.transactionRecord} 
      />
    </Col>
  )
}