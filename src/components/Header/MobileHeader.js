import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { media } from "../Theme";
import theme from '../../theme'

import { Row, Col } from '../../components/Layout'
import Avatar from '../../components/Avatar'
import { Close as CloseIcon } from '../../components/Icon'

const animationSpeed = '1.2s'

const Box = styled(Row)`
  position: absolute;
  width: 100%;
  background-color: ${p => p.theme.bgColor};
  ${media(null, 'display: none')};
  z-index: 9;
`

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3) translate3d(0,0,0);
  }
  70% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  85% {
    opacity: 1;
    transform: scale(0.89);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate3d(0,0,0);
  }
`

const Close = styled(CloseIcon)`
  position: absolute;
  bottom: ${p => p.theme.spacingS};
  right: ${p => p.theme.spacingS};
  stroke: ${p => p.theme.colorPrimary};
  background-color: ${p => p.theme.white};
  border-radius: ${p => p.theme.imageSizeL};
  padding: ${p => p.theme.spacingBase};
  ${p => media(
    p.open ? css`animation: ${bounceIn} 1s ${animationSpeed} forwards; opacity: 0;` : 'display: none', 
    'display: none;'
  )}
  z-index: 12;
`

const Line = styled.div`
  width: 35px;
  height: 4px;
  border-radius: 4px;
  background-color: ${p => p.theme.bgColorLight};
`

const MenuBox = styled(Col)`
  width: ${p => p.theme.iconSizeXL};
  height: ${p => p.theme.iconSizeXL};
`

function MenuIcon(props) {
  return (
    <MenuBox spaceAround MarginAllS {...props}>
      <Line />
      <Line />
      <Line />
    </MenuBox>
  )
}

const Dump = styled.div`
  ${p => media(`
    background-color: ${p.theme.bgColor};
    min-height: ${p.theme.iconSizeXL};
    margin: ${p.theme.spacingS} 0;
    width: 100%;
  `)}
`

const panelAnimation = keyframes`
  0% {
    opacity: 1;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
  60% {
    top: 50vh;
    right: 50vw;
  }
  100% {
    top: 50vh;
    right: 50vw;
    opacity: 0;
    transform: scale(5);    
  }
`

const panelBgAnimation = keyframes`
  0% {
    border-radius: 150vh;
    width: 0;
    height: 0;
    padding: 0;
  }
  55% {
    border-radius: 150vh;
    padding: 0;
  }
  100% {
    width: 0;
    height: 0;
    padding: 150vh;
  }
`

const Cover = styled.div`
  z-index: 11;
  position: absolute;
  left: 50vw;
  top: 50vh;

  transform: translate( -50%, -50% );

  background-color: ${p => p.theme.bgColor};

  ${p => p.open && css`
    animation: ${panelBgAnimation} ${animationSpeed} ease;
    border-radius: 0;
    width: 100vw;
    height: 100vh;
    height: -webkit-fill-available;
  `}
`

const PanelBox = styled(Col)`
  z-index: 10;
  position: absolute;
  right: ${p => p.theme.iconSizeXL};
  top: ${p => `calc( ${p.theme.iconSizeXL}/2 + ${p.theme.spacingS} )`};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0px;
  height: 0px;
  ${p => p.open && css`
    animation: ${panelAnimation} ${animationSpeed} ease;
    opacity: 0;
    & > div {
      background-color: ${p => p.theme.bgColor};
      border-radius: 1000px;
    } 
  `}
`

export default function({ setMenu, menuOpened, setPanel, panelOpened }) {
  return (
    <>
    <Dump />
    <Box spaceBetween relative>
      <MenuIcon onClick={() => setMenu(true)} />

      {!menuOpened && 
        <PanelBox open={panelOpened}>
          <Avatar onClick={() => setPanel(true)} noMargin />
        </PanelBox>
      }
    </Box>
    <Cover open={panelOpened} />
    <Close open={panelOpened} S color={theme.colorPrimary} onClick={() => setPanel(false)} />
    </>
  )
}

export const Header = styled(Row)`
  position: absolute;
  top: ${p => p.theme.spacingS};
  padding: 0 ${p => p.theme.spacingS};
  left: calc( ${p => `${p.theme.iconSizeXL} + ${p.theme.spacingS} * 2`} );
  right: calc( ${p => `${p.theme.iconSizeXL} + ${p.theme.spacingS} * 2`} );
  height: ${p => p.theme.iconSizeXL}
  align-items: center;
  overflow: auto;
  ${media(null, 'display: none')};
  z-index: 9;
`