import React from 'react'
import { Row, Col } from '../../../components/Layout'
import theme from '../../../theme'
import { Comment, Trade, Bookmarked, Share, CommunityMember } from '../../../components/Icon'
import Text from '../../../components/Text'
import { ENV } from '../../../config'
import Button from '../../../components/Button'
import Image from '../../../components/Image'
import { connect } from 'react-redux'
import { toggleSavedMarket } from '../../../actions/market'

import { ToastConsumer } from 'react-toast-notifications'
import { share } from '../../../alphaWebService'
import { useLang } from '../../../language'
import { withLink, routeMap } from '../../../routes'

function TableExpand({ record, toggleSavedMarket, goto }) {
  const [lang] = useLang()
  return (
  <Row BottomS TopS>
    <Col LeftXS RightL>
      <Image source={ENV.ipfsHost + record.cover} photo cover />
    </Col>
    <Col spaceBetween flex={1}>
      <Row spaceBetween> 
        <Col>
          <Text XL wordSpaceL onClick={() => goto.general({id: record.id})}>{record.name}</Text>
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
          <Button label={record.numberOfComments} icon={Comment} onClick={()=>goto.discussion({id: record.id})} />
          <Button label={record.numberOfSub} icon={CommunityMember} onClick={()=>goto.general({id: record.id})} iconSize='14px' />
        </Row>
        <Button primary label={lang.trade} icon={Trade} onClick={()=>goto.trading({id: record.id})} />
      </Row>
    </Col>
  </Row>
  )
}

const mapDispatchToProps = {
  toggleSavedMarket
}

export default withLink(connect(null, mapDispatchToProps)(TableExpand))