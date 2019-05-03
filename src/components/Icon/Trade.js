import React from 'react'
import { SVG, Path } from './index'
import theme from '../../theme'
export default ({ color, leftActive, rightActive, ...rest }) => 
  <SVG {...rest} color={color} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 45 45" xmlSpace="preserve">
    <Path color={rightActive ? theme.green : rightActive === false ? theme.colorSecondary : color} d="M27.9,1.7c-0.4-0.4-1.1-0.4-1.6,0c-0.4,0.4-0.4,1.1,0,1.6l8,8H7.9c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h26.6
    l-8,8c-0.4,0.4-0.4,1.2,0,1.6c0.4,0.4,1.2,0.4,1.6,0l10-10c0.4-0.4,0.4-1.1,0-1.6L27.9,1.7z"/>
    <Path color={leftActive ? theme.red : leftActive === false ? theme.colorSecondary : color}  d="M17,43.2c0.4,0.4,1.1,0.4,1.6,0c0.4-0.4,0.4-1.1,0-1.6l-8-8h26.6c0.6,0,1.1-0.5,1.1-1.1c0-0.6-0.5-1.1-1.1-1.1
    H10.6l8-8c0.4-0.4,0.4-1.2,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l-10,10c-0.4,0.4-0.4,1.1,0,1.6L17,43.2z"/>
  </SVG>
