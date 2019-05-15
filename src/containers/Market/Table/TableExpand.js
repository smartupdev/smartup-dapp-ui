import React from 'react'
import { Link, routeMap } from '../../../routes'
import { Row, Col } from '../../../components/Layout'
import theme from '../../../theme'
import { Comment, Trade, Bookmarked, Share, CommunityMember } from '../../../components/Icon'
import Text from '../../../components/Text'
import lang, { currentLang } from '../../../lang'
import Button from '../../../components/Button'
import Image from '../../../components/Image'
import { connect } from 'react-redux'
import { toggleSavedMarket } from '../../../actions/market'

import { ToastConsumer } from 'react-toast-notifications'
import { share } from '../../../alphaWebService'

const TableExpand = ({ record, toggleSavedMarket }) => {
  return (
  <Row BottomS TopS>
    <Col LeftXS RightL>
      <Image source={record.cover} photo cover />
    </Col>
    <Col spaceBetween flex={1}>
      <Row spaceBetween> 
        <Col>
          <Text XL wordSpaceL>{record.name}</Text>
          <Text note>{record.overview}</Text>
        </Col>
        <Row>
          <ToastConsumer>
            {
              ({add}) => // TODO: Clear up 
                <Share S color={theme.white} onClick={() => {
                  share({id: record.id}, routeMap.trading.path)
                  add(`Link copied to clipboard.`, { appearance: 'info', autoDismiss: true })
                }} />
            }
          </ToastConsumer>
          <Bookmarked S MarginLeftS onClick={() => toggleSavedMarket(record)} checked={record.following} /> 
        </Row>
      </Row>
      <Row centerVertical spaceBetween>
        <Row>
          <Button label={record.numberOfComments} icon={Comment} />
          <Button label={record.numberOfSub} icon={CommunityMember} iconSize='14px' />
        </Row>
        <Link>
          { ({goto}) =>
            <Button primary label={lang.trade[currentLang]} icon={Trade} onClick={()=>goto.trading({id: record.id})} />
          }
        </Link>
      </Row>
    </Col>
  </Row>
  )
}

const mapDispatchToProps = {
  toggleSavedMarket
}

export default connect(null, mapDispatchToProps)(TableExpand);