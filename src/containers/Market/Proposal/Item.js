import React, { useState } from 'react'
import Text from 'components/Text'
import { Col, Row } from 'components/Layout'
import Avatar from 'components/Avatar'
import { SimplePieChart } from 'components/Graph'
import { toToken, dateDif } from 'lib/util'
import { useInterval } from 'lib/react'

import smartupIcon from 'images/rocket_icon.png'

export function LabelText({ label, text, width, right }) {
  return (
    <Col BottomS width={width} right={right}>
      <Text S note BottomXXS>{label}</Text>
      <Text>{text}</Text>
    </Col>
  )
}

function Timer({ date }) {
  function updateDate() { const d = dateDif(Date.now(), date); return d.d < 0 ? {} : d }
  const [{s2, m2, h2, d}, setDate] = useState(updateDate())
  useInterval(() => setDate(updateDate()), 1000)
  return <Text wordSpaceS>{ typeof d === 'undefined' ? '-' : d ? `${d} day${d === 1 ? '' : 's'}` : `${h2}:${m2}:${s2}`}</Text> 
}

export default function({state, owner, title, description, receiver, withdrawAmount, ongoingPeriod, publicVote: {endTime, yesVotes, totalCt, noVotes}, buttons, noChart}) {
  return (
    <Row HM VS>
      <Col flex={1}>
        { state &&
          <Row>
            <LabelText label='Status' text={state} width='200px' />
            <LabelText label='Proposer' text={owner.name} />
          </Row>
        }
        <LabelText label='Title' text={title} />
        <LabelText label='Description' text={description} />
        <LabelText label='Ongoing period' text={ongoingPeriod + ' days'} />
        <Row>
          <LabelText label='Withdraw Funding' text={<Row><Avatar username={toToken(withdrawAmount)} icon={smartupIcon} noipfs iconM /></Row>} width='200px' />
          <LabelText label='Receiver' text={receiver} />
        </Row>
      </Col>
      <Col right spaceBetween>
        {endTime &&  <LabelText label='Remaining time' text={<Timer date={endTime} />} right />}
        {!noChart && 
          <Col MarginBottomS relative>
            <SimplePieChart value={[yesVotes/totalCt, noVotes/totalCt]} />
            <Col absolute absTop='0' absBottom='0' absLeft='0' absRight='0' center centerVertical>
              <Text note S>Approval</Text>
              <Text>{~~(yesVotes/totalCt*100)}%</Text>
            </Col>
          </Col>
        }
        <Col bottom flex={1}>
          <Row>
            {buttons}
          </Row>
        </Col>
      </Col>
    </Row>
  )
}