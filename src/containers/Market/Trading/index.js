import React, { useRef, useState } from 'react'

import { connect } from 'react-redux'
// import { setTab, onChangeCT, onChangeSUT, onTrade, toggleIsSell, toggleTnc, reset, getTradeList, watchKline,getKlineList, getHighLowList,} from 'actions/trade'

import { Col, Row } from 'components/Layout'
import Text from 'components/Text'
import Hr from 'components/Hr'
import Tab from 'components/Tab'

import TradingInfo from './TradingInfo'
// import Transaction from './Transaction'
import FundRaising from './FundRaising'
import MakeOrder from './MakeOrder'
import OrderBook from './OrderBook'
import UserSellOrder from './UserSellOrder'
import UserBuyOrder from './UserBuyOrder'
import UserHistory from './UserHistory'
import MarketTransaction from './MarketTransaction'
import { useLang } from '../../../language'

function Trading({ stage }) {
  const [lang] = useLang()
  const FILTERS = [
    { label: lang.trading.myOrderBook.myBuyOrder , value: 'buy', component: UserBuyOrder },
    { label: lang.trading.myOrderBook.mySellOrder, value: 'sell', component: UserSellOrder },
    { label: lang.trading.myOrderBook.orderHistory, value: 'history', component: UserHistory },
    { label: lang.trading.myOrderBook.marketTransaction, value: 'market', component: MarketTransaction },
  ]
  const [tab, setTab] = useState(1)
  function onTabChange(index) { setTab(index) }
  const TabComponent = FILTERS[tab].component
  const makeOrderRef = useRef()
  const orderHeight = makeOrderRef.current ? makeOrderRef.current.getBoundingClientRect().height : 400
  return (
    // stage === 1 ?
      <Col overflowAuto >
        {/* <TradingInfo tabIndex={tabIndex} klineData={klineData} setTab={setTab} highLowData={highLowData} market={market} /> */}
        <FundRaising />
        <Row>
          <Col flex={1} fitHeight ref={makeOrderRef}>
            <MakeOrder stage={stage} />
          </Col>
          <Hr vertical />
          <Col flex={1} height={orderHeight+'px'}>
            <OrderBook />
          </Col>
        </Row>
        <Hr />
        <Tab activeIndex={tab} width='130px' tabs={FILTERS} onClick={onTabChange} type='simple' />
        <Hr />
        <Col HS maxHeight='500px'>
          <TabComponent />
        </Col>
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