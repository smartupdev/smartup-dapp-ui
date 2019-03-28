// import React from 'react'
import styled, { css } from 'styled-components'

const Flex = styled.div`
  display: flex;
  position: relative;
  ${props => typeof props.flex === 'number' && css`flex: ${props.flex}`}
  ${props => props.width && css`width: ${props.width}; min-width: ${props.width}`}
`

const Row = styled(Flex)`
  ${props => props.center && css`justify-content: center`}
  ${props => props.centerVertical && css`align-items: center`}
`

const Col = styled(Flex)`
  flex-direction: column;
  ${props => props.centerVertical && css`justify-content: center`}
  ${props => props.center && css`align-items: center`}
`

export {
  Row, Col, Flex
}