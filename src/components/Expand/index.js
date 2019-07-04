import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Col } from '../Layout'
import { usePrevious } from '../../lib/react'

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
  max-height: 0;
  ${p => p.changed &&
    css`animation: ${collapseAnimation} .5s cubic-bezier(.02,1,.8,1);`
  }
  overflow: hidden;
  ${p => p.isExpanded && css`
    max-height: fit-content;
    min-height: fit-content;
    ${p.changed && css`animation: ${expandAnimation} .5s ease-out;`}
  `}
`

export default ({ isOpen, children, maxHeight = '100vw', ...rest }) => {
  const prev = usePrevious(isOpen)
  return (
    <Expanded isExpanded={isOpen} maxHeight={maxHeight} changed={prev !== isOpen} {...rest}>
      {children}
    </Expanded>
  )
}
