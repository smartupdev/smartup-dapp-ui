import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Route, Switch } from 'react-router-dom'
import routes from '../../routes'

import { checkVersion } from '../../alphaWebService'

import Header from '../../components/Header'
import Panel from '../Panel'
import Main from '../../components/Main'
import Hr from '../../components/Hr'
import { Row } from '../../components/Layout'
import NotFound from '../NotFound'

import { connect } from 'react-redux';
import { checkLogin } from '../../actions/user'

const Container = styled(Row)`
  background-color: ${p => p.theme.bgColor};
  color: ${p => p.theme.color};
  height: 100vh;
`

const App = ({ checkLogin }) => {
  useEffect( () => {
    checkVersion()
    checkLogin()
  }, [])
  return (
    <Container>
      <Header routes={routes} />
      <Hr vertical />
      <Main id='main'>
        <Switch>
          {
            routes.map(({id, path, component, exact}) =>
              <Route key={id} exact={exact} path={path} component={component} />
            )
          }
          <Route path="*" component={NotFound} />
        </Switch>
      </Main>
      <Hr vertical />
      <Panel />
    </Container>
  )
}

const mapDispatchToProps = {
  checkLogin
} 
export default connect(null, mapDispatchToProps)(App);