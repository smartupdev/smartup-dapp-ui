import React from 'react'
import styled, { css } from 'styled-components'
import Image from '../Image'
import Text from '../Text'
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

const LabelBox = styled(Col)`
  display: none;
  position: absolute;
  right: 0;
  width: 0;
  ${Link}:hover & {
    display: block;
  }
`

const Label = styled(Col)`
  height: ${p => p.theme.headerWidth};
  background-color: ${p => p.theme.bgColorDark}
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

export default ({ icon: Icon, iconLabel, image, fixed, selected }) => 
  <Link fixed={fixed} selected={selected} center centerVertical related>
    { selected && <Line /> }
    { Icon && <Icon color={theme.colorSecondary} M /> }
    { image && <Image L source={image} /> }
    { iconLabel && <LabelBox>
      <Label HM fitWidth centerVertical selected={selected}>
        <Text nowrap primary>{iconLabel}</Text>
      </Label>
    </LabelBox> }
  </Link>
