import React from 'react'
import styled, { css } from 'styled-components'

const Height = 40
const Width = 200

const SVG = styled.svg`
  height: ${Height}px; 
  width: ${Width}px; 
`

const Polyline = styled.polyline`
  stroke: ${p => p.theme.colorPrimary};
  fill: none;
  stroke-width: 1;
`

export default ({ value }) => {
  const maxValue = Math.max(...value)
  const minValue = Math.min(...value)
  return (
    <SVG>
      <Polyline 
        points={value.map( (v, i) => `${i * Width/(value.length - 1)},${ Height - (v - minValue)/(maxValue - minValue) * (Height -2)}`).join(' ')}
        />
    </SVG>
  )
}
