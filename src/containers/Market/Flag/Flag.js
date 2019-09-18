import React, { useState } from 'react'

import { Col, Row } from 'components/Layout'
import Text from 'components/Text'
import Clock from 'components/Clock'
import Button from 'components/Button'
import TextInput, { RichContent } from 'components/Input'

import { LabelText } from 'containers/Common'
import { toToken, toFullDate, getSimpleText } from 'lib/util'
import { useLang } from 'language'
import { marketDeposit } from 'config'

export default function({ flagStage: { supports: [{ createTime, username }] } }) {
  const [{ sutSymbol, ...lang }] = useLang()
  const [showInput, setShowInput] = useState(false)
  const [text, setText] = useState(null)
  const [deposit, setDeposit] = useState('')
  function changeDeposit(t) { setDeposit(t > marketDeposit ? marketDeposit : t) }
  const loading = false
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
          <Col>
            <Text BottomBase TopS>Description/Evidence</Text>
            <RichContent editor background disabled={loading} value={text} onBlur={setText} />
            <Text BottomBase TopS>Deposit({sutSymbol})</Text>
            <TextInput background disabled={loading} value={deposit} onChange={changeDeposit} number decimal={0} placeholder='250 to 2500'></TextInput>
            <Row right TopXL>
              <Button MarginRightL label='Cancel' onClick={() => setShowInput(false)} />
              <Button primary label='Support' />
            </Row>
          </Col>
        :
          <Row right>
            <Button primary HM label='Support the Prosecution' onClick={() => setShowInput(true)} />
          </Row>
      }
    </Col>
  )
}