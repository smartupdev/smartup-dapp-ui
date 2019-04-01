import React from 'react'
import styled, { css } from 'styled-components'

import { Row, Col } from '../Layout'
import Text from '../Text'
import Hr from '../Hr'

const Container = styled(Col)`
  ${p => p.dark && css`background-color: ${p.theme.bgColorDark}`}
`

export const Expanded = styled(Col)`
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
  ${p => p.expanded && css`
    max-height: ${p.maxHeight || '100vw'};
    transition: max-height 0.25s ease-in;
  `}
`

export default ({ body, header, expanded, dark, onClick, maxHeight }) => 
  <Container dark={dark}>
    <Text L center spaceV onClick={onClick}>{header}</Text>
    <Hr />
    <Expanded expanded={expanded} maxHeight={maxHeight}>{body}</Expanded>
  </Container>
