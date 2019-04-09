import React from 'react'

import styled from 'styled-components'
import Image from '../../components/Image'
import { People } from '../../components/Icon'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Tab from '../../components/Tab'
import Hr from '../../components/Hr'
import Portfolio from './Portfolio'
import Notification from './Notification'
import Setting from './Setting'
import theme from '../../theme'
import { Col, Row } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import { connect } from 'react-redux'
import {
  setActiveTab, setExpandedWallet, setExpandedMarket, setExpandedBookmark,
} from '../../actions/panel'
import { updateUserName, updateUserAvatar } from '../../actions/user'
import { loginMetaMask } from '../../actions/metamask'

const PANEL_WIDTH = 300

const TABS = [
  {
    label: lang.panel.tab.portfilio[currentLang], value: 'portfilio', component:
      ({ ethBalance, expandedWallet, setExpandedWallet, expandedMarket, setExpandedMarket, expandedBookmark, setExpandedBookmark }) =>
        <Portfolio {...{ ethBalance, expandedWallet, setExpandedWallet, expandedMarket, setExpandedMarket, expandedBookmark, setExpandedBookmark }} />
  },
  { label: lang.panel.tab.notification[currentLang], value: 'notification', dot: true, component: Notification },
  { label: lang.panel.tab.setting[currentLang], value: 'setting', component: Setting },
]

const Top = styled(Row)`
  padding: ${p => `${p.theme.spacingS} ${p.theme.spacingM}`};
`

const Terms = () =>
  <Col flex={1} bottom center>
    <Hr />
    <Text underline S spaceV onClick={() => console.log('Get terms of services')}>Terms of Service</Text>
  </Col>


const Panel = ({ metaMaskHint, loggedIn, account, ethBalance, activeTab, expandedWallet,
  expandedMarket, expandedBookmark, userAvatar, userName,
  setExpandedWallet, setExpandedMarket, setExpandedBookmark, loginMetaMask,
  setActiveTab }) => {
  return (
    <Col width={`${PANEL_WIDTH}px`} center={!loggedIn} centerVertical={!loggedIn}>
      {loggedIn ?
        <>
          <Top centerVertical spaceBetween>
            <Row centerVertical>
              <Image source={userAvatar} L rightText />
              <Text note>{userName}</Text>
            </Row>
            <Col>
              <Text S note>{account}</Text>
              <Text right S note>200 honours</Text>
            </Col>
          </Top>
          <Tab tabs={TABS} activeTab={activeTab} onClick={setActiveTab} fullWidth />
          {
            TABS.find(t => t.value === activeTab).component({
              ethBalance,
              expandedWallet, setExpandedWallet, expandedMarket, setExpandedMarket, expandedBookmark, setExpandedBookmark
            })
          }
          <Terms />
        </>
        :
        <Col center>
          <People XL round color={theme.white} round />
          <Button primary outline verticalMargin label={lang.panel.connectButton[currentLang]} onClick={loginMetaMask} />
          <Text note>{metaMaskHint}</Text>
          {/* <Row width={`${PANEL_WIDTH*.8}px`} spacingTopXS>
            <Text error>Please install or enable the MetaMask browser plug-in from Metamask.io</Text>
          </Row> */}
        </Col>
      }
    </Col>
  )
}

const mapStateToProps = state => ({
  account: state.metamask.account,
  ethBalance: state.metamask.ethBalance,
  sutBalance: state.metamask.sutBalance,
  nttBalance: state.metamask.nttBalance,
  loggedIn: state.metamask.loggedIn,
  metaMaskHint: state.user.metaMaskHint,
  userName: state.user.userName,
  userAvatar: state.user.userAvatar,
  activeTab: state.panel.activeTab,
  expandedWallet: state.panel.expandedWallet,
  expandedMarket: state.panel.expandedMarket,
  expandedBookmark: state.panel.expandedBookmark,
});

const mapDispatchToProps = {
  loginMetaMask,
  updateUserName,
  updateUserAvatar,
  setActiveTab,
  setExpandedWallet,
  setExpandedMarket,
  setExpandedBookmark,
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
