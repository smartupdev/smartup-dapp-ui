import React, { useEffect } from 'react'

import styled from 'styled-components'
import Image from '../../components/Image'
import Avatar from '../../components/Avatar'
import { People } from '../../components/Icon'
import Button from '../../components/Button'
import Text, { A } from '../../components/Text'
import Tab from '../../components/Tab'
import Hr from '../../components/Hr'
import Portfolio from './Portfolio'
import Notification from './Notification'
import Setting from './Setting'
import theme from '../../theme'
import { Col, Row } from '../../components/Layout'

import lang, { currentLang } from '../../lang'
import { shorten } from '../../lib/util'

import { connect } from 'react-redux'
import { setActiveTab } from '../../actions/panel'
import { loginMetaMask } from '../../actions/user'
import { watch as watchNotification } from '../../actions/notification'

const PANEL_WIDTH = 300

function getTabs(unreadCount) {
  return [
    { label: lang.panel.tab.portfilio[currentLang], component: Portfolio },
    { label: lang.panel.tab.notification[currentLang], dot: !!unreadCount, component: Notification },
    { label: lang.panel.tab.setting[currentLang], component: Setting },
  ]
}

const Top = styled(Row)`
  padding: ${p => `${p.theme.spacingS} ${p.theme.spacingM}`};
`

const Terms = () =>
  <Col flex={1} bottom center>
    <Hr />
    <Text underline S VM onClick={() => console.log('Get terms of services')}>Terms of Service</Text>
  </Col>


const Panel = ({ 
  nttBalance,
  metaMaskHint, account, 
  userAvatar, userName, loginMetaMask, 
  loggedIn, isLoading, metaMaskEableError, metaMaskSignError,
  setActiveTab, activeTabIndex,
  watchNotification, unreadCount }) => {
  const TABS = getTabs(unreadCount)
  const Main = TABS[activeTabIndex].component
  useEffect(() => {
    watchNotification()
  }, [])
  return (
    <Col width={`${PANEL_WIDTH}px`} center={!loggedIn} centerVertical={!loggedIn}>
      {loggedIn ?
        <>
          <Top centerVertical spaceBetween>
            <Avatar icon={userAvatar} username={userName} />
            <Col>
              <Text S note>{shorten(account)}</Text>
              <Text right S note>200 honours</Text>
              <Text right S note>{nttBalance} NTT</Text>
            </Col>
          </Top>
          <Tab tabs={TABS} activeIndex={activeTabIndex} onClick={setActiveTab} fullWidth />
          <Main />
          <Terms />
        </>
        :
        <Col center>
          <People XL round color={theme.white} />
          <Button primary outline verticalMargin label={lang.panel.connectButton[currentLang]} onClick={loginMetaMask} disabled={isLoading} />
          <Text note>{isLoading ? 'Please check Metamask' : metaMaskHint}</Text>
            <Row width={`${PANEL_WIDTH*.8}px`} spacingTopXS>
              { metaMaskEableError &&
                <Text error S>Please install or enable the MetaMask browser plug-in from <A XS error href='https://metamask.io/' target="_blank">Metamask.io</A></Text>
              }
              { metaMaskSignError &&
                <Text error S>Please sign the message for login purpose.</Text>
              }
            </Row>
        </Col>
      }
    </Col>
  )
}

const mapStateToProps = state => ({
  nttBalance: state.user.nttBalance,
  account: state.user.account,
  loginError: state.user.loginError,
  metaMaskHint: state.user.metaMaskHint,
  userName: state.user.userName,
  userAvatar: state.user.userAvatar,
  activeTabIndex: state.panel.activeTabIndex,
  loggedIn: state.user.loggedIn,
  isLoading: state.user.isLoading,
  metaMaskEableError: state.user.metaMaskEableError,
  metaMaskSignError: state.user.metaMaskSignError,
  unreadCount: state.notification.unreadCount
});

const mapDispatchToProps = {
  loginMetaMask,
  setActiveTab,
  watchNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
