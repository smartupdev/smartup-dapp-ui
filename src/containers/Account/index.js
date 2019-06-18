import React from 'react'

import { Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Text from '../../components/Text'
import Hr from '../../components/Hr'

import { Dropdown } from '../../components/Input'
import { Header } from '../../components/Header/MobileHeader'

import { withUser } from './connectUser'

import { withLink, accountRoutes, getPath, AccountRoutes } from '../../routes'

import { useLang } from '../../language'

function Index({ loggedIn, goto }) {
  const [{personalCentre: {personalCentre, connectMetaMask}, routes}] = useLang()
  const currentPath = getPath()
  const tabs = accountRoutes.map(r => ({...r, label: routes[r.id]}) )
  let activeIndex = accountRoutes.findIndex(t => t.path === currentPath)
  if(activeIndex < 0) activeIndex = 0
  return (
    <Col>
      <Header center>
        <Text>{personalCentre}</Text>
      </Header>
      <Dropdown options={tabs} selectedIndex={activeIndex} onChange={index => goto[tabs[index].value]()} width='100%' hiddenDesktop  />
      <Hr hiddenDesktop />
      <Text center VS L hiddenMobile>{personalCentre}</Text>
      <Col hiddenMobile>
        <Tab tabs={tabs} activeIndex={activeIndex} width='100px' onClick={(i, value) => goto[value]()} />
      </Col>
      {
        loggedIn ?
          <AccountRoutes />
        : <Text VS center note> {connectMetaMask} </Text>
      }
    </Col>
  )
}

export default withUser(withLink(Index))