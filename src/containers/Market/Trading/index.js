import React, { useRef, useState } from 'react'

import { connect } from 'react-redux'
// import { setTab, onChangeCT, onChangeSUT, onTrade, toggleIsSell, toggleTnc, reset, getTradeList, watchKline,getKlineList, getHighLowList,} from 'actions/trade'

import { Col, Row } from 'components/Layout'
import Text from 'components/Text'
import Hr from 'components/Hr'
import Tab from 'components/Tab'

import TradingInfo from './TradingInfo'
import Transaction from './Transaction'
import FundRaising from './FundRaising'
import MakeOrder from './MakeOrder'
import OrderBook from './OrderBook'
import UserSellOrder from './UserSellOrder'
import UserBuyOrder from './UserBuyOrder'
import UserHistory from './UserHistory'
import MarketTransaction from './MarketTransaction'

const FILTERS = [
  { label: 'My Buy Order', value: 'buy', component: UserBuyOrder },
  { label: 'My Sell Order', value: 'sell', component: UserSellOrder },
  { label: 'My Order History', value: 'history', component: UserHistory },
  { label: 'Market Transaction', value: 'market', component: MarketTransaction },
]

function Trading({ stage }) {
  const [tab, setTab] = useState(1)
  function onTabChange(index) { setTab(index) }
  const TabComponent = FILTERS[tab].component
  const MakeOrderRef = useRef()
  const orderHeight = MakeOrderRef.current ? MakeOrderRef.current.getBoundingClientRect().height : 400
  return (
    // stage === 1 ?
      <Col fitHeight>
        {/* <TradingInfo tabIndex={tabIndex} klineData={klineData} setTab={setTab} highLowData={highLowData} market={market} /> */}
        <FundRaising />
        <Row>
          <Col flex={1} fitHeight ref={MakeOrderRef}>
            <MakeOrder />
          </Col>
          <Hr vertical />
          <Col flex={1} height={orderHeight+'px'}>
            <OrderBook height={orderHeight} />
          </Col>
        </Row>
        <Hr />
        <Tab activeIndex={tab} width='130px' tabs={FILTERS} onClick={onTabChange} type='simple' />
        <Hr />
        <TabComponent />
        {/* <Transaction gettingTrades={gettingTrades} getTradeList={getTradeList} trades={trades} hasNextPage={hasNextPage} /> */}
      </Col>
    // :
    //   <Text center spacingM>Under development</Text>
  )
}

const mapStateToProps = state => ({
  stage: state.market.stage,
})

export default connect(mapStateToProps)(Trading)