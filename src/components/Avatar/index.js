import React from 'react'
// import styled, { css } from 'styled-components'
import { People } from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import { Row } from '../../components/Layout'
import theme from '../../theme'
import { ipfsHost } from '../../actions/ipfs'

export default ({ icon, username, ...rest }) => 
  <Row centerVertical>
    {
      icon ? 
      <Image source={ipfsHost + icon} cover MarginRightXS {...rest} /> : 
      <People color={theme.white} round MarginRightXS {...rest} /> 
    }
    {
      username && <Text nowrap {...rest}>{username}</Text>
    }
  </Row>
