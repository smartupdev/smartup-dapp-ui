import React, { useState } from 'react'

import styled from 'styled-components'
import Image from '../../components/Image'
import Button from '../../components/Button'
import Text from '../../components/Text'
import { Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'

import theme from '../../theme'
import LoginIcon from '../../images/menu1.svg'

const Panel = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default () => {
  const [loggedIn, login] = useState(false)
  return (
    <Panel>
      {loggedIn ?
      <Col>
      </Col>
      :
      <Col center>
        <Image source={LoginIcon} S />
        <Button primary outline verticalMargin label={lang.panel.connectButton[currentLang]} onClick={() => login(true)} />
        <Text note>MetaMask</Text>
      </Col>
      }
    </Panel>
  )
}
