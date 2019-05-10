import React, { memo } from 'react'
import { Row, Col } from '../Layout'
import Text from '../Text'
import Avatar from '../Avatar'
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
  flex: 1;
`


export default memo((notification) => {
  const { image, sender, title, content, date, unread, expanded, onClick } = notification
  return (
    <Container top spaceBetween unread={unread} onClick={onClick && (() => onClick(notification))}>
      <Dot unread={unread} />
      <Avatar icon={image} size='18px' />
      <Main expanded={expanded}>
        <Text spaceBottom>{sender}</Text>
        <Text S bold>{title}</Text>
        <Text S>{content}</Text>
      </Main>
      <Text S nowrap right>{toAgo(date)}</Text>
    </Container>
  )
})