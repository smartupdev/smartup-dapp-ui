import React from 'react'
import styled from 'styled-components'
// import Link from '../Link'
import { Link, Route } from "react-router-dom";
import Menu from './Menu'

import Logo from '../../images/logo.png'

const Header = styled.header`
  background-color: ${p => p.theme.bgColorDark};
  color: ${p => p.theme.colorSecondary};
  width: ${p => p.theme.headerWidth};
  display: flex;
  flex-direction: column;
`

export default ({ routes }) => 
  <Header>
    <Menu image={Logo} fixed />
    {
      routes.map( ({path, icon, includePaths}, i) => 
        icon && <Route
          key={i} 
          path={path}
          exact={true}
          children={({ match, location }) => (
            <Link to={path}>
                <Menu selected={match || includePaths && includePaths.includes(location.pathname)} icon={icon} />
              </Link>
          )}
        />
      )
    }
  </Header>