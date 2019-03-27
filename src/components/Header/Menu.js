import React from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme'
import Image from '../Icon'
import { Col } from '../Layout'

const Link = styled(Col)`
  width: ${theme.headerWidth};
  height: ${theme.headerWidth};
  position: relative;
  ${props => props.fixed && css`background: ${theme.white}`};
  ${props => props.selected && css`background: ${theme.bgColor}`};
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
  <Link fixed={fixed} selected={selected} center centerVertical>
    { selected && <Line /> }
    <Image source={icon} />
  </Link>
