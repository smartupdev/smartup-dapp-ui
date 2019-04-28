import React from 'react'
import styled, { css } from 'styled-components'
import { Col } from '../Layout'

export const Expanded = styled(Col)`
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
  ${p => p.isExpanded && css`
    max-height: ${p.maxHeight};
    transition: max-height 0.25s ease-in;
  `}
`

export default ({ isOpen, children, maxHeight = '100vw', ...rest }) => 
  <Expanded isExpanded={isOpen} maxHeight={maxHeight} {...rest}>
    {children}
  </Expanded>
