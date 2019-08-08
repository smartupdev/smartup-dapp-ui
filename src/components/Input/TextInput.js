import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, fontCss, onClickCss } from '../Theme'
import { InputWrapper } from './Common'

export const TextStyle = css`
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
function _onChange(onChange, number, degit, decimal) {
  if(onChange) {
    return e => {
      const value = e.target.value
      if(number) {
        const regex = new RegExp(`^\\d{0,${degit}}(\\.\\d{0,${decimal}}){0,${decimal ? 1 : 0}}$`)
        return regex.test(value) ? onChange(value) : undefined
      }
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

export default ({ label, error, description, line, onChange, number, digit = 10, decimal = 2, inputRef, ...rest}) =>  
  <InputWrapper label={label} error={error} description={description}>
    { line ?
      <TextArea onChange={_onChange(onChange, number, digit, decimal)} ref={inputRef} {...rest} rows={line} /> 
    : 
      <TextInput onChange={_onChange(onChange, number, digit, decimal)} onKeyDown={shouldBlur} ref={inputRef} {...rest} />
    }
  </InputWrapper>

