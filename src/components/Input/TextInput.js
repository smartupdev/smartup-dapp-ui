import React from 'react'
import styled, { css } from 'styled-components'

const TextStyle = css`
  transition: width 0.25s ease-in;
  border: 0px;
  box-shadow: 0;
  padding: 8px 12px;

  // ${p => p.fullWidth && css`width: calc( 100% - 12px * 2 )`};
  background-color: ${p => p.background ? p.theme.bgColorLight : 'transparent'};
  ${p => p.underline && css`
    border-bottom: 1px solid ${p.theme.borderColor};
    padding: 0px;
  `}

  ${props => props.XS && css`font-size: ${p => p.theme.fontSizeXS}`}
  ${props => props.S && css`font-size: ${p => p.theme.fontSizeS}`}
  ${props => props.M && css`font-size: ${p => p.theme.fontSizeM}`}
  ${props => props.L && css`font-size: ${p => p.theme.fontSizeL}`}
  ${props => props.XL && css`font-size: ${p => p.theme.fontSizeXL}`}

  ${p => p.center && css`text-align: center`};

  color: ${p => p.theme.colorSecondary}
  :focus {
    border: 0px;
    box-shadow: 0;
    outline: none !important;
    ${p => p.underline && css`border-bottom: 1px solid ${p.theme.borderColor}`}
  }
  :disabled {
    cursor: not-allowed;
  }
`
const TextInput = styled.input`
  ${TextStyle}
`

const TextArea = styled.textarea`
  ${TextStyle}
  resize: none;
`

export default ({line, ...rest}) => line ? <TextArea {...rest} rows={line} /> : <TextInput {...rest} />

