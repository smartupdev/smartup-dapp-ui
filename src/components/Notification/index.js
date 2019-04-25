import React from 'react'
import { Row, Col } from '../Layout'
import Text from '../Text'
import Image from '../Image'
// import theme from '../../theme'
import { toAgo } from '../../lib/util/datatime'
import styled, { css } from 'styled-components'

const Container = styled(Row)`
  padding: ${p => `${p.theme.spacingXS} ${p.theme.spacingXS}`};
  border-top: ${p => p.theme.borderColor} solid 1px;
  ${p => p.unread && css`background-color: ${p.theme.bgDark}`};
`
const Dot = styled.div`
  width: ${p => p.theme.greenDot};
  height: ${p => p.theme.greenDot};
  min-width: ${p => p.theme.greenDot};
  min-height: ${p => p.theme.greenDot};
  margin-top: 3px;
  margin-right: 5px;
  border-radius: ${p => p.theme.greenDot};
  ${p => p.unread && css`
    background-color: ${p.theme.green};
  `}
`
const Main = styled(Col)`
  margin-left: ${p => p.theme.spacingXS};
  flex: 1;
`
export default ({ image, sender, title, content, date, unread, expanded, onClick, id }) => 
  <Container spaceBetween unread={unread} onClick={onClick && (() => onClick(id))}>
    <Dot unread={unread} />
    <Image source={image} size={'18px'} />
    <Main expanded={expanded}>
      <Text spaceBottom>{sender}</Text>
      <Text S bold>{title}</Text>
      <Text S>{content}</Text>
    </Main>
    <Text S nowrap right>{toAgo(date)}</Text>
  </Container>