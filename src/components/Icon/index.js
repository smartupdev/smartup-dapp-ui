import React from 'react'
import styled, {css} from 'styled-components'
import { spacingCss, onClickCss } from '../Theme'

export const Path = styled.path`
  ${p => p.active && css`fill: ${p.theme.white};`}
  ${p => p.passive && css`fill: ${p.theme.colorSecondary};`}
`

export const SVG = ({onClick, disabled, ...rest}) => <StyledSvg onClick={disabled ? undefined : onClick} disabled={disabled} {...rest} />
const StyledSvg = styled.svg`
  display: block;
  width: ${p => 
    p.size ? p.size :
    p.XS ? p.theme.imageSizeXS :
    p.S ? p.theme.imageSizeS :
    p.L ? p.theme.imageSizeL :
    p.XL ? p.theme.imageSizeXL :
    p.theme.imageSizeM
  };
  min-width: ${p => 
    p.size ? p.size :
    p.XS ? p.theme.imageSizeXS :
    p.S ? p.theme.imageSizeS :
    p.L ? p.theme.imageSizeL :
    p.XL ? p.theme.imageSizeXL :
    p.theme.imageSizeM
  };
  height: ${p => 
    p.size ? p.size :
    p.XS ? p.theme.imageSizeXS :
    p.S ? p.theme.imageSizeS :
    p.L ? p.theme.imageSizeL :
    p.XL ? p.theme.imageSizeXL :
    p.theme.imageSizeM
  };
  fill: ${p => p.color};
  ${p => p.round && css`
    border: 1px ${p.theme.white} solid;
    border-radius: ${
      p.XS ? p.theme.imageSizeXS :
      p.S ? p.theme.imageSizeS :
      p.L ? p.theme.imageSizeL :
      p.XL ? p.theme.imageSizeXL :
      p.theme.imageSizeM
    }
  `}
  transition: transform .3s ease-in-out;
  ${p => p.primary && css`fill: ${p.theme.colorPrimary}`};
  ${p => p.reverse && css`transform: rotate(180deg)`};
  ${spacingCss}
  ${onClickCss}
  ${p => p.backgroundColor && css`background-color: ${p.backgroundColor};`}
  ${p => p.absolute && css`position: absolute;`}
  ${p => p.top && css`top: ${p.top};`}
  ${p => p.bottom && css`bottom: ${p.bottom};`}
  ${p => p.right && css`right: ${p.right};`}
  ${p => p.left && css`left: ${p.left};`}
`

export { default as Menu1 } from './Menu1' 
export { default as Menu2 } from './Menu2' 
export { default as Menu3 } from './Menu3' 
export { default as Menu4 } from './Menu4' 
export { default as People } from './People' 
export { default as Bookmarked } from './Bookmarked' 
export { default as Comment } from './Comment' 
export { default as Draft } from './Draft' 
export { default as Search } from './Search' 
export { default as Close } from './Close' 
export { default as CloseWithCircle } from './CloseWithCircle' 
export { default as More } from './More' 
export { default as Trade } from './Trade' 
export { default as Copy } from './Copy' 
export { default as CreateMarket } from './CreateMarket' 
export { default as PersonalCentre } from './PersonalCentre' 
export { default as Expand } from './Expand' 
export { default as EditPan } from './EditPan' 
export { default as Tick } from './Tick' 
export { default as Alert } from './Alert' 
export { default as First } from './First' 
export { default as Second } from './Second' 
export { default as Third } from './Third' 
export { default as Rule } from './Rule' 
export { default as Information } from './Information' 
export { default as Reply } from './Reply' 
export { default as Feedback } from './Feedback'
export { default as Like } from './Like'
export { default as Dislike } from './Dislike'
export { default as Save } from './Save'
export { default as Share } from './Share'
export { default as Option } from './Option'
export { default as Money } from './Money'
export { default as Description } from './Description'
export { default as Add } from './Add'
export { default as MainPage } from './MainPage'
export { default as FeedbackEmail } from './FeedbackEmail'
export { default as Faq } from './Faq'
export { default as MainPageButton } from './MainPageButton'
export { default as ViewMarketButton } from './ViewMarketButton'
export { default as CreateMarketButton } from './CreateMarketButton'
export { default as FindMarketButton } from './FindMarketButton'
export { default as ReadAll } from './ReadAll'
export { default as UnreadMsg } from './UnreadMsg'