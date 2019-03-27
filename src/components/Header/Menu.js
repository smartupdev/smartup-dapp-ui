import React from 'react'
import styled, { css } from 'styled-components'
import Image from '../Icon'
import { Col } from '../Layout'

const Link = styled(Col)`
  width: ${p => p.theme.headerWidth};
  height: ${p => p.theme.headerWidth};
  position: relative;
  ${props => props.fixed && css`background: ${p => p.theme.white}`};
  ${props => props.selected && css`background: ${p => p.theme.bgColor}`};
`
const Line = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: ${p => p.theme.colorPrimary}
`

export default ({ icon, fixed, selected }) => 
  <Link fixed={fixed} selected={selected} center centerVertical>
    { selected && <Line /> }
    <Image source={icon} />
  </Link>
