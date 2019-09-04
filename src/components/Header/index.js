import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
// import Link from '../Link'
import { Link, Route } from "react-router-dom";
import Menu from './Menu'
import {Col} from '../Layout'

import { media } from '../Theme'

import { useClickOutside } from '../../lib/react'

import { ENV } from '../../config'
import { useLang } from '../../language'

const Shadow = styled.div`
  top: 0; 
  bottom: 0;
  right: 0;
  position: absolute;  
  ${p => media(
    `width: 20px; box-shadow: inset -20px 0 9px -10px rgba(0,0,0,0.4);`, 
    `width: 1px; background-color: ${p.theme.borderColor}; `
  )}
`

const StyledLink = styled(Link)`
  background-color: ${p => !p.selected ? p.theme.bgColor : p.theme.bgColorDark }
`

const Header = styled.header`
  position: relative;
  // background-color: ${p => p.theme.bgColorDark};
  color: ${p => p.theme.colorSecondary};
  ${p => media(
    `width: ${p.isOpen ? p.theme.headerExpandedWidth: 0}; overflow: hidden;`, 
    `width: ${p.theme.headerWidth}; overflow: visible;`
  )};
  display: flex;
  flex-direction: column;
  ${css`${p => p.theme.animation.slideOut}`}
`

function renderMenu({ id, path, component, icon, includePaths, onClick, menuComponent, startFromBottom }, i) {
  const [{routes}] = useLang()
  return (
    <Route
      key={i}
      path={path}
      exact={true}
      children={({ match, location }) => {
        const selected = path && (match || (includePaths && includePaths.includes(location.pathname)))
        const IconMenu = <Menu 
          selected={selected} 
          icon={icon} iconLabel={routes[id]}
          onClick={onClick} component={menuComponent} 
          startFromBottom={startFromBottom}
          />
        return component ? <StyledLink selected={selected} to={path}>{IconMenu}</StyledLink> : IconMenu
      }}
    />
  )
}

export default ({ routes, isOpen, close, ...rest }) => {
  const ref = useRef('header')
  useClickOutside(ref, close)
  return (
    <Header isOpen={isOpen} ref={ref} {...rest}>
      <Col onClick={close}>
        <StyledLink to={routes[0].path}>
          <Menu image={ENV.logo} fixed />
          <Menu image={ENV.logoFull} expanded />
        </StyledLink>
        { routes.filter(r => r.isHeader).map(renderMenu) }
      </Col>
      <Col flex={1}/>
      <Col onClick={close}>
        { routes.filter(r => r.isFooter).map(renderMenu) }
      </Col>
      <Shadow />
    </Header>
  )
}