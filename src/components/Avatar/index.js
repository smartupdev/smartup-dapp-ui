import React from 'react'
// import styled, { css } from 'styled-components'
import { People } from '../../components/Icon'
import Image from '../../components/Image'
import Text from '../../components/Text'
import { Row, Col } from '../../components/Layout'
import theme from '../../theme'
import { ipfsHost } from '../../actions/ipfs'
import { shorten } from '../../lib/util'

export default ({ icon, username, vertical, noMargin, long, hiddenMobile, noipfs, onClick, ...rest }) => { // size
  const Flex = vertical ? Col : Row
  return (
    <Flex centerVertical center hiddenMobile={hiddenMobile} onClick={onClick}>
      {
        icon ? 
        <Image source={noipfs ? icon : ipfsHost + icon} round cover MarginRightXS={!noMargin && !vertical} MarginTopXS={vertical} {...rest} /> : 
        <People color={theme.white} round MarginRightXS={!noMargin} {...rest} /> 
      }
      {
        username && <Text nowrap S={vertical} {...rest}>{long ? username : shorten(username)}</Text>
      }
    </Flex>
  )
}

