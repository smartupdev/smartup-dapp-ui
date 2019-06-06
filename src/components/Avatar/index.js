import React from 'react'
// import styled, { css } from 'styled-components'
import { People } from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import { Row } from '../../components/Layout'
import theme from '../../theme'
import { ipfsHost } from '../../actions/ipfs'
import { shorten } from '../../lib/util'

export default ({ icon, username, noMargin, ...rest }) => // size
  <Row centerVertical>
    {
      icon ? 
      <Image source={ipfsHost + icon} round cover MarginRightXS={!noMargin} {...rest} /> : 
      <People color={theme.white} round MarginRightXS={!noMargin} {...rest} /> 
    }
    {
      username && <Text nowrap {...rest}>{shorten(username)}</Text>
    }
  </Row>
