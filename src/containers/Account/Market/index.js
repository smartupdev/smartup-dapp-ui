import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from '../../../components/Layout'
import MarketTable from '../../Market/Table/ListView'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'

import { connect } from 'react-redux'
import { getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset } from '../../../actions/personalCenter'

function Market({
  createdMarkets, gettingCreatedMarmkets, createdMarketsError,
  tradedMarkets, gettingTradedMarmkets, tradedMarketsError,
  collectedMarkets, gettingCollectedMarmkets, collectedMarketsError,
  getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset
}) {
  const [expandCreated, setExpandCreated] = useState(true)
  const [expandSaved, setExpandSaved] = useState(false)
  const [expandTraded, setExpandTraded] = useState(false)

  useEffect(() => {
    getCreatedMarkets()
    getTradedMarkets()
    getCollectedMarkets()
    return reset
  }, [])

  return (
    <Col>
      <Panel
        expandedDark
        expanded={expandCreated}
        onClick={() => setExpandCreated(!expandCreated)}
        error={createdMarketsError}
        loading={gettingCreatedMarmkets}
        header='Created market'
        body={<MarketTable markets={createdMarkets} />} />
      {expandCreated && <Hr />}
      <Panel
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={collectedMarketsError}
        loading={gettingCollectedMarmkets}
        header='Saved market'
        body={<MarketTable markets={collectedMarkets} />} />
      {expandCreated && <Hr />}
      <Panel
        expandedDark
        expanded={expandTraded}
        onClick={() => setExpandTraded(!expandTraded)}
        error={tradedMarketsError}
        loading={gettingTradedMarmkets}
        header='Subscribed market'
        body={<MarketTable markets={tradedMarkets} />} />
    </Col>
  )
}

const mapStateToProps = state => ({
  createdMarkets: state.personalCenterMarket.createdMarkets,
  gettingCreatedMarmkets: state.personalCenterMarket.gettingCreatedMarmkets,
  createdMarketsError: state.personalCenterMarket.createdMarketsError,
  tradedMarkets: state.personalCenterMarket.tradedMarkets,
  gettingTradedMarmkets: state.personalCenterMarket.gettingTradedMarmkets,
  tradedMarketsError: state.personalCenterMarket.tradedMarketsError,
  collectedMarkets: state.personalCenterMarket.collectedMarkets,
  gettingCollectedMarmkets: state.personalCenterMarket.gettingCollectedMarmkets,
  collectedMarketsError: state.personalCenterMarket.collectedMarketsError,
});

const mapDispatchToProps = {
  getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);