import React from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme'

export default styled.div`
  min-width: 1px;
  min-height: 1px;
  ${props => props.vertical ? css`width: auto` : css`width: 100%`}
  background-color: ${theme.borderColor}
`
