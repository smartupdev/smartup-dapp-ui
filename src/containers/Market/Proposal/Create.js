import React, { Fragment , useState } from 'react'
import Text from 'components/Text'
import Hr from 'components/Hr'
import TextInput, { RichContent } from 'components/Input'
import Panel from 'components/Panel'
import { Col, Row } from 'components/Layout'
import Button from 'components/Button'
import { Dropdown } from 'components/Input'
import { Add, CloseWithCircle } from 'components/Icon'

import { useLang } from 'language'
import { PROPOSAL_STATE } from 'integrator'
import { getPanelList } from './index'

function Title({ text, action, icon: Icon }) {
  return (
    <>
    <Col relative>
      <Text sectionTitle>{text}</Text>
      {!!Icon && <Icon primary S absolute marginAuto right='8px' top='0' bottom='0' onClick={action} />}
    </Col>
    <Hr />
    </>
  )
}

const milestoneDefaultInput = {
  title: '',
  description: '',
  amount: '',
  period: ''
}

export default function() {
  const [{ api: { proposalState }, sutSymbol }] = useLang()
  const [milestones, setMilestones] = useState([milestoneDefaultInput])
  const panelList = getPanelList(milestones)
  function addMilestone() { setMilestones(milestones.concat(milestoneDefaultInput) ) }
  function removeMilestone(index) { setMilestones([...milestones.slice(0, index), ...milestones.slice(index+1)]) }
  function onChange(index, key, value) { setMilestones([...milestones.slice(0, index), { ...milestones[index], [key]: value }, ...milestones.slice(index+1)]) }
  return (
    <>
    <TextInput placeholder='Proposal Name' background XL />
    <Hr />
    <Col flex={1} overflowAuto>
      {
        milestones.map((milestone, index) => 
          <Fragment key={index}>
            <Col BottomS>
              <Title text={panelList[index]} action={() => removeMilestone(index)} icon={index && CloseWithCircle} />
              <Col HS>
                <TextInput label='Title' background value={milestone.title} onChange={t => onChange(index, 'title', t)} />
                <RichContent label='Description' editor value={milestone.description} onBlur={t => onChange(index, 'description', t)} />
                <TextInput label={`Withdraw Funding (${sutSymbol})`} background value={milestone.amount} onChange={t => onChange(index, 'amount', t)}  />
                { !!index && <TextInput label='Timeline (days)' background number decimal={0} digit={3}  value={milestone.period} onChange={t => onChange(index, 'period', t)}  /> }
              </Col>
            </Col>
            <Hr />
          </Fragment>
        )
      }
      <Title text='Add New Milestone' action={addMilestone} icon={Add} />
      <Row right HS VS>
        <Button primary label='Public' HL MarginRightS />
        <Button label='Save' MarginRightS />
        <Button label='Cancel' />
      </Row>
    </Col>
    </>
  )  
}