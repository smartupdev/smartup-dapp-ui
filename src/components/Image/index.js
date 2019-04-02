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
  ${p => p.L && css`
    height: ${p => p.theme.imageSizeL};
    width: ${p => p.theme.imageSizeL};
  `}
  ${p => p.XL && css`
    height: ${p => p.theme.imageSizeXL};
    width: ${p => p.theme.imageSizeXL};
  `}
  ${p => p.photo && css`
    height: ${p => p.theme.photoSizeHM};
    width: ${p => p.theme.photoSizeWM};
  `}
  ${p => p.size && css`
    height: ${p => p.size};
    width: ${p => p.size};
  `}
`

export default ({ source, ...rest }) => 
  <Image src={source} {...rest} />