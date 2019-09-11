import React, { useState } from 'react'
import Text from 'components/Text'
import { Col, Row } from 'components/Layout'
import Button from 'components/Button'
import Avatar from 'components/Avatar'
import { SimplePieChart } from 'components/Graph'
import { Link } from 'routes'
import { toToken, dateDif } from 'lib/util'
import { useInterval } from 'lib/react'

import smartupIcon from 'images/rocket_icon.png'

export function LabelText({ label, text, width }) {
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
  return <Text wordSpaceS>{ typeof d === 'undefined' ? '-' : `${d}D ${h2}:${m2}:${s2}`}</Text> 
}

export default function({state, owner, description, withdrawAmount, endTime, yesVotes, totalCt, noVotes, id, noButton}) {
  return (
    <Row HM VS>
      <Col flex={1}>
        <Row>
          <LabelText label='Status' text={state} width='200px' />
          <LabelText label='Proposer' text={owner.name} />
        </Row>
        <LabelText label='Description' text={description} />
        <Row>
          <LabelText label='Withdraw Funding' text={<Row><Avatar username={toToken(withdrawAmount)} icon={smartupIcon} noipfs iconM /></Row>} width='200px' />
          <LabelText label='Remaining time' text={<Timer date={endTime} />} />
        </Row>
      </Col>
      <Col right spaceBetween>        
        <Col HS relative>
          <SimplePieChart value={[yesVotes/totalCt, noVotes/totalCt]} />
          <Col absolute absTop='0' absBottom='0' absLeft='0' absRight='0' center centerVertical>
            <Text note S>Approval</Text>
            <Text>{~~(yesVotes/totalCt*100)}%</Text>
          </Col>
        </Col>
        <Row>
          {!noButton &&
          <Link>
            {( ({ goto }) =>
              <Button label='View More' primary HM onClick={() => goto.proposalDetail({proposalId: id})} />
            )}
          </Link>
          }
        </Row>
      </Col>
    </Row>
  )
}