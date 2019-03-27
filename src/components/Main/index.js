import React from 'react'
import styled from 'styled-components'

const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default ({ children }) => 
  <Main>
    {children}
  </Main>