// import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, onClickCss } from '../Theme'
const Flex = styled.div`
  display: flex;
  
  ${p => p.relative && css`position: relative;`}
  ${p => p.overflowHidden && css`overflow: hidden;`}
  
  ${p => p.color && css`background-color: ${p.color}`}
  ${p => !!p.primary && css`background-color: ${p.theme.colorPrimary}`}
  ${p => !!p.secondary && css`background-color: ${p.theme.colorSecondary}`}

  ${props => typeof props.flex === 'number' && css`flex: ${props.flex}`};
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}`};
  ${props => props.width && css`width: ${props.width}`};
  ${props => props.height && css`height: ${props.height}; min-height: ${props.height}`};
  ${props => props.fullHeight && css`height: 100%`};

  ${onClickCss}
  ${spacingCss}
`

const Row = styled(Flex)`
  ${props => props.right && css`justify-content: flex-end`};
  ${props => props.center && css`justify-content: center`};
  ${props => props.centerVertical && css`align-items: center`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  ${p => p.spaceAround && css`justify-content: space-around`};
  ${props => props.bottom && css`align-items: flex-end`};
  `
  
const Col = styled(Flex)`
  flex-direction: column;
  ${props => props.right && css`align-items: flex-end`};
  ${props => props.center && css`align-items: center`};
  ${props => props.centerVertical && css`justify-content: center`};
  ${props => props.bottom && css`justify-content: flex-end`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  `

export {
  Row, Col, Flex
}