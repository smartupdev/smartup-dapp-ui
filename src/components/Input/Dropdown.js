import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme'
// import { fontCss } from '../Theme'
import { Col } from '../Layout'
import Text from '../Text'

import { More } from '../Icon'

import { length } from '../../lib/util'
import { useClickOutside } from '../../lib/react'

// const Select = styled.select`
//   appearance: none;
//   background-color: ${p => p.theme.bgColor};
//   ${fontCss};
//   color: ${p => p.theme.colorSecondary};
//   text-align-last: center;
//   border: 0;
//   display: flex;
//   flex: 1;
// `

const MoreIcon = styled(More)`
  position: absolute;
  right: ${p => p.theme.spacingS};
  margin: auto 0;
  top: 0;
  bottom: 0;
`

const Box = styled(Col)`
  min-width: ${p => p.maxTextLength + 1}em; 
  width: 30vw;
`
const OptionList = styled(Col)`
  position: absolute;
  & > div {
    background-color: ${p => p.theme.bgColorDark};
    opacity: .9
  }
  width: 100%;
  left: 0;
  bottom: 0;
  height: 0;
  z-index: 9;
  display: ${p => p.open ? 'flex' : 'none' }
`

export default ({ options, onChange, selectedIndex, disabled, ...rest }) => { // TODO
  const [didOpen, setOpen] = useState(false)
  const ref = useRef('dropdown')
  useClickOutside(ref, () => setOpen(false))
  return (
    <Box ref={ref} relative maxTextLength={options.reduce((p, c) => Math.max(p, length(c.label)) , 0)} onClick={() => setOpen(!didOpen)} {...rest}>
      <Text note VS center nowrap>{options[selectedIndex].label}</Text>
      <OptionList open={didOpen}>
        { options.map( ({label, value}, index) =>
          <Text note VS center nowrap key={label} onClick={() => onChange(index)}>{label}</Text>
        ) }
      </OptionList>
      <MoreIcon color={theme.colorSecondary} XS reverse={didOpen} />
    </Box>
  )
}

  // We don't want to use the native one because there is too many style limitation, especially in mobile
  // <Select onChange={e => {console.log(e.target.value)}} value={selectedValue}>
  //   {options.map(({ label, value }) => 
  //     <option key={label} value={value}>{label}</option>
  //   )}
  // </Select>
