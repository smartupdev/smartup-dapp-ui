import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { media } from "../Theme";

import { Row, Col } from '../../components/Layout'
import Avatar from '../../components/Avatar'

const Box = styled(Row)`
  ${media(null, 'display: none')}
`

const Line = styled.div`
  width: 35px;
  height: 4px;
  border-radius: 4px;
  background-color: ${p => p.theme.bgColorLight};
`

const MenuBox = styled(Col)`
  width: ${p => p.theme.iconSizeM};
  height: ${p => p.theme.iconSizeM};
`

function MenuIcon(props) {
  return (
    <MenuBox spaceAround spacingS {...props}>
      <Line />
      <Line />
      <Line />
    </MenuBox>
  )
}

export default function({ open }) {
  return (
    <Box spaceBetween>
      <MenuIcon onClick={open} />
      <Avatar />
    </Box>
  )
}