import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Col } from '../Layout'

const collapseAnimation = keyframes`
  0%   { max-height: 100vh; }
  100% { max-height: 0; }
`

const expandAnimation = keyframes`
  0%   { max-height: 0; }
  99% { max-height: 100vh; }
  100% { max-height: fit-content; }
`

export const Expanded = styled(Col)`

  animation: ${collapseAnimation} .5s cubic-bezier(.04,.85,.22,.97) forwards;
  overflow: hidden;
  ${p => p.isExpanded && css`
    animation: ${expandAnimation} .5s ease-in forwards;
  `}
`

export default ({ isOpen, children, maxHeight = '100vw', ...rest }) => 
  <Expanded isExpanded={isOpen} maxHeight={maxHeight} {...rest}>
    {children}
  </Expanded>
