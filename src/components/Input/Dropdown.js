import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import { media } from '../Theme'

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
  right: 0;
  margin: auto 0;
  top: 0;
  bottom: 0;
`

const Box = styled(Col)`
  padding: 0 calc( ${p => p.theme.imageSizeXS} + 8px );
  width: ${p => p.width}
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

const TextDump = styled(Text)`
  height: 0;
  visibility: hidden;
`

export default ({ options, onChange, selectedIndex, value, disabled, width, ...rest }) => { // TODO
  const [didOpen, setOpen] = useState(false)
  const ref = useRef('dropdown')
  const maxText = options.reduce((p, c) => p.length > c.label.length ? p : c.label, '')
  const selectedLabel = options[selectedIndex] ? options[selectedIndex].label : (options.find(o => o.value === value) || {}).label
  useClickOutside(ref, () => setOpen(false))
  return (
    <Box ref={ref} relative fitHeight width={width} onClick={() => setOpen(!didOpen)} {...rest}>
      <TextDump nowrap>{maxText}</TextDump>
      <Text note VS center nowrap>{selectedLabel}</Text>
      <OptionList open={didOpen}>
        { options.map( ({label, value}, index) =>
          <Text note VS center nowrap key={label} onClick={() => onChange(index, value)}>{label}</Text>
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
