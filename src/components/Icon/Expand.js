import React from 'react'
import { SVG } from './index'
import styled from 'styled-components'

const Line = styled.line`
	fill: none;
	stroke: ${p => p.color || '#000000'};
	stroke-width: 6.25;
	stroke-linecap: round;
	stroke-miterlimit: 10;
`

export default ({ color, ...rest }) => 
<SVG {...rest} color={color} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/SVG" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 100 100" xmlSpace="preserve">
	<g>
		<g>
			<path d="M50.8-0.3c-27.6,0-50,22.4-50,50s22.4,50,50,50s50-22.4,50-50S78.3-0.3,50.8-0.3z M50.8,93.2c-24,0-43.4-19.5-43.4-43.4
				c0-24,19.5-43.4,43.4-43.4s43.4,19.5,43.4,43.4C94.2,73.7,74.7,93.2,50.8,93.2z"/>
		</g>
	</g>
	<Line color={color} x1="32.9" y1="29.8" x2="67.1" y2="29.8"/> 
	<Line color={color} x1="23" y1="46.7" x2="77" y2="46.7"/> 
	<Line color={color} x1="15.2" y1="63.6" x2="84.7" y2="63.6"/> 
</SVG>
