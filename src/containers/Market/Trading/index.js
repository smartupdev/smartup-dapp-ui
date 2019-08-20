import React from 'react'

import { connect } from 'react-redux'
// import { setTab, onChangeCT, onChangeSUT, onTrade, toggleIsSell, toggleTnc, reset, getTradeList, watchKline,getKlineList, getHighLowList,} from 'actions/trade'

import { Col } from 'components/Layout'
import Text from 'components/Text'
// import Hr from 'components/Hr'

import TradingInfo from './TradingInfo'
import Transaction from './Transaction'
import MakeOrder from './MakeOrder'
import OrderBook from './OrderBook'

function Trading({ stage }) {
  return (
    stage === 1 ?
      <Col fitHeight>
        {/* <TradingInfo tabIndex={tabIndex} klineData={klineData} setTab={setTab} highLowData={highLowData} market={market} /> */}
        <MakeOrder />
        <OrderBook />
        {/* <Transaction gettingTrades={gettingTrades} getTradeList={getTradeList} trades={trades} hasNextPage={hasNextPage} /> */}
      </Col>
    :
      <Text center spacingM>Under development</Text>
  )
}

const mapStateToProps = state => ({
  stage: state.market.stage,
})

export default connect(mapStateToProps)(Trading);