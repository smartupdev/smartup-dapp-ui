import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  height: ${p => p.height}; 
  width: ${p => p.width}; 
`

const Polyline = styled.polyline`
  stroke: ${p => p.theme.colorPrimary};
  fill: none;
  stroke-width: 1;
`

export default ({ value, height = 40, width = 200 }) => {
  const maxValue = Math.max(...value)
  const minValue = Math.min(...value)
  return (
    <SVG height={height} width={width}>
      <Polyline 
        points={
          maxValue === minValue ?
            `${0},${height/2} ${width},${height/2}`
          :
            value.map( (v, i) => `${i * width/(value.length - 1)},${ height - (v - minValue)/(maxValue - minValue) * (height -2)}`).join(' ')
        }
        />
    </SVG>
  )
}
