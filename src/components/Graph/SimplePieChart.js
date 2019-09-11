import React from 'react'
import styled from 'styled-components'
import theme from 'theme'

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}
// 150, 150, 100, 0, 180
function describeArc(x, y, radius, startAngle = 0, endAngle = 180) {
	var start = polarToCartesian(x, y, radius, endAngle)
	var end = polarToCartesian(x, y, radius, startAngle)

	var arcSweep = endAngle - startAngle <= 180 ? "0" : "1"

	return [
		"M", start.x, start.y,
		"A", radius, radius, 0, arcSweep, 0, end.x, end.y,
		// "L", x, y,
		// "L", start.x, start.y
	].join(" ");
}
const colors = [theme.green, theme.red]
export default ({ value=0, size = 80, strokeWidth = 4, color=colors }) => {
  const values = value instanceof Array ? value : [value]
  const x = size/2, y = size/2, r = (size-strokeWidth)/2
  let accumulator = 0 // a trick to simplier the code, while use reduce should be more appropriate  
  return (
    <svg height={size} width={size}>
      { values.map( (value, index, arr) => 
          <path key={index} fill="none" stroke={colors[index]} strokeWidth={strokeWidth} d={describeArc(x, y, r, index && arr[index-1]*360, accumulator += value*360)} />
			)}
			<path fill="none" stroke={theme.colorDark} strokeWidth={2} d={describeArc(x, y, r, accumulator, 360)} />			
    </svg>
  )
}
