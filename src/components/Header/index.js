import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'
// import Link from '../Link'
import { Link, Route } from "react-router-dom";
import Menu from './Menu'

import Icon0 from '../../images/icon.svg'

const Header = styled.header`
  background-color: ${theme.bgColorDark};
  color: ${theme.colorSecondary};
  width: ${theme.headerWidth};
  display: flex;
  flex-direction: column;
`

export default ({ routes }) => 
  <Header>
    <Menu icon={Icon0} fixed />
    {
      routes.map( ({path, icon}, i) =>
        <Route
          key={i} 
          path={path}
          exact={true}
          children={({ match }) => (
            <Link to={path}>
              <Menu selected={match} icon={icon} />
            </Link>
          )}
        />
      )
    }
  </Header>