import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Route } from "react-router-dom"
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
      <Main id='main'>
        {
          routes.map(({id, path, component, exact}) =>
            <Route key={id} exact={exact} path={path} component={component} />
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