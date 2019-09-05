import React from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Col, Row } from 'components/Layout'
import { Dropdown } from 'components/Input'
import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'

export default function() {
  const [{ api: { proposalState } }] = useLang()
  const stateOptions = [
    { label: proposalState[PROPOSAL_STATE.all], value: PROPOSAL_STATE.all },
    { label: proposalState[PROPOSAL_STATE.save], value: PROPOSAL_STATE.save },
    { label: proposalState[PROPOSAL_STATE.draft], value: PROPOSAL_STATE.draft },
    { label: proposalState[PROPOSAL_STATE.adminVote], value: PROPOSAL_STATE.adminVote },
    { label: proposalState[PROPOSAL_STATE.publicVote], value: PROPOSAL_STATE.publicVote },
    { label: proposalState[PROPOSAL_STATE.ongoing], value: PROPOSAL_STATE.ongoing },
    { label: proposalState[PROPOSAL_STATE.review], value: PROPOSAL_STATE.review },
    { label: proposalState[PROPOSAL_STATE.closed], value: PROPOSAL_STATE.closed },
  ]
  return (
    <Col flex={1}>
      <Row>
        <Dropdown options={stateOptions} value={PROPOSAL_STATE.all} />
      </Row>
      <Hr />
    </Col>
  )  
}