import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { MainRoutes, mainRoutes } from '../../routes'

import { checkVersion } from '../../alphaWebService'

import Header from '../../components/Header'
import MobileHeader from '../../components/Header/MobileHeader'
import Panel from '../Panel'
import Main from '../../components/Main'
import Hr from '../../components/Hr'
import { Row } from '../../components/Layout'

import ErrorBoundary from '../ErrorBoundary'

import { connect } from 'react-redux'
import { watchMetamask } from '../../actions/user'
import { setOpen } from '../../actions/panel'

export const mainId = 'main'

const Container = styled(Row)`
  background-color: ${p => p.theme.bgColor};
  color: ${p => p.theme.color};
  height: 100vh;
  height: -webkit-fill-available;
`

const App = ({ watchMetamask, panelOpened, setPanelOpen }) => {
  const [menuOpened, setMenuOpen] = useState(false)
  useEffect(() => {
    checkVersion()
    watchMetamask()
  }, [])
  return (
    <Container>
      <ErrorBoundary>
        <Hr vertical />        
        <Header routes={mainRoutes} isOpen={menuOpened} close={() => setMenuOpen(false)} />
        <Main
          id={mainId}
          header={
            <MobileHeader
              menuOpened={menuOpened}
              setMenu={setMenuOpen}
              panelOpened={panelOpened}
              setPanel={setPanelOpen}
            />
          }
        >
          <MainRoutes />
        </Main>
        <Hr vertical />
        <Panel isOpen={panelOpened} />
        <Hr vertical />
      </ErrorBoundary>
    </Container>
  )
}

const mapStateToProps = state => ({
  panelOpened: state.panel.didOpen,
})

const mapDispatchToProps = {
  watchMetamask,
  setPanelOpen: setOpen,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
