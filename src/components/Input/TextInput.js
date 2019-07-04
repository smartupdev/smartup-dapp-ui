import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, fontCss, onClickCss } from '../Theme'

const TextStyle = css`
  ${onClickCss}
  ${fontCss}
  ${spacingCss}

  transition: width 0.25s ease-in;
  border: 0px;
  box-shadow: 0;
  padding: 8px 12px;
  ::placeholder {
    color: ${p => p.theme.colorSecondary};
    opacity: 0.5;
  }
  background-color: ${p => p.background ? p.theme.bgColorLight : 'transparent'};
  ${p => p.underline && css`
    border-bottom: 1px solid ${p.theme.borderColor};
    text-decoration: none;
    padding: 0px;
  `}


  ${p => p.center && css`text-align: center`};

  color: ${p => p.theme.colorSecondary};
  :focus {
    border: 0px;
    box-shadow: 0;
    outline: none !important;
    ${p => p.underline && css`border-bottom: 1px solid ${p.theme.borderColor}`}
  }

  ${p => p.backgroundColor && css`
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px ${p.backgroundColor} inset;
      -webkit-text-fill-color: ${p.theme.colorSecondary};
    }
  `}
`
const TextInput = styled.input`
  ${TextStyle}
`

const TextArea = styled.textarea`
  ${TextStyle}
  min-height: fit-content;
  resize: none;
`
function _onChange(onChange, number) {
  if(onChange) {
    return e => {
      const value = e.target.value
      if(number) 
        return /^\d{0,10}(\.\d{0,2})?$/.test(value) ? onChange(value) : undefined
      return onChange(value)
    }
  } 
  return undefined
}

function shouldBlur(e) {
  if (e.keyCode === 13) { // enter
    e.target.blur();
  }
}

export default ({line, onChange, number, ...rest}) => line ? 
  <TextArea onChange={_onChange(onChange, number)} {...rest} rows={line} /> 
: 
  <TextInput onChange={_onChange(onChange, number)} onKeyDown={shouldBlur} {...rest} />

