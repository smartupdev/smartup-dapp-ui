// import React from 'react'
import styled, { css } from 'styled-components'

const Flex = styled.div`
  display: flex;
  position: relative;
  ${props => typeof props.flex === 'number' && css`flex: ${props.flex}`};
  ${props => props.width && css`width: ${props.width}; min-width: ${props.width}`};
  ${props => props.spacingLeft && css`padding-left: ${props.spacingLeft}`};
  ${props => props.spacingRight && css`padding-right: ${props.spacingRight}`};
  ${props => props.spacingBottom && css`padding-bottom: ${props.spacingBottom}`};
  ${props => props.spacingTop && css`padding-top: ${props.spacingTop}`};
`

const Row = styled(Flex)`
  ${props => props.center && css`justify-content: center`};
  ${props => props.centerVertical && css`align-items: center`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
`

const Col = styled(Flex)`
  flex-direction: column;
  ${props => props.end && css`align-items: flex-end`};
  ${props => props.center && css`align-items: center`};
  ${props => props.centerVertical && css`justify-content: center`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  `

export {
  Row, Col, Flex
}