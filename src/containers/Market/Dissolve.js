import React from 'react'
import Text from '../../components/Text'
import Hr from '../../components/Hr'
import Button from '../../components/Button'
import { Col, Row } from '../../components/Layout'
import { useLang } from '../../language'
import { toToken } from 'lib/util'
const TextLabel = ({ children }) => <Text S note TopS>{children}</Text>
const TextValue = ({ children }) => <Text TopXXS>{children}</Text>

const buttonWidth = '100px'
export default function({ dissolving = true }) {
  const [{ sutSymbol }] = useLang()
  return (
    <Col>
      <Col HS BottomS>
        <Text sectionTitle>Dissolve Market</Text>
        <Hr />
        <Row>
          <Col RightM>
            <TextLabel>Dissolved by</TextLabel>  
            <TextValue>-</TextValue>  
          </Col>
          <Col>
            <TextLabel>Creation time</TextLabel>
            <TextValue>-</TextValue>
          </Col>
        </Row>
        <TextLabel>Description</TextLabel>
        <TextValue>All the tokens have not been sold out in the offering phase.</TextValue>
        <TextLabel>To Dissolve Market</TextLabel>
        <TextValue>Click on "Dissolve" to dissolve this market</TextValue>
        <TextLabel>Est. gas fee</TextLabel>
        <TextValue>0.003 ETH</TextValue>
        <Text S note>(The gas fee will be refunded in "Refund" process)</Text>
        <Col right>
          <Button label={dissolving ? 'Dissolving...' : 'Dissolve'} primary disabled={dissolving} width={buttonWidth} />
          { dissolving && <Text error S right newline>Members can refund after a few minutes</Text> }
        </Col>
      </Col>
      <Hr />
      <Col HS>
        <Text sectionTitle>Refund</Text>
        <Hr />
        <TextLabel>Description</TextLabel>
        <TextValue>After initiated the dissolving process, click on "Refund" button to get back your investment.</TextValue>
        <Row>
          <Col RightM>
            <TextLabel>Amount of ??? can be refunded</TextLabel>
            <TextValue>{toToken(122888)}</TextValue>
          </Col>
          <Col>
            <TextLabel>Total({sutSymbol})</TextLabel>
            <TextValue>{toToken(209778)}</TextValue>
          </Col>
        </Row>
        <TextLabel>Est. gas fee</TextLabel>
        <TextValue>0.09 ETH</TextValue>
        <Col right>
          <Button label='Refund' primary width={buttonWidth} />
        </Col>
      </Col>
    </Col>
  )  
}