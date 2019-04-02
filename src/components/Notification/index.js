import React from 'react'
import { Row, Col } from '../../components/Layout'
import Text from '../../components/Text'
import Image from '../../components/image'
import styled, { css } from 'styled-components'

const Container = styled(Row)`
`
const Dot = styled.div`
`
const Main = styled(Col)`
`
const DateTime = styled(Col)`
`
export default ({ image, sender, title, content, date, unread, expanded }) => 
  <Container>
    <Dot unread={unread} />
    <Image source={image} />
    <Main expanded={expanded}>
      <Text>{sender}</Text>
      <Text>{title}</Text>
      <Text>{content}</Text>
    </Main>
    <DateTime>{date}</DateTime>
  </Container>
