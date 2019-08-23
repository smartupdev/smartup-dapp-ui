import React from 'react'
import styled, { css } from 'styled-components'

const CheckboxStyle = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 15px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  ${p => p.disabled && css`cursor: not-allowed;`}
  .mark {
    position: absolute;
    left: 0;
    height: 8px;
    width: 8px;
    background-color: transparent;
    border: 1px solid ${p => p.theme.colorPrimary}
    // :after {
    //   content: "";
    //   position: absolute;
    //   display: none;
    //   top: 0;
    //   bottom: 0;
    //   right: 0;
    //   left: 0;
    //   background-color: ${p => p.theme.colorPrimary};
    // }
    :after {
      content: "";
      position: absolute;
      display: none;
      left: 4px;
      top: -4px;
      width: 3px;
      height: 8px;
      border: solid ${p => p.theme.colorPrimary};
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }   
  }
  // :hover input ~ .mark {
  //   background-color: #ccc;
  // }
  // input:checked ~ .mark {
  //   background-color: ${p => p.theme.colorPrimary};
  // }
  input:checked ~ .mark:after {
    display: block;
  }
`

export default ({ onChange, checked, disabled, label = '' }) =>
  <CheckboxStyle disabled={disabled}>
    {label}
    <input type='checkbox' checked={checked} disabled={disabled} onChange={onChange} onKeyPress={e => (e.keyCode || e.which) === 13 && onChange() } />
    <span className='mark' />
  </CheckboxStyle>
