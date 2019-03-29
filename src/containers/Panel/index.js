import React, { useState } from 'react'

import styled from 'styled-components'
import Image from '../../components/Image'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Tab from '../../components/Tab'
import Portfolio from './Portfolio'
import Notification from './Notification'
import Setting from './Setting'
import { Col, Row } from '../../components/Layout'
import lang, { currentLang } from '../../lang'

import LoginIcon from '../../images/menu1.svg'

const TABS = [
  { label: lang.panel.tab.portfilio[currentLang], value: 'portfilio', component: Portfolio },
  { label: lang.panel.tab.notification[currentLang], value: 'notification', dot: true, component: Notification },
  { label: lang.panel.tab.setting[currentLang], value: 'setting', component: Setting },
]

const Top = styled(Row)`
  padding: ${p => `${p.theme.spacingS} ${p.theme.spacingM}`};
`

export default () => {
  const [loggedIn, login] = useState(true)
  const [activeTab, setActiveTab] = useState('portfilio')
  const onClickTab = (value) => setActiveTab(value)
  return (
    <Col width='300px' center={!loggedIn} centerVertical={!loggedIn}>
      {loggedIn ?
      <>
        <Top centerVertical spaceBetween>
          <Row centerVertical>
            <Image source={LoginIcon} rightText />
            <Text note>Smart</Text>
          </Row>
          <Col>
            <Text S note>0x3dd0b1...5b5fec</Text>
            <Text right S note>200 honours</Text>
          </Col>
        </Top>
        <Tab tabs={TABS} activeTab={activeTab} onClick={onClickTab} />
        {
          TABS.find(t => t.value === activeTab).component()
        }
      </>
      :
      <Col center>
        <Image source={LoginIcon} />
        <Button primary outline verticalMargin label={lang.panel.connectButton[currentLang]} onClick={() => login(true)} />
        <Text note>MetaMask</Text>
      </Col>
      }
    </Col>
  )
}
