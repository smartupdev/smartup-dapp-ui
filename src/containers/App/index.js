import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { MainRoutes, mainRoutes } from '../../routes'

import { checkVersion } from '../../alphaWebService'

import Header from '../../components/Header'
import MobileHeader from '../../components/Header/MobileHeader'
import Panel from '../Panel'
import Main from '../../components/Main'
import Hr from '../../components/Hr'
import { Row } from '../../components/Layout'

import { connect } from 'react-redux';
import { checkLogin, watchMetamask } from '../../actions/user'

export const mainId = 'main'

const Container = styled(Row)`
  background-color: ${p => p.theme.bgColor};
  color: ${p => p.theme.color};
  height: 100vh;
`

const App = ({ checkLogin, watchMetamask }) => {
  const [menuOpened, setMenuOpen] = useState(false)
  const [panelOpened, setPanelOpen] = useState(false)
  useEffect( () => {
    checkVersion()
    watchMetamask()
    // checkLogin()
  }, [])
  return (
    <Container>
      <Header routes={mainRoutes} isOpen={menuOpened} close={() => setMenuOpen(false)} />
      <Main id={mainId}>
        <MobileHeader panelOpened={panelOpened} openMenu={() => setMenuOpen(true)} setPanel={setPanelOpen} />
        <MainRoutes />
      </Main>
      <Hr vertical />
      <Panel isOpen={panelOpened} />
    </Container>
  )
}

const mapDispatchToProps = {
  watchMetamask
} 
export default connect(null, mapDispatchToProps)(App);