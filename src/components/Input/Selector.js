import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../Text'
import { Row } from '../Layout'

const dotSize = 8
const labelSize = 80

const Box = styled(Row)`
  ${p => p.showLabel && css`margin-left: ${labelSize}px;`}
`

const Bar = styled.div`
  height: 3px;
  top: 4px;
  left: ${p => 100/p.length/2}%;
  width: ${p => 100 - 100/p.length}%;
  background-color: ${p => p.theme.bgColorLight};
  ${p => typeof p.index === 'number' && css`
    background-color: ${p.theme.white};
    width: ${p => (100 - 100/p.length) * p.index/(p.length - 1)}%;
    :after {
      position: absolute;
      right: -${dotSize/2}px;
      top: -${dotSize/2}px;
      content: " ";
      background-color: ${p.theme.white};
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: ${dotSize}px;
      border: 1px solid ${p.theme.bgColorLight};
    }    
  `}
  position: absolute;
`

const Label = styled(Text)`
  position: absolute;
  left: -${labelSize}px;
  text-align: right;
  width: ${labelSize}px;
`
const Option = styled(Text)`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 18px;
`

export default ({ options, selectedIndex, onClick, showLabel }) => {
  return (
    <>
    <Box spaceBetween showLabel={showLabel}>
      {!!showLabel && <Label>{options[selectedIndex]}</Label>}
      <Bar length={options.length} />
      <Bar length={options.length} index={selectedIndex} />
      {
        options.map( (options, index) =>
          <Option key={options} onClick={() => onClick(index)}>{options}</Option>
        )
      }
    </Box>
    </>
  )
}
