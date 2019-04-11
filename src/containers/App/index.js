import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Route } from "react-router-dom";
import routes from '../../routes'

import Header from '../../components/Header'
import Panel from '../Panel'
import Main from '../../components/Main'
import Hr from '../../components/Hr'
import { Row } from '../../components/Layout'

import { connect } from 'react-redux';
import { watchMetamask, checkLogin } from '../../actions/user'

const Container = styled(Row)`
  background-color: ${p => p.theme.bgColor};
  color: ${p => p.theme.color};
  height: 100vh;
`

const App = ({ watchMetamask, checkLogin }) => {
  useEffect( () => {
    watchMetamask()
    checkLogin()
  }, [])
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
  )
}

// export default App;


const mapDispatchToProps = {
  watchMetamask, checkLogin
} 
export default connect(null, mapDispatchToProps)(App);