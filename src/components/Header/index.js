import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import Link from '../Link'
// import Icon0 from '../../images/menu0.svg'
import Icon0 from '../../images/icon.svg'
import Icon1 from '../../images/menu1.svg'
import Icon2 from '../../images/menu2.svg'
import Icon3 from '../../images/menu3.svg'
import Icon4 from '../../images/menu4.svg'

const LISTS = [
  { icon: Icon0, fixed: true },
  { icon: Icon1, selected: true },
  { icon: Icon2 },
  { icon: Icon3 },
  { icon: Icon4 },
]
const Header = styled.header`
  background-color: ${theme.bgColorPrimary};
  color: ${theme.colorSecondary};
  width: ${theme.headerWidth};
  display: flex;
  flex-direction: column;
`

export default () => 
  <Header>
    {
      LISTS.map( (LIST, i) =>
        <Link key={i} {...LIST} />
      )
    }
  </Header>