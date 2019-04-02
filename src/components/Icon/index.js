import React from 'react'
import styled, {css} from 'styled-components'

const Img = styled.img`
  height: ${p => p.theme.iconSizeM};
  width: ${p => p.theme.iconSizeM};
  transition: transform .3s ease-in-out;
  ${p => p.reverse && css`transform: rotate(180deg)`};
`
export default ({ source, ...rest }) => 
  <Img src={source} {...rest} />

export const SVG = styled.svg`
  display: block;
  width: ${p => 
    p.XS ? p.theme.imageSizeXS :
    p.S ? p.theme.imageSizeS :
    p.L ? p.theme.imageSizeL :
    p.theme.imageSizeM
  };
  height: ${p => 
    p.XS ? p.theme.imageSizeXS :
    p.S ? p.theme.imageSizeS :
    p.L ? p.theme.imageSizeL :
    p.theme.imageSizeM
  };
  fill: ${p => p.color};
  ${p => p.round && css`
    border: 1px ${p.theme.white} solid;
    border-radius: ${
      p.XS ? p.theme.imageSizeXS :
      p.S ? p.theme.imageSizeS :
      p.L ? p.theme.imageSizeL :
      p.theme.imageSizeM
    }
  `}
  transition: transform .3s ease-in-out;
  ${p => p.reverse && css`transform: rotate(180deg)`};
  ${p => p.rightText && css`margin-right: ${p.theme.fontSizeXS}`};
  ${p => p.onClick && css`cursor: pointer;`}
`

export { default as Menu1 } from './Menu1' 
export { default as Menu2 } from './Menu2' 
export { default as Menu3 } from './Menu3' 
export { default as Menu4 } from './Menu4' 
export { default as People } from './People' 
export { default as Bookmarked } from './Bookmarked' 
export { default as BookmarkedOutline } from './BookmarkedOutline' 
export { default as Comment } from './Comment' 
export { default as Draft } from './Draft' 
export { default as Search } from './Search' 
export { default as Close } from './Close' 
export { default as More } from './More' 
export { default as Trade } from './Trade' 

