import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

const Img = styled.img`
  height: ${theme.iconSizeM};
  width: ${theme.iconSizeM};
`
export default ({ source }) => 
  // Source
  <Img src={source} />

//   <object class="partnerLogo" type="image/svg+xml" data="assets/logos/sample.svg">
//   Your browser does not support SVG
// </object>