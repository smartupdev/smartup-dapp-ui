import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from '../../../components/Layout'
import MarketTable from '../../Market/Table/ListView'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'

import { connect } from 'react-redux'
import { getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset } from '../../../actions/personalCenter'

function Market({
  createdMarkets, gettingCreatedMarmkets, createdMarketsError, createdMarketsHasNextPage,
  tradedMarkets, gettingTradedMarmkets, tradedMarketsError, tradedMarketsHasNextPage,
  collectedMarkets, gettingCollectedMarmkets, collectedMarketsError, collectedMarketsHasNextPage,
  getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset
}) {
  const [expandCreated, setExpandCreated] = useState(true)
  const [expandSaved, setExpandSaved] = useState(false)
  const [expandTraded, setExpandTraded] = useState(false)

  useEffect(() => {
    getCreatedMarkets()
    getCollectedMarkets()
    getTradedMarkets()
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
        header='Created markets'
        body={<MarketTable markets={createdMarkets} hasMore={createdMarketsHasNextPage} loadMore={getCreatedMarkets} isLoading={gettingCreatedMarmkets} />} />
      {expandCreated && <Hr />}
      <Panel
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={collectedMarketsError}
        loading={gettingCollectedMarmkets}
        header='Saved markets'
        body={<MarketTable markets={collectedMarkets} hasMore={collectedMarketsHasNextPage} loadMore={getCollectedMarkets} isLoading={gettingCollectedMarmkets} />} />
      {expandSaved && <Hr />}
      <Panel
        expandedDark
        expanded={expandTraded}
        onClick={() => setExpandTraded(!expandTraded)}
        error={tradedMarketsError}
        loading={gettingTradedMarmkets}
        header='Subscribed markets'
        body={<MarketTable markets={tradedMarkets} hasMore={tradedMarketsHasNextPage} loadMore={getTradedMarkets} isLoading={gettingTradedMarmkets} />} />
    </Col>
  )
}

const mapStateToProps = state => ({
  createdMarkets: state.personalCenterMarket.createdMarkets,
  gettingCreatedMarmkets: state.personalCenterMarket.gettingCreatedMarmkets,
  createdMarketsError: state.personalCenterMarket.createdMarketsError,
  createdMarketsHasNextPage: state.personalCenterMarket.createdMarketsHasNextPage,

  tradedMarkets: state.personalCenterMarket.tradedMarkets,
  gettingTradedMarmkets: state.personalCenterMarket.gettingTradedMarmkets,
  tradedMarketsError: state.personalCenterMarket.tradedMarketsError,
  tradedMarketsHasNextPage: state.personalCenterMarket.tradedMarketsHasNextPage,

  collectedMarkets: state.personalCenterMarket.collectedMarkets,
  gettingCollectedMarmkets: state.personalCenterMarket.gettingCollectedMarmkets,
  collectedMarketsError: state.personalCenterMarket.collectedMarketsError,
  collectedMarketsHasNextPage: state.personalCenterMarket.collectedMarketsHasNextPage,
});

const mapDispatchToProps = {
  getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);