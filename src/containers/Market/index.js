import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import { Row, Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Table from '../../components/Table'
import Icon, { Comment, Trade, People, More, Bookmarked } from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Hr from '../../components/Hr'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Market = ({market}) => {
  console.log(market)
  return (
    <Col>
      <Row spaceBetween spacingTopXS spacingBottomXS spacingRightS spacingLeftS>
        <Row centerVertical>
          { market.icon ? 
              <Image source={market.icon} rightText /> : 
              <People color={theme.white} round rightText /> 
          }
          <Text>{market.name}</Text>
        </Row>
        <Row centerVertical>
          <Button label={market.numberOfComments} icon={Comment} />
          <Button label={market.numberOfSub} icon={People} />
          <Bookmarked S onClick={() => console.log(market.id)} checked={market.following} /> 
        </Row>
      </Row>
      <Hr />
      <div>Market</div>
    </Col>
  )
}

const ConnectMarket = ({ markets, location }) => {
  const id = new URLSearchParams(location.search).get('id');
  return (
    <Market market={markets.find(m => m.id === id)} />
  )
}

const mapStateToProps = state => ({
  markets: state.home.markets,
});

export default connect(mapStateToProps)(withRouter(ConnectMarket));