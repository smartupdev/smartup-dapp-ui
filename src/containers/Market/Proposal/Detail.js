import React, { useEffect, useState } from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Col, Row } from 'components/Layout'
import { Dropdown } from 'components/Input'
import Panel from 'components/Panel'
import Loader from 'components/Loader'
import ProgressBar from 'components/ProgressBar'
import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'

import { getUrlParams } from 'routes'

import { connect } from 'react-redux'
import * as Actions from 'actions/proposal'

import Item, {LabelText} from './Item'
import { toToken } from '../../../lib/util'

function Detail({
  proposal,
  getProposalDetails, reset
}) {
  const [{ api: { proposalState } }] = useLang()
  const { id, proposalId } = getUrlParams()
  useEffect( () => {
    getProposalDetails(id, proposalId)
    return reset
  }, [id, proposalId])
  const [mainOpen, setMainOpen] = useState(true)
  const progressList = [
    'Draft', 'Publish', 'Admin Vote', 'Public Vote',
    ...proposal.milestones.map( (m, i) => [`M${i+1} ongoing`, `M${i+1} Review`] ),
    'Fund successful'
  ]
  return (
    proposal.getting ? <Loader page /> : 
    <Col flex={1}>
      <Panel headerLeft header={`#${proposal.id} ${proposal.title}`}
        body={
          <Col>
            <Item {...proposal} noButton />
            <Text S note HM>Progress Overview</Text>
            <ProgressBar activeIndex={1} options={progressList} />
          </Col>
        }
        expanded={mainOpen} 
        onClick={() => setMainOpen(!mainOpen)}
        bottomLine />
      {
        proposal.milestones.map( (m, i) =>
          <Panel key={i} 
            headerLeft header={`Milestone ${i+1} - ${m.title}`}
            body={
              <Col HM VS>
                <LabelText label='Description' text={m.description} />
                <LabelText label='Ongoing period' text={m.ongoingPeriod + ' days'} />
                <LabelText label='Withdraw amount' text={toToken(m.withdrawAmount)} />
                <LabelText label='Receiver' text={m.receiver} />
              </Col>
            }
            expanded={mainOpen} 
            onClick={() => setMainOpen(!mainOpen)}
            bottomLine />
        ) 
      }
    </Col>
  )  
}

const mapStateToProps = state => ({
  proposal: state.proposalDetail
})
const mapDispatchToProps = Actions
export default connect(mapStateToProps, mapDispatchToProps)(Detail)