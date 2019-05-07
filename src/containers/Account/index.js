import React from 'react'

import { Row, Col } from '../../components/Layout'
import Tab from '../../components/Tab'
import Text from '../../components/Text'
import Hr from '../../components/Hr'

import routes, { Link, getUrlParams, routeMap } from '../../routes'


export default () => {
  const TABS = routes
    .filter(r => r.path.includes('/account/'))
    .map(r => ({
      label: r.label,
      value: r.id,
      path: r.path
    }))
  const activeIndex = TABS.findIndex(t => window.location.hash.includes(t.path))
  return (
    <Col>
      <Text center VS L>PERSONAL CENTER</Text>
      <Link>
        {
          ({ goto }) => 
            <Tab tabs={TABS} activeIndex={activeIndex} width='100px' onClick={(i, value) => goto[value]()} />
        }
      </Link>
    </Col>
  )
}
