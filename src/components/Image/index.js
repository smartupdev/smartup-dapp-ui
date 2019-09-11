import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, media, colorCss } from '../Theme'

function setSize(prop, size) {
  return prop && css`
    height: ${size};
    width: ${size};
    min-height: ${size};
    min-width: ${size};
  `
}

const Image =  styled.img`
  ${spacingCss}
  ${colorCss}
  # background-color: tomato
  ${p => p.rightText && css`margin-right: ${p.theme.fontSizeXS}`};
  ${p => p.leftText && css`margin-left: ${p.theme.fontSizeXS}`};
  ${p => setSize(true, p.theme.imageSizeM)}
  ${p => setSize(p.XS, p.theme.imageSizeXS)}
  ${p => setSize(p.S, p.theme.imageSizeS)}
  ${p => setSize(p.L, p.theme.imageSizeL)}
  ${p => setSize(p.XL, p.theme.imageSizeXL)}

  ${p => setSize(p.iconXS, p.theme.iconSizeXS)}
  ${p => setSize(p.iconS, p.theme.iconSizeS)}
  ${p => setSize(p.iconM, p.theme.iconSizeM)}
  ${p => setSize(p.iconL, p.theme.iconSizeL)}
  ${p => setSize(p.iconXL, p.theme.iconSizeXL)}

  ${p => setSize(p.size, p.size)}
  ${p => p.photo && css`
    height: ${p => p.theme.photoSizeHM};
    width: ${p => p.theme.photoSizeWM};
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