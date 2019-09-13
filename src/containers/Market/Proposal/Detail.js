import React, { useEffect, useState } from 'react'
import Button from 'components/Button'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Add } from 'components/Icon'
import { Col, Row } from 'components/Layout'
import { Dropdown } from 'components/Input'
import Panel from 'components/Panel'
import { LineDiagram } from 'components/Graph'
import Loader from 'components/Loader'
import ProgressBar from 'components/ProgressBar'
import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'

import { getUrlParams } from 'routes'

import { connect } from 'react-redux'
import * as Actions from 'actions/proposal'

import Item, { LabelText } from './Item'
import { getPanelList } from './index'
import { toToken } from 'lib/util'

function Detail({
  proposal,
  symbol,
  getProposalDetails, reset
}) {
  const [{ api: { proposalState } }] = useLang()
  const { id, proposalId } = getUrlParams()
  useEffect( () => {
    getProposalDetails(id, proposalId)
    return reset
  }, [id, proposalId])
  const [mainOpen, setMainOpen] = useState([])
  function toggleOpen(index, setTrue) {
    let newOpen = [...mainOpen]
    newOpen[index] = setTrue || !newOpen[index]
    setMainOpen(newOpen)
  }
  const progressList = getPanelList(proposal.milestones, true)
  return (
    proposal.getting ? <Loader page /> : 
    <Col flex={1} overflowAuto>
      <Text HM VS XL>{`#${proposal.id} ${proposal.name}`}</Text>
      <ProgressBar activeIndex={1} options={progressList} onClick={i => i && toggleOpen(i-1, true)} />
      <Item {...proposal} noChart />
      <Col HM>
        <LineDiagram value={[proposal.publicVote.yesVotes, proposal.publicVote.noVotes]} maxValue={proposal.publicVote.totalCt} threshold={.5} symbol={symbol} />
      </Col>
      <Row VS HM right>
        <Button label='Decline' HS secondary MarginRightS />
        <Button label='Approve' HS primary />
      </Row>
      <Hr />
      {
        proposal.milestones.map( (m, i) =>
          <Panel key={i} 
            header={`${progressList[i+1]}`}
            body={<Item {...m} noButton />}
            expanded={mainOpen[i]} 
            onClick={() => toggleOpen(i)}
            bottomLine />
        ) 
      }
      <Col relative>
        <Text sectionTitle>Discussion</Text>
        <Add primary S absolute right='12px' top='0' bottom='0' marginAuto />
      </Col>
      <Hr />
    </Col>
  )  
}

const mapStateToProps = state => ({
  symbol: state.market.symbol,
  proposal: state.proposalDetail
})
const mapDispatchToProps = Actions
export default connect(mapStateToProps, mapDispatchToProps)(Detail)