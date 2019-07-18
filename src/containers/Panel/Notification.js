import React, {useEffect, useCallback} from 'react'
import { Row, Col } from '../../components/Layout'
import NotificationItem from '../../components/Notification'
import Search from '../../components/Search'
import { DonutLoader } from '../../components/Loader'
import Text from '../../components/Text'
import { Expand, Tick } from '../../components/Icon'
import Hr from '../../components/Hr'
import ScrollLoader from '../../components/ScrollLoader'
import { withLink } from '../../routes'
import { useLang } from '../../language'
import theme from '../../theme'
import smartupIcon from '../../images/smartup.png';

import { connect } from 'react-redux'
import { getList, read, readAll, toggleShowUnread, onChangeKeyword } from '../../actions/notification'

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
  setOpen,
  notification: { notifications, showUnreadOnly, unreadCount, gettingNotifications, keyword, hasNextPage, notificationsError },
  getList,
  read,
  goto,
  history,
  readAll,
  userAvatar,
  toggleShowUnread,
  onChangeKeyword,
}) => {
  const [lang] = useLang()
  useEffect(() => {
    getList()
  }, [showUnreadOnly, lang])
  const disabled = gettingNotifications
  const readAllDisabled = !unreadCount || disabled
  const onClick = useCallback( n => {
    if(n.marketId) goto.trading({id: n.marketId})
    else if(n.txHash) goto.accountTransaction({ txHash: n.txHash })
    n.unread && read(n.id)
    setOpen(false)
  }, [])
  return (
    <Col overflowAuto fullHeight>
      <Row relative centerVertical>
        { !keyword && <Expand S LeftS color={showUnreadOnly && !disabled ? theme.colorPrimary : theme.colorSecondary} onClick={(!disabled && toggleShowUnread) || noop} />}
        <Tick S MarginHS color={!readAllDisabled && !disabled ? theme.colorPrimary : theme.colorSecondary} onClick={readAllDisabled ? noop : readAll} disabled={readAllDisabled} />
        {/* <Text LeftBase RightS primary={!readAllDisabled} note={readAllDisabled} onClick={readAllDisabled ? noop : readAll} disabled={readAllDisabled}>Read all</Text> */}
        { gettingNotifications && <DonutLoader S /> }
        <Search id='notification' backgroundColor={theme.bgColor} onChange={onChangeKeyword} value={keyword} onSearch={() => getList()} />
      </Row>
      {
        notificationsError ? <Text S error center>{notificationsError.message}</Text> :
        <>
          {
            notifications.map(n =>
              <NotificationItem
                marketId={n.content && n.content.marketId}
                txHash={n.content && n.content.txHash}
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
            <ScrollLoader isButton hasMore={hasNextPage} loadMore={getList} isLoading={gettingNotifications} noResult={!notifications.length} />
          </>
      }
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