import React, {useEffect} from 'react'
import { Row, Col } from '../../components/Layout'
import NotificationItem from '../../components/Notification'
import Search from '../../components/Search'
import Hr from '../../components/Hr'
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';

import { connect } from 'react-redux'
import { getNotificationList } from '../../actions/notification'

const TYPES = {
  trade: {
    value: 'TradeFinish',
    image: smartupIcon,
  },
  announcement: {
    value: 'announcement',
    image: ethIcon
  },
  system: {
    value: 'system',
    image: ethIcon
  },
  market: {
    value: 'MarketCreateFinish',
    image: smartupIcon,
  },
}

const typeValueToImage = Object.keys(TYPES).reduce((p, t) => ({
  ...p,
  [TYPES[t].value]: TYPES[t].image
}), {})

// const notificaitons = [
//   { id: 1, type: TYPES.trade.value, unread: true, sender: 'SMARTUP', title: 'Trade order', content: `You're drawn to be juror for dispute of idea rdv43w efr rfv r gf 43wsrf `, createdDateTime: 1554266225299, },
//   { id: 2, type: TYPES.trade.value, unread: false, sender: 'SMARTUP', title: 'Trade order', content: `You're drawn to be juror for dispute of idea `, createdDateTime: 1553740797139, },
//   { id: 3, type: TYPES.announcement.value, unread: true, sender: 'SMARTUP', title: 'Trade order', content: `You're drawn to be juror for dispute of idea`, createdDateTime: 1553740797139, },
// ]

const Notification = ({
  notifications,
  getNotificationList,
}) => {
  useEffect(() => {
    getNotificationList()
  }, [])
  return (
    <Col>
      <Row relative right>
        <Search id='notification' />
      </Row>
      {
        notifications.map(n =>
          <NotificationItem
            key={n.notificationId}
            id={n.notificationId}
            onClick={console.debug}
            image={typeValueToImage[n.type]}
            sender={n.sender}
            title={n.title}
            content={n.content}
            date={n.createTime}
            unread={!n.isRead}
          />
        )
      }
      <Hr />
    </Col>
  )
}

const mapStateToProps = state => ({
  notifications: state.notification.notifications
});

const mapDispatchToProps = { 
  getNotificationList
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);