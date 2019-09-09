import React, { useEffect } from 'react'

import styled, { css } from 'styled-components'
import { media, fadeIn } from '../../components/Theme'
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
import { ENV } from '../../config'
import { shorten } from '../../lib/util'
import { usePolling } from '../../lib/react'

import { connect } from 'react-redux'
import { LOGIN_METAMASK_FAILED, USER_PERSON_SIGN_FAILED } from '../../actions/actionTypes'
import { setActiveTab, setOpen } from '../../actions/panel'
import { loginMetaMask } from '../../actions/user'
import { onClickTnc } from '../../actions/ipfs'
import { getUnread } from '../../actions/notification'

const PANEL_WIDTH = 300

// ${p => media(!p.isOpen ? 'max-width: 0vw; width: 0vw;' : 'max-width: 100vw; width: 100vw;')}
const Box = styled(Col)`
  width: ${PANEL_WIDTH}px
  overflow: hidden;
  ${p => media(css`
    width: 100vw; 
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: ${p.theme.bgColor}
    ${p.isOpen ? 
      fadeIn(1, 2) : 
      'opacity: 0; display: none;'
    }
  `)}
  z-index: 11;
  ${css`${p => p.theme.animation.slideOut}`}
`

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
  return (
    <Col flex={1} bottom center>
      <Hr />
      <Text underline S VM onClick={onClickTnc}>{lang.term}</Text>
    </Col>
  )  
}

const networkName = {
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network'
}

const Panel = ({ 
  setOpen, isOpen,
  metamask, metaMaskHint, 
  address, avatarHash, displayName, 
  ntt,
  loginMetaMask, 
  loggedIn, isLoading, loginError,
  setActiveTab, activeTabIndex,
  getUnread, unreadCount }) => {
  const TABS = getTabs(unreadCount)
  const Main = TABS[activeTabIndex].component
  usePolling(loggedIn ? getUnread : ()=>{}, 10000, [loggedIn])
  const [lang] = useLang()
  const metamaskError = 
      metamask.isEnabled === undefined ? <Text error S>{lang.panel.login.installMetamask} <A XS error href='https://metamask.io/' target="_blank">Metamask.io</A></Text> 
    : !metamask.isUnlocked ? <Text error S>{lang.panel.login.login}</Text>
    : !metamask.isTargetNetwork ? <Text error S>{lang.panel.login.changeNetwork} {networkName[ENV.networkVersion] || 'Main Ethereum Network'}</Text> 
    : loginError === USER_PERSON_SIGN_FAILED ? <Text error S>{lang.panel.login.sign}</Text> 
    : loginError === LOGIN_METAMASK_FAILED ? <Text error S>{lang.panel.login.enable}</Text> 
    : loginError ? <Text error S>{lang.panel.login.fail}</Text> :
    ''
  
  return (
    <Box center={!loggedIn} centerVertical={!loggedIn} isOpen={isOpen}>
      {loggedIn ?
        <>
          <Top centerVertical spaceBetween>
            <Avatar icon={avatarHash} username={displayName} onClick={() => setActiveTab(2)} />
            <Col>
              <Text S note>{shorten(address)}</Text>
              {/* <Text right S note>200 honours</Text> */}
              <Text right S note>{ntt} NTT</Text>
            </Col>
          </Top>
          <Tab tabs={TABS} activeIndex={activeTabIndex} onClick={setActiveTab} fullWidth />
          <Main setOpen={setOpen} />
          <Terms />
        </>
        :
        <Col center>
          <People XL round color={theme.white} />
          <Button primary outline verticalMargin label={lang.panel.connectButton} onClick={loginMetaMask} disabled={isLoading || (metamaskError && !loginError)} />
          <Text note>{isLoading ? lang.panel.login.checkMetamask : metaMaskHint}</Text>
            <Row width={`${PANEL_WIDTH*.8}px`} spacingTopXS center>
              {metamaskError}
            </Row>
        </Col>
      }
    </Box>
  )
}

const mapStateToProps = state => ({
  metamask: state.metamask,

  metaMaskHint: state.user.metaMaskHint, // TODO: remove

  loggedIn: state.user.loggedIn,
  isLoading: state.user.isLoading,
  loginError: state.user.loginError,

  address: state.user.address,  
  displayName: state.user.displayName,
  avatarHash: state.user.avatarHash,

  ntt: state.wallet.ntt,
  
  activeTabIndex: state.panel.activeTabIndex,
  unreadCount: state.notification.unreadCount
});

const mapDispatchToProps = {
  loginMetaMask,
  setActiveTab,
  setOpen,
  getUnread
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
