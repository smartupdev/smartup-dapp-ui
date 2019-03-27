import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
  height: ${p => p.theme.iconSizeM};
  width: ${p => p.theme.iconSizeM};
`
export default ({ source }) => 
  // Source
  <Img src={source} />

//   <object class="partnerLogo" type="image/svg+xml" data="assets/logos/sample.svg">
//   Your browser does not support SVG
// </object>