import React from 'react'
import styled from 'styled-components'
import { media } from '../Theme'
import { Col } from '../Layout'

const Box = styled(Col)`
  flex: 1;
  overflow: auto;
  position: relative;
` 

const Content = styled(Col)`
  flex: 1;
  ${media('min-width: 100vw;')}
  overflow: auto;
  scroll-behavior: smooth;
`
export default ({header: Header, children, ...rest}) => 
  <Box>
    {Header}
    <Content {...rest}>
      {children}
    </Content>
  </Box>