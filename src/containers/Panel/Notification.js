import React, {useEffect} from 'react'
import { Row, Col } from '../../components/Layout'
import NotificationItem from '../../components/Notification'
import Search from '../../components/Search'
import Hr from '../../components/Hr'
import { Link } from '../../routes'
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';

import { shorten } from '../../lib/util';

import { connect } from 'react-redux'
import { getNotificationList, setNotificationRead } from '../../actions/notification'

const TYPES = {
  personal: {
    value: 'personal',
    image: null,
  },
  system: {
    value: 'system',
    image: smartupIcon
  },
}

// const typeValueToImage = Object.keys(TYPES).reduce((p, t) => ({
//   ...p,
//   [TYPES[t].value]: TYPES[t].image
// }), {})

const Notification = ({
  notifications,
  getNotificationList,
  setNotificationRead,
  userAvatar
}) => {
  useEffect(() => {
    getNotificationList()
  }, [])
  return (
    <Col>
      <Row relative right>
        <Search id='notification' />
      </Row>
      <Link>
      { ({ goto }) =>
        notifications.map(n =>
          <NotificationItem
            key={n.notificationId}
            id={n.notificationId}
            onClick={() => {
              n.content && n.content.marketId && goto.trading({id: n.content.marketId})
              setNotificationRead(n.notificationId)
            }}
            image={n.style === TYPES.system.value ? TYPES.system.image : userAvatar}
            sender={shorten(n.userAddress)}
            title={n.title}
            content={n.text}
            date={n.createTime}
            unread={!n.isRead}
          />
        )
      }
      </Link>
      <Hr />
    </Col>
  )
}

const mapStateToProps = state => ({
  notifications: state.notification.notifications,
  userAvatar: state.user.userAvatar
});

const mapDispatchToProps = { 
  getNotificationList, setNotificationRead
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);