import React from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme'

import Image from '../Icon'

const Link = styled.div`
  width: ${theme.headerWidth};
  height: ${theme.headerWidth};
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  ${props =>
    props.fixed &&
    css`
      background: ${theme.white};
    `};
  ${props =>
    props.selected &&
    css`
      background: ${theme.bgColor};
    `};
`
const Line = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: ${theme.colorPrimary}
`
export default ({ icon, fixed, selected }) => 
  <Link fixed={fixed} selected={selected}>
    { selected && <Line /> }
    <Image source={icon} />
  </Link>