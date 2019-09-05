import React from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Col, Row } from 'components/Layout'
import { Dropdown } from 'components/Input'
import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'

export default function() {
  const [{ api: { proposalState } }] = useLang()
  return (
    <Col flex={1}>
      <Text>D</Text>
    </Col>
  )  
}