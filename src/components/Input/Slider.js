// Note: Don't use input type=range because cannot set two colors in the track in chrome
import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Text from '../Text'
import TextInput from '../Input'
import { Col, Row } from '../Layout'
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

const Label = styled(Row).attrs(p => ({
  bgLight: !p.disabled, 
  note: true, 
  S: true, 
  MarginRightBase: true,
  nowrap: true,
  centerVertical: true,
}))`
  // transform: translateX(${p => 100 - p.percent}%);
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent ${p => p.bgLight && p.theme.bgColorLight};
  }
`

const Dot = styled.div.attrs(p => ({ style: {marginLeft: p.value} }))`
  width: ${dotSize};
  min-height: ${dotSize};
  border-radius: ${dotSize};
  transform: translateX(-50%);
  background-color: ${p => p.disabled ? p.theme.white : p.theme.colorDark}
  ${p => p.disabled && css`display: none;`}
  z-index: 1;
`

export default ({ onChange=console.log, value=.4, max=1, showScale, disabled }) => {
  const [_value, setValue] = useState(null) // for intermediate display value
  const barRef = useRef()
  const changeRef = useRef(false) // for instant change
  
  function _onChange(v) { onChange( Math.min(Math.round(v)/100, max)) }

  function getDotValue(e) {
    const { width, left } = barRef.current.getBoundingClientRect()
    const newPercent = (e.clientX-left)/width
    const newValue = within(newPercent, 0, 1) * max
    return newValue
  }
  function onMouseDown(e) {
    if(!disabled) {
      changeRef.current = true
      setValue(getDotValue(e))
    }
  }
  useEffect(() => eventListener('mousemove', e => {
    changeRef.current && setValue(getDotValue(e))
  }), [onChange])
  useEffect(() => eventListener('mouseup', e => {
    const newValue = getDotValue(e)
    if(changeRef.current) {
      onChange(newValue)
      setValue(null)
      changeRef.current = false
    }
  }), [onChange])
  const currentValue = Math.min( _value === null ? value : _value, 1)
  const percent = currentValue/max*100 + '%'
  return (
    <Row centerVertical>
      <Label disabled={disabled} HXS>
        { value > max && <Text note>></Text> }
        <TextInput number decimal={0} digit={3} size='2' value={Math.round(currentValue*100)} onChange={_onChange} right H0 />
        <Text note>%</Text>
      </Label>
      <Bar ref={barRef} onMouseDown={onMouseDown}>
        <Col height={barSize} bgPrimary={!disabled} bgWhite={disabled} absolute borderRadius='2px' style={{ width: percent }} />
        <Dot value={percent} onMouseDown={onMouseDown} disabled={disabled} />
        {showScale &&
          <Row absolute width='101%' absLeft='-.5%' spaceBetween TopXL>
            {[0, 25, 50, 75, 100].map( v =>
              <Text noSelect center={v===50} right={v > 50} nowrap key={v} width='20px' onClick={() => onChange(v/100)}>{v}</Text>
            )}
          </Row>
        }
      </Bar>
        
    </Row>
  )
}
