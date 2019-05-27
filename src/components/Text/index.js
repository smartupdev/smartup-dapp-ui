import React, {Children} from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, onClickCss, fontCss } from '../Theme'

export const A = styled.a`
  ${fontCss}
  cursor: pointer;
  text-decoration: underline;
  :link{color:inherit}
  :active{color:inherit}
  :visited{color:inherit}
  :hover{color:inherit}
  ${p => p.error && css`
    color: ${p.theme.red};
    :visited { 
      color: ${p.theme.red};
    }
  `}
`

export const Text = styled.p`
  margin: 0;
  padding: 0;
  word-break: break-word;
  ${spacingCss}
  ${onClickCss}
  ${fontCss}

  ${p => p.inline && css`display: inline`};
  ${p => p.lineHeight && css`line-height: 1.5`};

  ${p => p.right && css`text-align: right`};
  ${p => p.center && css`text-align: center`};

  ${p => p.wordSpaceL && css`letter-spacing: ${p => p.theme.fontSpacingL}`}
  ${p => p.wordSpaceM && css`letter-spacing: ${p => p.theme.fontSpacingM}`}
  ${p => p.wordSpaceS && css`letter-spacing: ${p => p.theme.fontSpacingS}`}
  ${p => p.wordSpaceXS && css`letter-spacing: ${p => p.theme.fontSpacingXS}`}
  
  ${p => p.bold && css`font-weight: bold`}
  ${p => p.underline && css`text-decoration: underline;`}
  ${p => p.underlineColor && css`text-decoration-color: ${p.underlineColor};`}
  ${p => p.newline && css`white-space: pre-wrap;`}  
  ${p => p.nowrap && css`white-space: nowrap;`}
  ${p => p.textOverflow && css`
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis;
    width: 100%;
  `}
  ${p => p.width && css`width: ${p.width}; min-width: ${p.width};`}

  ${p => p.error && css`
    color: ${p.theme.red};
    :before {
      content: "!";
      font-size: 10px;
      border-radius: 8px;
      border: 1px solid;
      padding-left: 6.5px;
      padding-right: 6.5px;
      margin-right: 4px;
    }    
  `}
`

export const TextWithLink = ({children, ...rest}) => 
  <Text {...rest}>
    {Children.map(children, text => 
      typeof text === 'string' ?
      text.split(/ /g).map( t => /^https?:\/\/.+/.test(t) ? <A href={t}>{t}</A> : `${t} ` ) :
      text
    )}
  </Text>
export default Text