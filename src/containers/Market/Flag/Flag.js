import React, { useState } from 'react'

import { Col, Row } from 'components/Layout'
import Hr from 'components/Hr'
import Text from 'components/Text'
import Clock from 'components/Clock'
import Button from 'components/Button'
import TextInput, { RichContent } from 'components/Input'

import { LabelText } from 'containers/Common'
import { toToken, toFullDate, getSimpleText } from 'lib/util'
import { useLang } from 'language'
import { marketDeposit } from 'config'
import { FLAG_STATUS } from 'integrator'
import { withLink } from 'routes'

function Flag({ 
  goto,
  stage: { 
    status, 
    supports: [{ createTime, username, title }], 
    yesVotes, noVotes, absVotes,
    guilty 
  }, isAppeal }) {
  const [{ sutSymbol, ...lang }] = useLang()
  const [showInput, setShowInput] = useState(false)
  const [text, setText] = useState(null)
  const [deposit, setDeposit] = useState('')
  function changeDeposit(t) { setDeposit(t > marketDeposit ? marketDeposit : t) }
  const loading = false
  const _isCreator = true
  const 
    _typeText = isAppeal ? 'Appeal' : 'Prosecution',
    _isVoting = status === FLAG_STATUS.voting,
    _isCollecting = status === FLAG_STATUS.collecting,
    _isFinished = status === FLAG_STATUS.finished
  return (
    <>
    <Text sectionTitle>{_typeText}: {title}</Text>
    <Hr />
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
        {
          _isCollecting ? 
            <Col>
              <Text right note S BottomXS>Remaining Time for collecting deposit</Text>
              <Clock endDate={Date.now()} /> 
            </Col>
          : _isVoting ?
            <Col>
              <Text right note S BottomXS>Remaining Time for jury voting</Text>
              <Clock endDate={Date.now()} /> 
            </Col>
          : 
          <Col>
            <Row>
              <LabelText RightL label='Convict' text={yesVotes} red />
              <LabelText RightL label='Acquit' text={noVotes} green />
              <LabelText label='Absent' text={absVotes} />
            </Row>
            {guilty ?
              <LabelText label='Result' text={'Guilty'} red />
            :
              <LabelText label='Result' text={'Not Guilty'} green />
            }
          </Col>
        }
      </Row>
      <Col BottomS>
        <Text newline note>{getSimpleText(5000)}</Text>
      </Col>
      {_isCreator ? 
        <Row right>
          <Button primary HM label={'Edit'} onClick={() => goto.flagEdit()} />
        </Row>
      : _isCollecting ? 
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
            <Button primary HM label={`Support the ${_typeText}`}  onClick={() => setShowInput(true)} />
          </Row>
        : _isVoting ?
          <Row right>
            <Button red HM MarginRightS label={'Convict'} />
            <Button green HM label={'Acquit'} />
          </Row>
        : null
      }
    </Col>
    <Hr />
    </>
  )
}

export default withLink(Flag)