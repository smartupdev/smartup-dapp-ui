import React from 'react'
import { SVG } from './index'
import styled from 'styled-components'

const Line = styled.line`
  fill: none;
  stroke: ${p => p.color || '#ffffff'};
  stroke-width: 4.1413;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
`
export default ({ color, ...rest }) => 
<SVG {...rest} color={color} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 31.5 31.5" xmlSpace="preserve">
  <g>
    <Line color={color} x1="2.8" y1="2.5" x2="29.2" y2="28.9"/>
    <Line color={color} x1="29.2" y1="2.5" x2="2.8" y2="28.9"/>
  </g>
</SVG>
