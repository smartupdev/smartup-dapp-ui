import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from '../../../components/Layout'
import MarketTable from '../../Market/Table/ListView'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'

import { connect } from 'react-redux'
import { getCreatedMarkets, getTradedMarkets, reset } from '../../../actions/personalCenter'

function Market({
  gettingCreatedMarmkets, createdMarketsError,
  gettingTradedMarmkets, tradedMarketsError,
  createdMarkets, tradedMarkets,
  getCreatedMarkets, getTradedMarkets, reset
}) {
  const [expandCreated, setExpandCreated] = useState(true)
  const [expandSaved, setExpandSaved] = useState(false)

  useEffect(() => {
    getCreatedMarkets()
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
        header='Created market'
        body={<MarketTable markets={createdMarkets} />} />
      {expandCreated && <Hr />}
      <Panel
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={tradedMarketsError}
        loading={gettingTradedMarmkets}
        header='Saved market'
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
});

const mapDispatchToProps = {
  getCreatedMarkets, getTradedMarkets, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);