// Note: Don't use input type=range because cannot set two colors in the track in chrome
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Text from '../Text'
import { Col } from '../Layout'
import eventListener from '../../lib/react'
import { within } from '../../lib/util'

const barSize = '4px'
const dotSize = '10px'

const Bar = styled(Col).attrs(p => ({
  flex: 1,
  height: barSize,
  maxHeight: barSize,
  bgSecondary: true,
  centerVertical: true,
  relative: true,
  borderRadius: '2px'  
}))``

const Label = styled(Text).attrs(p => ({
  HS: true, 
  VBase: true, 
  bgLight: true, 
  note: true, 
  S: true, 
  MarginTopBase: true,
  nowrap: true,
  percent: +p.percent.slice(0, -1)
}))`
  transform: translateX(${p => 100 - p.percent}%);
  &::after {
    content: " ";
    position: absolute;
    bottom: 100%; 
    left: ${p => p.percent}%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${p => p.theme.bgColorLight} transparent;
  }
`

const Dot = styled.div.attrs(p => ({ style: {marginLeft: p.value} }))`
  width: ${dotSize};
  min-height: ${dotSize};
  border-radius: ${dotSize};
  transform: translateX(-50%);
  background-color: ${p => p.theme.colorDark}
  z-index: 1;
`

function displayTextFnDefault(t) { return (+t).toFixed(2) }

export default ({ onChange=console.log, value=40, max=100, displayTextFn=displayTextFnDefault }) => {
  const [_value, setValue] = useState(null) // for intermediate display value
  const barRef = useRef()
  const changeRef = useRef(false) // for instant change

  function getDotValue(e) {
    const { width, left } = barRef.current.getBoundingClientRect()
    const newPercent = (e.clientX-left)/width
    const newValue = within(newPercent, 0, 1) * max
    return newValue
  }
  function onMouseDown(e) {
    changeRef.current = true
    setValue(getDotValue(e))
  }
  useEffect(() => eventListener('mousemove', e => {
    changeRef.current && setValue(getDotValue(e))
  }), [])
  useEffect(() => eventListener('mouseup', e => {
    const newValue = getDotValue(e)
    if(changeRef.current) {
      onChange(newValue)
      setValue(null)
      changeRef.current = false
    }
  }), [])
  const percent = (_value === null ? value : _value)/max*100 + '%'
  return (
    <Col>
      <Bar ref={barRef} onMouseDown={onMouseDown}>
        <Col height={barSize} bgPrimary absolute borderRadius='2px' style={{ width: percent }} />
        <Dot value={percent} onMouseDown={onMouseDown} />
      </Bar>
      <Col right style={{ width: percent }}>
        <Label percent={percent}>{displayTextFn(_value || value)}</Label>
      </Col>
    </Col>
  )
}
