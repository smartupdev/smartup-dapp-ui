import React from 'react'
import styled, { css } from 'styled-components'

import { Row, Col } from '../Layout'
import Text from '../Text'
import Hr from '../Hr'
import { More } from '../Icon'

const Container = styled(Col)`
  ${p => p.dark && css`background-color: ${p.theme.bgColorDark}`}
`
const MoreIcon = styled(More)`
  position: absolute;
  right: ${p => p.theme.spacingS};
  top: ${p => p.theme.spacingXS};
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
    <Row onClick={onClick} center flex={1}>
      <Text L center spaceV>{header}</Text>
      <MoreIcon color='#ffffff' XS reverse={expanded} />
    </Row>
    <Hr />
    <Expanded expanded={expanded} maxHeight={maxHeight}>{body}</Expanded>
  </Container>
