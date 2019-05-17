import React, { useState, useEffect } from 'react'

import { Col } from '../../../components/Layout'
import MarketTable from '../../Market/Table/ListView'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'

import { connect } from 'react-redux'
import { getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset } from '../../../actions/personalCenter'
import { useLang } from '../../../language'
import { lang } from 'moment';
function Market({
  createdMarket: { markets: createdMarkets, getting: gettingCreatedMarmkets, error: createdMarketsError, hasNextPage: createdMarketsHasNextPage }, 
  tradedMarket: { markets: tradedMarkets, getting: gettingTradedMarmkets, error: tradedMarketsError, hasNextPage: tradedMarketsHasNextPage }, 
  collectedMarket: { markets: collectedMarkets, getting: gettingCollectedMarmkets, error: collectedMarketsError, hasNextPage: collectedMarketsHasNextPage },   
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
  const [lang] = useLang()
  return (
    <Col>
      <Panel
        expandedDark
        expanded={expandCreated}
        onClick={() => setExpandCreated(!expandCreated)}
        error={createdMarketsError}
        loading={gettingCreatedMarmkets}
        header={lang.personalCentre.inMarket.created}
        body={<MarketTable markets={createdMarkets} hasMore={createdMarketsHasNextPage} loadMore={getCreatedMarkets} isLoading={gettingCreatedMarmkets} />} />
      {expandCreated && <Hr />}
      <Panel
        expandedDark
        expanded={expandSaved}
        onClick={() => setExpandSaved(!expandSaved)}
        error={collectedMarketsError}
        loading={gettingCollectedMarmkets}
        header={lang.personalCentre.inMarket.saved}
        body={<MarketTable markets={collectedMarkets} hasMore={collectedMarketsHasNextPage} loadMore={getCollectedMarkets} isLoading={gettingCollectedMarmkets} />} />
      {expandSaved && <Hr />}
      <Panel
        expandedDark
        expanded={expandTraded}
        onClick={() => setExpandTraded(!expandTraded)}
        error={tradedMarketsError}
        loading={gettingTradedMarmkets}
        header={lang.personalCentre.inMarket.subscribed}
        body={<MarketTable markets={tradedMarkets} hasMore={tradedMarketsHasNextPage} loadMore={getTradedMarkets} isLoading={gettingTradedMarmkets} />} />
    </Col>
  )
}

const mapStateToProps = state => ({
  createdMarket: state.userCreatedMarket,
  tradedMarket: state.userTradedMarket,
  collectedMarket: state.userSavedMarket,
});

const mapDispatchToProps = {
  getCreatedMarkets, getTradedMarkets, getCollectedMarkets, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);