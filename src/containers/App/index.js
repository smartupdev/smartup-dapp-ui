import React from 'react'
import { Route } from "react-router-dom";

import routes from '../../routes'
import Header from '../../components/Header'
import Panel from '../../components/Panel'
import Main from '../../components/Main'
import Hr from '../../components/Hr'
import { Row } from '../../components/Layout'
import { useTheme } from '../../components/Theme'
import styled from 'styled-components'

const Container = styled(Row)`
  background-color: ${p => p.theme.bgColor};
  color: ${p => p.theme.color};
  height: 100vh;
`

const App = () => {
  return (
    <Container>
      <Header routes={routes} />
      <Hr vertical />
      <Main>
        {
          routes.map(route =>
            <Route key={route.id} exact path={route.path} component={route.component} />
          )
        }
      </Main>
      <Hr vertical />
      <Panel />
    </Container>
  );
}

export default App;
