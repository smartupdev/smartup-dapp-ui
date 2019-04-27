// import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, onClickCss } from '../Theme'
const Flex = styled.div`
  display: flex;
  
  ${p => p.relative && css`position: relative;`}
  ${p => p.absolute && css`position: absolute;`}
  ${p => typeof p.absTop === 'string' && css`top: ${p.absTop};`}
  ${p => typeof p.absBottom === 'string' && css`bottom: ${p.absBottom};`}
  ${p => typeof p.absRight === 'string' && css`right: ${p.absRight};`}
  ${p => typeof p.absLeft === 'string' && css`left: ${p.absLeft};`}

  ${p => p.overflowHidden && css`overflow: hidden;`}
  ${p => p.overflowAuto && css`overflow: auto;`}
  
  ${p => p.color && css`background-color: ${p.color}`}
  ${p => !!p.primary && css`background-color: ${p.theme.colorPrimary}`}
  ${p => !!p.secondary && css`background-color: ${p.theme.colorSecondary}`}
  ${p => !!p.bgDark && css`background-color: ${p.theme.bgColorDark}`}
  ${p => !!p.bgLight && css`background-color: ${p.theme.bgColorLight}`}
  ${p => p.backgroundColor && css`background-color: ${p.backgroundColor};`}

  ${p => p.round && css`border-radius: ${p.theme.borderRadius}`}

  ${props => typeof props.flex === 'number' && css`flex: ${props.flex}`};
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}`};
  ${props => props.width && css`width: ${props.width}`};
  ${p => p.fitWidth && css`width: fit-content;`}
  ${props => props.height && css`height: ${props.height}; min-height: ${props.height}`};
  ${props => props.fullHeight && css`height: 100%`};
  ${props => props.fullWidth && css`width: 100%`};

  ${onClickCss}
  ${spacingCss}
`

const Row = styled(Flex)`
  ${props => props.left && css`justify-content: flex-start`};
  ${props => props.right && css`justify-content: flex-end`};
  ${props => props.center && css`justify-content: center`};
  ${props => props.centerVertical && css`align-items: center`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  ${p => p.spaceAround && css`justify-content: space-around`};
  ${props => props.top && css`align-items: flex-start`};
  ${props => props.bottom && css`align-items: flex-end`};
  `
  
const Col = styled(Flex)`
  flex-direction: column;
  ${props => props.left && css`align-items: flex-start`};
  ${props => props.right && css`align-items: flex-end`};
  ${props => props.center && css`align-items: center`};
  ${props => props.centerVertical && css`justify-content: center`};
  ${props => props.bottom && css`justify-content: flex-end`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  `

export {
  Row, Col, Flex
}