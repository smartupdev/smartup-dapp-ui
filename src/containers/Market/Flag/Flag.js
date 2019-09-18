import React, { useState } from 'react'

import Panel from 'components/Panel'
import Table from 'components/Table'
import { Col, Row } from 'components/Layout'
import Text from 'components/Text'
import Clock from 'components/Clock'
import Button from 'components/Button'

import { LabelText } from 'containers/Common'
import { toToken, toFullDate, getSimpleText } from 'lib/util'
import { useLang } from 'language'
import { marketDeposit } from 'config'

export default function({ flagStage: { supports: [{ createTime, username }] } }) {
  const [{ sutSymbol, ...lang }] = useLang()
  const [showInput, setShowInput] = useState(false)
  return (
    <Col HM VS>
      <Row>
        <Col flex={1}>
          <Row>
            <Col>
              <LabelText RightL label='Total deposit required' text={toToken(marketDeposit)} sut={sutSymbol} />
              <LabelText RightL label='Creator' text={username} />
            </Col>
            <Col>
              <LabelText label='Remaining deposit' text='1,400' sut={sutSymbol} />
              <LabelText label='Creation Time' text={toFullDate(createTime)} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Text right note S BottomXS>Remaining Time for collecting deposit</Text>
          <Clock endDate={Date.now()} /> 
        </Col>
      </Row>
      <Col VS>
        <Text newline note>{getSimpleText(5000)}</Text>
      </Col>
      {
        showInput ?
        <Row right>
          123
        </Row>
        :

        <Row right>
          <Button primary HM label='I agree with this Prosecution' onClick={() => setShowInput(true)} />
        </Row>
      }
    </Col>
  )
}