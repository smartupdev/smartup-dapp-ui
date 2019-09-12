import React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import Text from '../Text'

const Box = styled.div`
	display: flex;
	flex-direction: column-reverse;
`

const BarBase = styled.div`
	position: relative;
	height: ${p => p.strokeWidth}px;
	width: 100%;
	background-color: ${p => p.theme.colorSecondary}
`

const Bar = styled.div`
	position: absolute;
	height: ${p => p.strokeWidth}px;
	width: ${p => p.percent*100}%;
	background-color: ${p => p.color};
`

const Info = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
`

const Threshold = styled.div`
	position: absolute;
	left: ${p => p.threshold*100}%;
	padding-left: 8px;
	border-left: dashed 1px ${p => p.theme.borderColor};
`
// colorDark
const colorsDefault = [theme.green, theme.red]
export default ({ value=0, maxValue=100, strokeWidth = 4, colors=colorsDefault, threshold=.5, symbol = 'SUT' }) => {
	const values = value instanceof Array ? value : [value]
	let accumulator = 0
  return (
		<Box>
			<Info>
				<Text note S VXS>YES: {values[0]} {symbol} | NO: {values[1]} {symbol}</Text>	
			</Info>
			<BarBase strokeWidth={strokeWidth}>
				{values.map( (value, index) =>
					<Bar key={index} strokeWidth={strokeWidth} color={colors[index]} percent={accumulator += value/maxValue} />
				).reverse()}
			</BarBase>
			<Info>
				<Text note S VXS>{accumulator*100}% APPROVAL</Text>
				<Threshold threshold={threshold}>
					<Text note S VXS>MINIUM APPROVAL NEEDED: {threshold*100}%</Text>
				</Threshold>
			</Info>
		</Box>
  )
}
