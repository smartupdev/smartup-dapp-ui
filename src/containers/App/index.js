import React, { useEffect } from 'react'
import styled from 'styled-components'

import { MainRoutes, mainRoutes } from '../../routes'

import { checkVersion } from '../../alphaWebService'

import Header from '../../components/Header'
import Panel from '../Panel'
import Main from '../../components/Main'
import Hr from '../../components/Hr'
import { Row } from '../../components/Layout'
import NotFound from '../NotFound'

import { connect } from 'react-redux';
import { checkLogin, watchMetamask } from '../../actions/user'

const Container = styled(Row)`
  background-color: ${p => p.theme.bgColor};
  color: ${p => p.theme.color};
  height: 100vh;
`

const App = ({ checkLogin, watchMetamask }) => {
  useEffect( () => {
    checkVersion()
    watchMetamask()
    // checkLogin()
  }, [])
  return (
    <Container>
      <Header routes={mainRoutes} />
      <Hr vertical />
      <Main id='main'>
        <MainRoutes />
      </Main>
      <Hr vertical />
      <Panel />
    </Container>
  )
}

const mapDispatchToProps = {
  watchMetamask
} 
export default connect(null, mapDispatchToProps)(App);