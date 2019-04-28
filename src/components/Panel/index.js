import React from 'react'
import styled, { css } from 'styled-components'

import { Row, Col } from '../Layout'
import Text from '../Text'
import Hr from '../Hr'
import Expand from '../Expand'
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

export default ({ body, header, expanded, dark, expandedDark, onClick, maxHeight }) => 
  <Container dark={dark || expandedDark && expanded}>
    <Row onClick={onClick} center flex={1} relative>
      <Text M center VXS wordSpaceS>{header}</Text>
      <MoreIcon color='#ffffff' XS reverse={expanded} />
    </Row>
    <Hr />
    <Expand isOpen={expanded} maxHeight={maxHeight}>{body}</Expand>
  </Container>
