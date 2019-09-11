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
import { toToken, dateDif } from 'lib/util'
import { useInterval } from 'lib/react'

import { ENV } from 'config'

function LabelText({ label, text, width }) {
  return (
    <Col RightL BottomS width={width}>
      <Text S note BottomXXS>{label}</Text>
      <Text>{text}</Text>
    </Col>
  )
}

function Timer({ date }) {
  function updateDate() { const d = dateDif(Date.now(), date); return d.d < 0 ? {} : d }
  const [{s2, m2, h2, d}, setDate] = useState(updateDate())
  useInterval(() => setDate(updateDate()), 1000)
  return <Text>{ typeof d === 'undefined' ? '-' : `${d}D ${h2}:${m2}:${s2}`}</Text> 
}

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
      { proposals.map( ({ id, title, state, creator, description, withdrawAmount, endTime, yesVotes, noVotes, totalVotes, totalCt }, index) => 
        <Panel 
          key={id}
          headerLeft
          header={`#${id} ${title}`}
          body={
            <Row HM VS>
              <Col flex={1}>
                <Row>
                  <LabelText label='Status' text={state} width='200px' />
                  <LabelText label='Creator' text={creator.name} />
                </Row>
                <LabelText label='Description' text={description} />
                <LabelText label='Withdraw Funding' text={<Row><Avatar L username={toToken(withdrawAmount)} icon={ENV.logo} noipfs /></Row>} />
              </Col>
              <Col right>
                <Text S note BottomXXS>Remaining time</Text>
                <Timer date={endTime} />
                <Col VS HS relative>
                  <SimplePieChart value={[yesVotes/totalCt, noVotes/totalCt]} />
                  <Col absolute absTop='0' absBottom='0' absLeft='0' absRight='0' center centerVertical>
                    <Text note S>Approval</Text>
                    <Text>{~~(yesVotes/totalCt*100)}%</Text>
                  </Col>
                </Col>
                <Row>
                  <Button label='View More' primary HM />
                </Row>
              </Col>
            </Row>
          }
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