import React from 'react'
import styled from 'styled-components'
import { Col } from '../Layout'

const Box = styled(Col)`
  flex: 1;
  overflow: auto;
  position: relative;
` 

const Content = styled(Col)`
  flex: 1;
  min-width: 100vw;
  overflow: auto;
  scroll-behavior: smooth;
`
export default ({header: Header, children, ...rest}) => 
  <Box {...rest}>
    {Header}
    <Content>
      {children}
    </Content>
  </Box>