import React from 'react'

import { Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Text from '../../components/Text'

import { withUser } from './connectUser'

import { Link, accountRoutes, getPath, AccountRoutes } from '../../routes'

import { useLang } from '../../language'

function Index({ loggedIn }) {
  const [{personalCentre: {personalCentre, connectMetaMask}, routes}] = useLang()
  const currentPath = getPath()
  const tabs = accountRoutes.map(r => ({...r, label: routes[r.id]}) )
  let activeIndex = accountRoutes.findIndex(t => t.path === currentPath)
  if(activeIndex < 0) activeIndex = 0
  return (
    <Col>
      <Text center VS L>{personalCentre}</Text>
      <Link>
        {
          ({ goto }) => 
            <Tab tabs={tabs} activeIndex={activeIndex} width='100px' onClick={(i, value) => goto[value]()} />
        }
      </Link>
      {
        loggedIn ?
          <AccountRoutes />
        : <Text VS center note> {connectMetaMask} </Text>
      }
    </Col>
  )
}

export default withUser(Index)