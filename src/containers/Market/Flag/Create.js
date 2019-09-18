import React, { useState } from 'react'

import { useLang } from 'language'
import { withLink } from 'routes'
import { marketDeposit } from 'config'

import { Row, Col } from 'components/Layout'
import Text from 'components/Text'
import TextInput, { RichContent } from 'components/Input'
import Button from 'components/Button'

function Label({ children }) {
  return <Text BottomBase TopS>{children}</Text>
}

function Create({ goto, history }) {
  const loading = false
  const [{ sutSymbol }] = useLang()
  const [title, setTitle] = useState('')
  const [text, setText] = useState(null)
  const [deposit, setDeposit] = useState('')
  function changeDeposit(t) { setDeposit(t > marketDeposit ? marketDeposit : t) }
  return (
    <Col spacingM>
      <Text XL>Create Flag</Text>
      <Text note>Flag a market that do something illegal.</Text>
      <Label>Title</Label>
      <TextInput background disabled={loading} value={title} onChange={setTitle} />
      <Label>Description/Evidence</Label>
      <RichContent editor background disabled={loading} value={text} onBlur={setText} />
      <Label>Deposit({sutSymbol})</Label>
      <TextInput background disabled={loading} value={deposit} onChange={changeDeposit} number decimal={0} placeholder='250 to 2500'></TextInput>
      <Row right TopXL>
        <Button primary HL label= {'Flag'} disabled={loading} onClick={() => goto.flag()} MarginRightS />
        <Button HL label= {'Back'} disabled={loading} onClick={history.goBack} />
      </Row>
      {/* {error && 
        <Row right TopS>
          <Text error S>{error.message}</Text>
        </Row>
      } */}
    </Col>
  )
}
export default withLink(Create)