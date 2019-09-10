import React, { useEffect } from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Col, Row } from 'components/Layout'
import Panel from 'components/Panel'
import { Dropdown } from 'components/Input'
import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'

import { connect } from 'react-redux'
import * as Actions from 'actions/proposal'

function Proposal({ 
  proposal: { filterState, sortBy, proposals, getting, error, hasNextPage },
  getProposalList, onChangeState, 
 }) {
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
  useEffect( () => {
    getProposalList()
  }, [])
  return (
    <Col flex={1}>
      <Row>
        <Dropdown options={stateOptions} value={filterState} onChange={onChangeState} />
      </Row>
      <Hr />
      {/* <Panel 
        headerLeft
        header='#1 Withdraw money for hiring a Marketing Manager'
        body
        expanded={true} 
        onClick
        bottomLine /> */}
    </Col>
  )  
}

const mapStateToProps = state => ({
  proposal: state.proposal
})
const mapDispatchToProps = Actions
export default connect(mapStateToProps, mapDispatchToProps)(Proposal)