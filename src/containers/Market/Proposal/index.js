import React, { useEffect, useState } from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Col, Row } from 'components/Layout'
import Panel from 'components/Panel'
import { Dropdown } from 'components/Input'
import Button from 'components/Button'
import Avatar from 'components/Avatar'
import { SimplePieChart } from 'components/Graph'
import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'

import { connect } from 'react-redux'
import * as Actions from 'actions/proposal'
import { Link } from 'routes'
import { toToken, dateDif } from 'lib/util'
import { useInterval } from 'lib/react'

import { ENV } from 'config'

import Item from './Item'

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
  const [ opened, setOpened ] = useState([])
  function toggleOpened(index) {
    let newOpened = [...opened]
    newOpened[index] = !newOpened[index]
    setOpened(newOpened)
  }
  useEffect(() => setOpened([true]), [sortBy])
  return (
    <Col flex={1}>
      <Row>
        <Dropdown options={stateOptions} value={filterState} onChange={onChangeState} />
      </Row>
      <Hr />
      { proposals.map( (proposal, index) => 
        <Panel 
          key={proposal.id}
          headerLeft
          header={`#${proposal.id} ${proposal.title}`}
          body={<Item {...proposal} />}
          expanded={opened[index]} 
          onClick={() => toggleOpened(index)}
          bottomLine />
      ) }
    </Col>
  )  
}

const mapStateToProps = state => ({
  proposal: state.proposal
})
const mapDispatchToProps = Actions
export default connect(mapStateToProps, mapDispatchToProps)(Proposal)