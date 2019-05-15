import React from 'react'

import { Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Text from '../../components/Text'

import { withUser } from './connectUser'

import { Link, accountRoutes, getPath, AccountRoutes } from '../../routes'

function Index({ loggedIn }) {
  const currentPath = getPath()
  let activeIndex = accountRoutes.findIndex(t => t.path === currentPath)
  if(activeIndex < 0) activeIndex = 0
  return (
    <Col>
      <Text center VS L>PERSONAL CENTER</Text>
      <Link>
        {
          ({ goto }) => 
            <Tab tabs={accountRoutes} activeIndex={activeIndex} width='100px' onClick={(i, value) => goto[value]()} />
        }
      </Link>
      {
        loggedIn ?
          <AccountRoutes />
        : <Text VS center note>You have to connect to Metamask.</Text>
      }
    </Col>
  )
}

export default withUser(Index)