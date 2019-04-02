import React, { useState } from 'react'

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

import LoginIcon from '../../images/menu1.svg'

const TABS = [
  { label: lang.panel.tab.portfilio[currentLang], value: 'portfilio', component: 
    ({expandedWallet, setExpandedWallet, expandedMarket, setExpandedMarket, expandedBookmark, setExpandedBookmark}) => 
    <Portfolio {...{expandedWallet, setExpandedWallet, expandedMarket, setExpandedMarket, expandedBookmark, setExpandedBookmark}} /> 
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


export default () => {
  const [loggedIn, login] = useState(true)
  const [activeTab, setActiveTab] = useState('notification')
  const [expandedWallet, setExpandedWallet] = useState(true)
  const [expandedMarket, setExpandedMarket] = useState(false)
  const [expandedBookmark, setExpandedBookmark] = useState(false)
  const onClickTab = (value) => setActiveTab(value)
  return (
    <Col width='300px' center={!loggedIn} centerVertical={!loggedIn}>
      {loggedIn ?
      <>
        <Top centerVertical spaceBetween>
          <Row centerVertical>
            <Image source={LoginIcon} L rightText />
            <Text note>Smart</Text>
          </Row>
          <Col>
            <Text S note>0x3dd0b1...5b5fec</Text>
            <Text right S note>200 honours</Text>
          </Col>
        </Top>
        <Tab tabs={TABS} activeTab={activeTab} onClick={onClickTab} />
        {
          TABS.find(t => t.value === activeTab).component({
            expandedWallet, setExpandedWallet, expandedMarket, setExpandedMarket, expandedBookmark, setExpandedBookmark
          })
        }
        <Terms />
      </>
      :
      <Col center>
        <People XL round color={theme.white} round />
        <Button primary outline verticalMargin label={lang.panel.connectButton[currentLang]} onClick={() => login(true)} />
        <Text note>MetaMask</Text>
      </Col>
      }
    </Col>
  )
}
