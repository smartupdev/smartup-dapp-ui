import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'
// import Link from '../Link'
import { Link } from "react-router-dom";
import Menu from './Menu'

import Icon0 from '../../images/icon.svg'

const Header = styled.header`
  background-color: ${theme.bgColorPrimary};
  color: ${theme.colorSecondary};
  width: ${theme.headerWidth};
  display: flex;
  flex-direction: column;
`

export default ({ routes }) => 
  <Header>
    <Menu icon={Icon0} fixed />
    {
      routes.map( (LIST, i) =>
        <Link key={i} to={LIST.path}>
          <Menu selected={!i} icon={LIST.icon} />
        </Link>
      )
    }
  </Header>