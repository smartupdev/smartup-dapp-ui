import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from '../../routes'
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
    <Router>
        <Container>
          <Header />
          <Hr />
          <Main>
            {
              routes.map( route =>
                <Route key={route.id} exact path={route.path} component={route.component} />
              )
            }
          </Main>
          <Hr />
          <Panel />
        </Container>

    </Router>
  );
}

export default App;
