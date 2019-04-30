import React from 'react'
import styled, { css } from 'styled-components'

import { Row, Col } from '../Layout'
import Text from '../Text'
import Hr from '../Hr'
import Expand from '../Expand'
import { More } from '../Icon'
import { DonutLoader } from '../Loader'

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

export default ({ body, header, loading, error, expanded, dark, expandedDark, onClick, maxHeight }) => 
  <Container dark={dark || expandedDark && expanded} fitHeight>
    <Row onClick={onClick} center centerVertical flex={1} relative >
      <Text M center VXS wordSpaceS>{header}</Text>
      { loading && <DonutLoader S /> }
      <MoreIcon color='#ffffff' XS reverse={expanded} />
    </Row>
    <Hr />
    <Expand isOpen={expanded} maxHeight={maxHeight}>{
      error ?
      <Text error center VM>{error.message}</Text>
      : body
    }</Expand>
  </Container>
