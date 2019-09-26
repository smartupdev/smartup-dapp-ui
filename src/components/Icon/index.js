import React from 'react'
import styled, {css} from 'styled-components'
import { spacingCss, onClickCss } from '../Theme'

export const Path = styled.path`
  ${p => p.color && css`fill: ${p.color};`}
  ${p => p.active && css`fill: ${p.theme.white};`}
  ${p => p.passive && css`fill: ${p.theme.colorSecondary};`}
`

function setSize(prop, size) {
  return prop && css`
    height: ${size};
    width: ${size};
    min-width: ${size};
  `
}

export const SVG = ({onClick, disabled, ...rest}) => <StyledSvg onClick={disabled ? undefined : onClick} disabled={disabled} {...rest} />
const StyledSvg = styled.svg`
  display: block;
  ${p => setSize(true, p.theme.iconSizeXL)}
  ${p => setSize(p.size, p.size)}
  ${p => setSize(p.XXS, p.theme.iconSizeXXS)}
  ${p => setSize(p.XS, p.theme.iconSizeXS)}
  ${p => setSize(p.S, p.theme.iconSizeS)}
  ${p => setSize(p.L, p.theme.iconSizeL)}
  ${p => setSize(p.XL, p.theme.iconSizeXL)}
  ${p => setSize(p.XXL, p.theme.iconSizeXXL)}
  fill: ${p => p.color};
  ${p => p.round && css`
    border: 1px ${p.color || p.theme.white} solid;
    border-radius: ${
      p.XXS ? p.theme.iconSizeXXS :
      p.XS ? p.theme.iconSizeXS :
      p.S ? p.theme.iconSizeS :
      p.L ? p.theme.iconSizeL :
      p.XL ? p.theme.iconSizeXL :
      p.XXL ? p.theme.iconSizeXXL :
      p.theme.iconSizeM
    }
  `}
  transition: transform .3s ease-in-out;
  ${p => p.primary && css`fill: ${p.theme.colorPrimary}`};
  ${p => p.secondary && css`fill: ${p.theme.colorSecondary}`};
  ${p => p.reverse && css`transform: rotate(180deg)`};
  ${spacingCss}
  ${onClickCss}
  ${p => p.backgroundColor && css`background-color: ${p.backgroundColor};`}
  ${p => p.absolute && css`position: absolute;`}
  ${p => p.top && css`top: ${p.top};`}
  ${p => p.bottom && css`bottom: ${p.bottom};`}
  ${p => p.right && css`right: ${p.right};`}
  ${p => p.left && css`left: ${p.left};`}
  ${p => p.marginAuto && css`margin: auto;`}
  ${p => p.disabled && css`opacity: .3`}
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
export { default as CommunityMember } from './CommunityMember'
export { default as Language } from './Language'
export { default as UserGuide } from './UserGuide'
export { default as Unlock } from './Unlock'
export { default as Undo } from './Undo'
export { default as Loader } from './Loader'
export { default as TickConfirm } from './TickConfirm'