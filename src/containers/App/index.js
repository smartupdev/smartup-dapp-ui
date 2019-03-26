import React from 'react'
import Header from '../../components/Header'
import Panel from '../..//components/Panel'
import Main from '../..//components/Main'
import Hr from '../..//components/Hr'
import styled from 'styled-components'
import theme from '../../theme'
const Container = styled.div`
  background-color: ${theme.bgColor};
  color: ${theme.color};
  display: flex;
  height: 100vh;
`

const App = () => {  
  return (
    <Container>
      <Header />
      <Hr />
      <Main>Main</Main>
      <Hr />
      <Panel />
    </Container>
  );
}

export default App;
