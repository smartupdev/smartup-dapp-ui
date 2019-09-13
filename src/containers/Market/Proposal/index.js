import React, { useEffect, useState } from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Col, Row } from 'components/Layout'
import Panel from 'components/Panel'
import { Dropdown } from 'components/Input'
import Search from 'components/Search'
import { Add } from 'components/Icon'
import { useLang } from 'language'
import { PROPOSAL_STATE, PROPOSAL_SORT } from 'integrator'

import Button from 'components/Button'
import { withLink } from 'routes'

import { connect } from 'react-redux'
import * as Actions from 'actions/proposal'

import Item from './Item'

export function getPanelList(milestones, includeManyThanMilestone) {
  const milestonesText = milestones.map( (m, i) => i ? `Milestone ${i}` : 'Starting Fund' )
  return includeManyThanMilestone ? [
    'Preparation',
    milestonesText,
    'Archive'
  ] : milestonesText
}

function Proposal({ 
  proposal: { filterState, sortBy, proposals, getting, error, hasNextPage },
  getProposalList, onChangeState, onChangeSort, 
  goto,
 }) {
  const [{ api: { proposalState, proposalSort } }] = useLang()
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
  const sortByOptions = [
    { label: proposalSort[PROPOSAL_SORT.startTime], value: PROPOSAL_SORT.startTime},
    { label: proposalSort[PROPOSAL_SORT.totalVotes], value: PROPOSAL_SORT.totalVotes},
    { label: proposalSort[PROPOSAL_SORT.yesVotes], value: PROPOSAL_SORT.yesVotes},
    { label: proposalSort[PROPOSAL_SORT.noVotes], value: PROPOSAL_SORT.noVotes},
    { label: proposalSort[PROPOSAL_SORT.currentWithdrawAmount], value: PROPOSAL_SORT.currentWithdrawAmount},
    { label: proposalSort[PROPOSAL_SORT.totalWithdrawAmount], value: PROPOSAL_SORT.totalWithdrawAmount},
    { label: proposalSort[PROPOSAL_SORT.createdTime], value: PROPOSAL_SORT.createdTime},
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
      <Row relative>
        <Row>
          <Dropdown options={stateOptions} value={filterState} onChange={onChangeState} />
          <Dropdown options={sortByOptions} value={sortBy} onChange={onChangeSort} />
        </Row>
        <Row right centerVertical flex={1} HS>
          <Search bgColor value={''} onChange={console.log} onSearch={console.log} right='30px'  />
          <Add primary S onClick={() => goto.proposalCreate()} />
        </Row>
      </Row>
      <Hr />
      { proposals.map( (proposal, index) => 
        <Panel 
          key={proposal.id}
          headerLeft
          header={`#${proposal.id} ${proposal.name}`}
          body={<Item {...proposal} buttons={[<Button label='View More' primary HM onClick={() => goto.proposalDetail({proposalId: proposal.id})} />]} />}
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
export default connect(mapStateToProps, mapDispatchToProps)(withLink(Proposal))