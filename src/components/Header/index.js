import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import Link from '../Link'

import Icon0 from '../../images/icon.svg'

import routes from '../../routes'

const Header = styled.header`
  background-color: ${theme.bgColorPrimary};
  color: ${theme.colorSecondary};
  width: ${theme.headerWidth};
  display: flex;
  flex-direction: column;
`

export default () => 
  <Header>
    <Link icon={Icon0} fixed />
    {
      routes.map( (LIST, i) =>
        <Link key={i} selected={!i} icon={LIST.icon} href={LIST.path} />
      )
    }
  </Header>