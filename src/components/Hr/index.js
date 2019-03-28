import styled, { css } from 'styled-components'

export default styled.div`
  min-width: 1px;
  min-height: 1px;
  ${props => props.vertical ? css`width: auto` : css`width: 100%`}
  background-color: ${p => p.theme.borderColor}
`
