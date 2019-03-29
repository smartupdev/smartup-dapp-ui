import React from 'react'
import styled, {css} from 'styled-components'

const Img = styled.img`
  height: ${p => p.theme.iconSizeM};
  width: ${p => p.theme.iconSizeM};
  ${p => p.reverse && css`transform: rotate(180deg)`};
`
export default ({ source, ...rest }) => 
  // Source
  <Img src={source} {...rest} />

//   <object class="partnerLogo" type="image/svg+xml" data="assets/logos/sample.svg">
//   Your browser does not support SVG
// </object>