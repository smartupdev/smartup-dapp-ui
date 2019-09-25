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
  const [{ sutSymbol }] = useLang()
  useEffect(() => {
    getHistoryOrder()
    return reset
  }, [marketId, loggedIn])
  const model = [
    { label: 'Time', value: 'createTime', component: DateText, layoutStyle },
    { label: 'Side', value: 'type', layoutStyle }, // TODO: remove and add color
    { label: `Amount\n(${symbol})`, value: 'entrustVolume', layoutStyle, component: TokenText },
    { label: `Filled ${symbol}`, value: 'filledAmount', layoutStyle, component: TokenText },
    { label: `Entrust Price\n(${sutSymbol})`, value: 'entrustPrice', layoutStyle, component: TokenText },
    { label: `Executed Price\n(${sutSymbol})`, value: 'avgTradedPrice', layoutStyle, component: TokenText },
    { label: `Total\n(${sutSymbol})`, value: 'total', layoutStyle, component: TokenText },
    { label: 'Status', value: 'state', layoutStyle, component: OrderStateTable },
  ]

  return (
    <Col HS>
      <Table
        recordKey='orderId'        
        model={model}
        values={orders}
        noResultText={error ? error.message : undefined}
        hasMore={hasNextPage} loadMore={getHistoryOrder} isLoading={fetching}
        titleStyle={titleStyle}
        // LoadMore issue. Keep getting new result no matter in which position
      />
    </Col>
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