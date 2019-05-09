import React, {useEffect, useCallback} from 'react'
import { Row, Col } from '../../components/Layout'
import NotificationItem from '../../components/Notification'
import Search from '../../components/Search'
import { DonutLoader } from '../../components/Loader'
import Button from '../../components/Button'
import Text from '../../components/Text'
import { Expand, Tick } from '../../components/Icon'
import Hr from '../../components/Hr'
import ScrollLoader from '../../components/ScrollLoader'
import { Link, withLink } from '../../routes'
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

function noop() {}
const Notification = ({
  notification: { notifications, showUnreadOnly, unreadCount, gettingNotifications, keyword, hasNextPage },
  getList,
  read,
  goto,
  history,
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
  const onClick = useCallback( n => {
    n.marketId && goto.trading({id: n.marketId})
    n.unread && read(n.id)
  }, [])
  return (
    <Col overflowAuto>
      <Row relative centerVertical>
        { !keyword && <Expand S LeftS color={showUnreadOnly && !disabled ? theme.colorPrimary : theme.colorSecondary} onClick={(!disabled && toggleShowUnread) || noop} />}
        <Tick S MarginHS color={!readAllDisabled && !disabled ? theme.colorPrimary : theme.colorSecondary} onClick={readAllDisabled ? noop : readAll} disabled={readAllDisabled} />
        {/* <Text LeftBase RightS primary={!readAllDisabled} note={readAllDisabled} onClick={readAllDisabled ? noop : readAll} disabled={readAllDisabled}>Read all</Text> */}
        { gettingNotifications && <DonutLoader S /> }
        <Search id='notification' backgroundColor={theme.bgColor} onChange={onChangeKeyword} value={keyword} onSearch={getList} />
      </Row>
      {
        notifications.map(n =>
          <NotificationItem
            marketId={n.content && n.content.marketId}
            key={n.notificationId}
            id={n.notificationId}
            onClick={onClick}
            image={n.style === TYPES.system.value ? TYPES.system.image : userAvatar}
            sender={n.style === TYPES.system.value ? 'SmartUp' : 'Me'}
            title={n.title}
            content={n.text}
            date={n.createTime}
            unread={!n.isRead}
          />
        )
      }
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

export default withLink(connect(mapStateToProps, mapDispatchToProps)(Notification));