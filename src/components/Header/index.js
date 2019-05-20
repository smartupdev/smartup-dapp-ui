import React from 'react'
import styled from 'styled-components'
// import Link from '../Link'
import { Link, Route } from "react-router-dom";
import Menu from './Menu'
import {Col} from '../Layout'

import Logo from '../../images/logo.png'
import { useLang } from '../../language'

const Header = styled.header`
  background-color: ${p => p.theme.bgColorDark};
  color: ${p => p.theme.colorSecondary};
  width: ${p => p.theme.headerWidth};
  display: flex;
  flex-direction: column;
`

function renderMenu({ id, path, icon, includePaths, onClick, menuComponent, startFromBottom }, i) {
  const [{routes}] = useLang()
  return (
    <Route
      key={i}
      path={path}
      exact={true}
      children={({ match, location }) => {
        const IconMenu = <Menu 
          selected={path && (match || (includePaths && includePaths.includes(location.pathname)))} 
          icon={icon} iconLabel={routes[id]}
          onClick={onClick} component={menuComponent} 
          startFromBottom={startFromBottom}
          />
        return (
          path ? 
          <Link to={path}>
            {IconMenu}
          </Link>
          :
            IconMenu
        )
      }
      
      }
    />
  )
}

export default ({ routes }) =>
  <Header>
    <Link to={routes[0].path}>
      <Menu image={Logo} fixed />
    </Link>
    { routes.filter(r => r.isHeader).map(renderMenu) }
    <Col flex={1}/>
    { routes.filter(r => r.isFooter).map(renderMenu) }
  </Header>