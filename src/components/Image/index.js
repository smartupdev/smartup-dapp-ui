import React from 'react'
import styled, { css } from 'styled-components'

const Image =  styled.img`
  # background-color: tomato
  height: ${p => p.theme.imageSizeM};
  width: ${p => p.theme.imageSizeM};
  ${p => p.rightText && css`margin-right: ${p.theme.fontSizeXS}`};
  ${p => p.XS && css`
    height: ${p => p.theme.imageSizeXS};
    width: ${p => p.theme.imageSizeXS};
  `}
  ${p => p.S && css`
    height: ${p => p.theme.imageSizeS};
    width: ${p => p.theme.imageSizeS};
  `}
  ${p => p.long && css`
    height: ${p => p.theme.imageSizeM};
    width: ${p => `calc( ${p.theme.imageSizeM} * 2 )`};
  `}
`

export default ({ source, ...rest }) => 
  <Image src={source} {...rest} />