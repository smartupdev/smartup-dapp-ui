// import React from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme'

const Flex = styled.div`
  display: flex;
  ${props => typeof props.flex === 'number' && css`flex: ${props.flex}`}
  ${props => props.center && css`justify-content: center`}
  ${props => props.centerVertical && css`align-items: center`}
`

const Row = styled(Flex)`
`

const Col = styled(Flex)`
  flex-direction: columns;
`

export {
  Row, Col
}