import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, media } from '../Theme'

const Image =  styled.img`
  ${spacingCss}
  # background-color: tomato
  height: ${p => p.theme.imageSizeM};
  width: ${p => p.theme.imageSizeM};
  min-height: ${p => p.theme.imageSizeM};
  min-width: ${p => p.theme.imageSizeM};
  ${p => p.rightText && css`margin-right: ${p.theme.fontSizeXS}`};
  ${p => p.leftText && css`margin-left: ${p.theme.fontSizeXS}`};
  ${p => p.XS && css`
    height: ${p => p.theme.imageSizeXS};
    width: ${p => p.theme.imageSizeXS};
    min-height: ${p => p.theme.imageSizeXS};
    min-width: ${p => p.theme.imageSizeXS};
    `}
  ${p => p.S && css`
    height: ${p => p.theme.imageSizeS};
    width: ${p => p.theme.imageSizeS};
    min-height: ${p => p.theme.imageSizeS};
    min-width: ${p => p.theme.imageSizeS};  
  `}
  ${p => p.L && css`
    height: ${p => p.theme.imageSizeL};
    width: ${p => p.theme.imageSizeL};
    min-height: ${p => p.theme.imageSizeL};
    min-width: ${p => p.theme.imageSizeL};
  `}
  ${p => p.XL && css`
    height: ${p => p.theme.imageSizeXL};
    width: ${p => p.theme.imageSizeXL};
    min-height: ${p => p.theme.imageSizeXL};
    min-width: ${p => p.theme.imageSizeXL};  
  `}
  ${p => p.photo && css`
    height: ${p => p.theme.photoSizeHM};
    width: ${p => p.theme.photoSizeWM};
  `}
  ${p => p.size && css`
    height: ${p => p.size};
    width: ${p => p.size};
    min-height: ${p => p.size};
    min-width: ${p => p.size};  
  `}
  ${p => p.height && 
    (p.height instanceof Array ? 
      media(`height: ${p.height[0]}; min-height: ${p.height[0]};`, `height: ${p.height[1]}; min-height: ${p.height[1]};`)
      : css`height: ${p.height}; min-height: ${p.height};` 
    )}
  ${p => p.width && (
    p.width instanceof Array ? 
      media(`width: ${p.width[0]}; min-width: ${p.width[0]};`, `width: ${p.width[1]}; min-width: ${p.width[1]};`)
    : css`width: ${p.width}; min-width: ${p.width};`
  )}
  ${p => p.round && css`
    border-radius: ${
      p.size ? p.size :
      p.XS ? p.theme.imageSizeXS :
      p.S ? p.theme.imageSizeS :
      p.L ? p.theme.imageSizeL :
      p.XL ? p.theme.imageSizeXL :
      p.theme.imageSizeM
    };
  `}
  ${p => p.cover && css`object-fit: cover;`}
  ${p => p.actualSize && css`
    width: auto; 
    height: auto; 
    max-width: 100%;
  `}
`

export default ({ source, actualSize, ...rest }) => 
  actualSize ?
    <div>
      <Image src={source} {...rest} actualSize />
    </div>
  :
  <Image src={source} {...rest} />