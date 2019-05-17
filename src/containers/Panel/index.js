import React, { useEffect } from 'react'

import styled from 'styled-components'
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

// import lang, { currentLang } from '../../lang'
import { useLang } from '../../language'
import { shorten } from '../../lib/util'

import { connect } from 'react-redux'
import { LOGIN_METAMASK_FAILED, USER_LOGIN_SMARTUP_FAILED, USER_PERSON_SIGN_FAILED, USER_AUTH_SMARTUP_FAILED } from '../../actions/actionTypes'
import { setActiveTab } from '../../actions/panel'
import { loginMetaMask } from '../../actions/user'
import { onClickTnc } from '../../actions/ipfs'
import { watch as watchNotification } from '../../actions/notification'

const PANEL_WIDTH = 300

function getTabs(unreadCount){
  const [lang] = useLang() 
  return [
    { label: lang.panel.tab.portfolio, component: Portfolio },
    { label: lang.panel.tab.notification, dot: !!unreadCount, component: Notification },
    { label: lang.panel.tab.setting, component: Setting },
  ]
}

const Top = styled(Row)`
  padding: ${p => `${p.theme.spacingS} ${p.theme.spacingM}`};
`

const Terms = () => {
  const [lang] = useLang()
  return [
  <Col flex={1} bottom center>
    <Hr />
    <Text underline S VM onClick={onClickTnc}>{lang.term}</Text>
  </Col>
  ]
}

const networkName = {
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network'
}

const Panel = ({ 
  metamask,
  nttBalance,
  metaMaskHint, account, 
  userAvatar, userName, loginMetaMask, 
  loggedIn, isLoading, loginError,
  setActiveTab, activeTabIndex,
  watchNotification, unreadCount }) => {
  const TABS = getTabs(unreadCount)
  const Main = TABS[activeTabIndex].component
  useEffect(() => {
    watchNotification()
  }, [])
  const metamaskError = 
      metamask.isEnabled === undefined ? <Text error S>Please install or enable the MetaMask browser plug-in from <A XS error href='https://metamask.io/' target="_blank">Metamask.io</A></Text> 
    : !metamask.isUnlocked ? <Text error S>Please login your MetaMask</Text>
    : !metamask.isTargetNetwork ? <Text error S>Please change MetaMask network to {networkName[metamask.networkVersion] || 'Main Ethereum Network'}</Text> 
    : loginError === USER_PERSON_SIGN_FAILED ? <Text error S>Please sign the message for login purpose</Text> 
    : loginError === LOGIN_METAMASK_FAILED ? <Text error S>Please enable MetaMask</Text> 
    : loginError ? <Text error S>Login failed. Please try again later</Text> :
    ''
  const [lang] = useLang()
  return (
    <Col width={`${PANEL_WIDTH}px`} center={!loggedIn} centerVertical={!loggedIn}>
      {loggedIn ?
        <>
          <Top centerVertical spaceBetween>
            <Avatar icon={userAvatar} username={userName} />
            <Col>
              <Text S note>{shorten(account)}</Text>
              {/* <Text right S note>200 honours</Text> */}
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
          <Button primary outline verticalMargin label={lang.panel.connectButton} onClick={loginMetaMask} disabled={isLoading || metamaskError && !loginError} />
          <Text note>{isLoading ? 'Please check Metamask' : metaMaskHint}</Text>
            <Row width={`${PANEL_WIDTH*.8}px`} spacingTopXS center>
              {metamaskError}
            </Row>
        </Col>
      }
    </Col>
  )
}

const mapStateToProps = state => ({
  metamask: state.metamask,

  metaMaskHint: state.user.metaMaskHint, // TODO: remove

  loggedIn: state.user.loggedIn,
  isLoading: state.user.isLoading,
  loginError: state.user.loginError,
  account: state.user.account,
  nttBalance: state.user.nttBalance,
  
  userName: state.user.userName,
  userAvatar: state.user.userAvatar,

  activeTabIndex: state.panel.activeTabIndex,
  unreadCount: state.notification.unreadCount
});

const mapDispatchToProps = {
  loginMetaMask,
  setActiveTab,
  watchNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
