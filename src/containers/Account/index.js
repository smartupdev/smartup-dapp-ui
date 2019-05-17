import React from 'react'

import { Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Text from '../../components/Text'

import { withUser } from './connectUser'

import { Link, accountRoutes, getPath, AccountRoutes } from '../../routes'

import { useLang } from '../../language'

function Index({ loggedIn }) {
  const [lang] = useLang()
  const currentPath = getPath()
  let activeIndex = accountRoutes.findIndex(t => t.path === currentPath)
  if(activeIndex < 0) activeIndex = 0
  return (
    <Col>
      <Text center VS L>{lang.personalCentre.personalCentre}</Text>
      <Link>
        {
          ({ goto }) => 
            <Tab tabs={accountRoutes} activeIndex={activeIndex} width='100px' onClick={(i, value) => goto[value]()} />
        }
      </Link>
      {
        loggedIn ?
          <AccountRoutes />
        : <Text VS center note> {lang.personalCentre.connectMetaMask} </Text>
      }
    </Col>
  )
}

export default withUser(Index)