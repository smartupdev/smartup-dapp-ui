import React, {useEffect} from 'react'
import { Row, Col } from '../../components/Layout'
import NotificationItem from '../../components/Notification'
import Search from '../../components/Search'
import { DonutLoader } from '../../components/Loader'
import Button from '../../components/Button'
import Text from '../../components/Text'
import { Expand, Tick } from '../../components/Icon'
import Hr from '../../components/Hr'
import ScrollLoader from '../../components/ScrollLoader'
import { Link } from '../../routes'
import theme from '../../theme'
import ethIcon from '../../images/eth.png';
import smartupIcon from '../../images/smartup.png';

import { shorten } from '../../lib/util';

import { connect } from 'react-redux'
import { getList, read, readAll, toggleShowUnread, onChangeKeyword } from '../../actions/notification'
import { ipfsHost } from '../../actions/ipfs'

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
function noop() {}
const Notification = ({
  notification: { notifications, showUnreadOnly, unreadCount, gettingNotifications, keyword, hasNextPage },
  getList,
  read,
  readAll,
  userAvatar,
  toggleShowUnread,
  onChangeKeyword,
}) => {
  useEffect(() => {
    getList()
  }, [showUnreadOnly])
  const disabled = gettingNotifications
  const readAllDisabled = !unreadCount || disabled
  return (
    <Col overflowAuto>
      <Row relative centerVertical>
        { !keyword && <Expand S LeftS color={showUnreadOnly && !disabled ? theme.colorPrimary : theme.colorSecondary} onClick={(!disabled && toggleShowUnread) || noop} />}
        <Tick S MarginHS color={!readAllDisabled && !disabled ? theme.colorPrimary : theme.colorSecondary} onClick={readAllDisabled ? noop : readAll} disabled={readAllDisabled} />
        {/* <Text LeftBase RightS primary={!readAllDisabled} note={readAllDisabled} onClick={readAllDisabled ? noop : readAll} disabled={readAllDisabled}>Read all</Text> */}
        { gettingNotifications && <DonutLoader S /> }
        <Search id='notification' backgroundColor={theme.bgColor} onChange={onChangeKeyword} value={keyword} onSearch={getList} />
      </Row>
      <Link>
      { ({ goto }) =>
        notifications.map(n =>
          <NotificationItem
            key={n.notificationId}
            id={n.notificationId}
            onClick={() => {
              n.content && n.content.marketId && goto.trading({id: n.content.marketId})
              !n.isRead && read(n.notificationId)
            }}
            image={n.style === TYPES.system.value ? TYPES.system.image : userAvatar && (ipfsHost + userAvatar)}
            sender={n.style === TYPES.system.value ? 'SmartUp' : 'Me'}
            title={n.title}
            content={n.text}
            date={n.createTime}
            unread={!n.isRead}
          />
        )
      }
      </Link>
      <Hr />
      <ScrollLoader isButton hasMore={hasNextPage} loadMore={getList} isLoading={gettingNotifications}  />
    </Col>
  )
}

const mapStateToProps = state => ({
  notification: state.notification,
  userAvatar: state.user.userAvatar
});

const mapDispatchToProps = { 
  getList, read, readAll, toggleShowUnread, onChangeKeyword
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);