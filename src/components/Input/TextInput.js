import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, fontCss, onClickCss } from '../Theme'

const TextStyle = css`
  transition: width 0.25s ease-in;
  border: 0px;
  box-shadow: 0;
  padding: 8px 12px;
  ::placeholder {
    color: ${p => p.theme.colorSecondary};
  }
  background-color: ${p => p.background ? p.theme.bgColorLight : 'transparent'};
  ${p => p.underline && css`
    border-bottom: 1px solid ${p.theme.borderColor};
    padding: 0px;
  `}


  ${p => p.center && css`text-align: center`};

  color: ${p => p.theme.colorSecondary}
  :focus {
    border: 0px;
    box-shadow: 0;
    outline: none !important;
    ${p => p.underline && css`border-bottom: 1px solid ${p.theme.borderColor}`}
  }
  ${onClickCss}
  ${fontCss}
  ${spacingCss}
`
const TextInput = styled.input`
  ${TextStyle}
`

const TextArea = styled.textarea`
  ${TextStyle}
  resize: none;
`
function _onChange(onChange, number) {
  if(onChange) {
    return e => {
      if(number) 
        return /^\d*$/.test(e.target.value) ? onChange(e) : undefined
      return onChange(e)
    }
  } 
  return undefined
}

export default ({line, onChange, number, ...rest}) => line ? 
  <TextArea onChange={_onChange(onChange, number)} {...rest} rows={line} /> 
: 
  <TextInput onChange={_onChange(onChange, number)} {...rest} />

