import React, { useEffect } from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import { Col, Row } from 'components/Layout'
import { Dropdown } from 'components/Input'
import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'

import { getUrlParams } from 'routes'

import { connect } from 'react-redux'
import * as Actions from 'actions/proposal'

function LabelText({ label, text }) {
  return (
    <Col BottomM>
      <Text note S BottomXXS>{label}</Text>
      <Text>{text}</Text>
    </Col>
  )
}

function Detail({
  proposal: { title, description },
  getProposalDetails, reset
}) {
  const [{ api: { proposalState } }] = useLang()
  const { id, proposalId } = getUrlParams()
  useEffect( () => {
    getProposalDetails(id, proposalId)
    return reset
  }, [id, proposalId])
  return (
    <Col flex={1}>
      <Col HM VS>
        <LabelText label='Proposal Name' text={title} />
        <LabelText label='Proposal Overview' text={description} />
      </Col>
    </Col>
  )  
}

const mapStateToProps = state => ({
  proposal: state.proposalDetail
})
const mapDispatchToProps = Actions
export default connect(mapStateToProps, mapDispatchToProps)(Detail)