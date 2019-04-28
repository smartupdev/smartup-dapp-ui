import React from 'react'
import styled, { css } from 'styled-components'

import { Row, Col } from '../Layout'
import { expandCss } from '../Theme'
import Text from '../Text'
import Hr from '../Hr'
import { More } from '../Icon'

const Container = styled(Col)`
  ${p => p.dark && css`background-color: ${p.theme.bgColorDark}`}
`
const MoreIcon = styled(More)`
  position: absolute;
  right: ${p => p.theme.spacingS};
  margin: auto 0;
  top: 0;
  bottom: 0;
`
export const Expanded = styled(Col)`${expandCss}`

export default ({ body, header, expanded, dark, onClick, maxHeight = '100vw' }) => 
  <Container dark={dark}>
    <Row onClick={onClick} center flex={1} relative>
      <Text M center VXS wordSpaceS>{header}</Text>
      <MoreIcon color='#ffffff' XS reverse={expanded} />
    </Row>
    <Hr />
    <Expanded isExpanded={expanded} maxHeight={maxHeight}>{body}</Expanded>
  </Container>
