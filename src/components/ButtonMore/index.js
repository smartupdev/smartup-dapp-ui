import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, onClickCss, fadeIn } from '../Theme'
import { useClickOutside } from '../../lib/react'
const Box = styled.div`
  position: relative;
`

const lineCss = (index, deg) => css`
  & div:nth-child(${index + 1}){ 
    position: absolute; 
    background-color: ${p => p.theme.colorSecondary}; 
    border-radius: 4px; 
    width: ${p => p.theme.imageSizeS}; 
    height: 3px; 
    transform: rotate(${deg}deg); 
    transition: all .2s ease-in-out;
  }
`

const MoreIcon = styled.div`
  height: ${p => p.theme.imageSizeL};
  width: ${p => p.theme.imageSizeL};
  border-radius: ${p => p.theme.imageSizeL};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.bgColor};
  ${p => p.open ? 
    css`
      ${lineCss(0, 45)}
      ${lineCss(1, -45)}
    ` :
    css`
      & > div {
        transition: all .2s ease-in-out;
        width: 4px;
        height: 4px;
        margin: 2px;
        border-radius: 4px;
        background-color: ${p => p.theme.colorSecondary};
      }
    `
  }
  z-index: 2;
  position: relative;
`

function More(props) {
  console.log(props)
  return (
    <MoreIcon {...props}>
      <div />
      <div />
      <div />
    </MoreIcon>
  )
}

const IconBox = styled.div`
  position: absolute;
  z-index: 1;

  display: flex;
  left: 0; right: 0;
  justify-content: center;
  align-items: center;

  height: ${p => p.theme.iconSizeM};
  width: ${p => p.theme.iconSizeM};
  border-radius: ${p => p.theme.iconSizeM};
  background-color: ${p => p.theme.bgColor};

  top: ${p => p.open ? `calc( (${p.theme.iconSizeM} + 8px) * ${p.index + 1} )` : 0};
  & > svg {
    fill: ${p => p.theme.colorSecondary}
  }
  ${p => p.open &&
    fadeIn(.5, p.index/2)
  }
  ${spacingCss}
  ${onClickCss}
`
export default ({ icons }) => {
  const [didOpen, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))
  return (
    <Box ref={ref} onClick={() => setOpen(!didOpen)}>
      <More open={didOpen} />
      { icons.map( (Icon, index) => 
        <IconBox key={Icon} open={didOpen} index={index}>
          <Icon S />
        </IconBox>
      )}
    </Box>
  )
}
