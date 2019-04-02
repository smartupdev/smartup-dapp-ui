import React from 'react'
import styled, { css } from 'styled-components'
import Image from '../Image'
import theme from '../../theme'
import { Col } from '../Layout'

const Link = styled(Col)`
  width: ${p => p.theme.headerWidth};
  height: ${p => p.theme.headerWidth};
  position: relative;
  ${props => props.fixed && css`background: ${p => p.theme.white}`};
  ${props => props.selected && css`background: ${p => p.theme.bgColor}`};
  :hover svg {
    fill: ${p => p.theme.colorPrimary}
  }

`
const Line = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: ${p => p.theme.colorPrimary}
`

export default ({ icon: Icon, image, fixed, selected }) => 
  <Link fixed={fixed} selected={selected} center centerVertical>
    { selected && <Line /> }
    { Icon && <Icon color={theme.colorSecondary} M /> }
    { image && <Image L source={image} /> }
  </Link>
