import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const Hr = styled.div`
  min-width: 1px;
  min-height: 1px;
  background-color: ${theme.borderColor};
`

export default () => <Hr />