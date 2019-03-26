import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const Header = styled.header`
  background-color: ${theme.bgColorPrimary};
  color: ${theme.colorSecondary};
  width: ${theme.headerWidth};
  display: flex;
  flexBasic: 1;
  flex-direction: column;
`

export default () => 
  <Header>
    123
  </Header>