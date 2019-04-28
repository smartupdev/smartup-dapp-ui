import React, { Fragment, useState }  from 'react'

import { Row, Col } from '../../../components/Layout'
// import DiscussionComment from '../../Market/DiscussionComment'
import Text from '../../../components/Text'
import Hr from '../../../components/Hr'
import Panel from '../../../components/Panel'

export default () => {
  const [expandCreated, setExpandCreated] = useState(true)
  const [expandSaved, setExpandSaved] = useState(false)

  return (
    <Col>
      <Panel
        expanded={expandCreated}
        onClick={() => setExpandCreated(!expandCreated)}
        header='Created market'
        body={
          <Fragment>
            <Text center VM note>Under development</Text>
            <Hr />
          </Fragment>
        }/>
    </Col>
  )
}