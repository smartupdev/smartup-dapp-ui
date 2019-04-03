import styled, { css } from 'styled-components'
export default styled.input`
  width: 100%;
  transition: width 0.25s ease-in;
  background-color: transparent;
  border: 0px;
  box-shadow: 0;
  color: ${p => p.theme.colorSecondary}
  :focus {
    border: 0px;
    box-shadow: 0;
    outline: none !important;
  }
`
