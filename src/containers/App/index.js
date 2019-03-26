import React from 'react'
import Header from '../../components/Header'
import Panel from '../..//components/Panel'
import styled from 'styled-components'
import theme from '../../theme'
const Main = styled.main`
  background-color: ${theme.bgColor};
  color: ${theme.color};
  display: flex;
  flexBasic: 1;
`

const App = () => {  
  return (
    <Main>
      <Header />
      <div>123</div>
      <Panel />
    </Main>
  );
}

export default App;
