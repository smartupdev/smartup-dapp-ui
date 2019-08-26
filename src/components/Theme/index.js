import React from 'react'
import cmTheme from './defaultTheme'
import { ThemeProvider as Provider, css, keyframes } from 'styled-components'

export const ThemeProvider = ({defaultTheme = cmTheme, children}) => {
  return (
    <Provider theme={defaultTheme}>
      {children}
    </Provider>
  );
}

export const media = (...cssArray) => 
  css`
    ${p => [0, ...p.theme.sizes].map((size, index, array) =>
      css`
        @media (min-width: ${array[index]}px) and (max-width: ${array[index+1] || 9999}px) {
          ${ css`${cssArray[index]}` }
        }
      `
    )}
  `

export const responsiveCss = css`
  ${p => p.hiddenMobile && media('display: none')}
  ${p => p.hiddenDesktop && media(null, 'display: none')}
  ${props => props.width && (
    props.width instanceof Array ?
    media(
      `width: ${props.width[0]}; min-width: ${props.width[0]}`, 
      `width: ${props.width[1]}; min-width: ${props.width[1]}`
    ) :
    css`width: ${props.width}; min-width: ${props.width}`
  )};
`

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate( 0, 5% );
  }
  100% {
    opacity: 1;
    transform: translate( 0, 0 );
  }
`

export const fadeIn = (second = 2, delay = 0) => css`
  opacity: 0;
  animation: ${second}s ${delay}s ${fadeInAnimation} ease forwards; 
`

export const fontSizeCss = css`
  font-size: ${p => p.theme.fontSizeM};
  ${props => props.XS && css`font-size: ${p => p.theme.fontSizeXS}`}
  ${props => props.S && css`font-size: ${p => p.theme.fontSizeS}`}
  ${props => props.M && css`font-size: ${p => p.theme.fontSizeM}`}
  ${props => props.L && css`font-size: ${p => p.theme.fontSizeL}`}
  ${props => props.XL && css`font-size: ${p => p.theme.fontSizeXL}`}
`
export const fontCss = css`
  font-family: ${p => p.theme.fontFamily};
  ${fontSizeCss}

  ${p => p.bold && css`font-weight: bold`}
  ${p => p.underline && css`text-decoration: underline;`}
  ${p => p.underlineColor && css`text-decoration-color: ${p.underlineColor};`}
  ${p => p.newline && css`white-space: pre-wrap;`}  

  ${p => p.note && css`color: ${p => p.theme.colorSecondary}`}
  ${p => p.price && css`color: ${p => p.theme.colorPrice}`}
  ${p => p.primary && css`color: ${p => p.theme.colorPrimary}`}
  ${p => p.red && css`color: ${p.theme.red}`};
  ${p => p.green && css`color: ${p.theme.green}`};
`
export const generalCss = css`
  ${p => css`
    ${p.borderRadius && `border-radius: ${p.borderRadius}`}
    ${p.opacity && `opacity: ${p.opacity}`}
    ${colorCss}
    ${onClickCss}
    ${spacingCss}
    ${responsiveCss}
  `}
`

export const colorCss = css`
  ${p => css`
    ${p.color && `color: ${p.color}`}
    ${p.customBgColor && `background-color: ${p.customBgColor}`}
    ${!!p.primary && `color: ${p.theme.colorPrimary}`}
    ${!!p.secondary && `color: ${p.theme.colorSecondary}`}
    ${!!p.bgPrimary && `background-color: ${p.theme.colorPrimary}`}
    ${!!p.bgSecondary && `background-color: ${p.theme.colorSecondary}`}
    ${!!p.bgColor && `background-color: ${p.theme.bgColor}`}
    ${!!p.bgDark && `background-color: ${p.theme.bgColorDark}`}
    ${!!p.bgLight && `background-color: ${p.theme.bgColorLight}`}
    ${!!p.bgWhite && `background-color: ${p.theme.white}`}
    ${!!p.bgRed && `background-color: ${p.theme.red}`}
    ${!!p.bgGreen && `background-color: ${p.theme.green}`}
  `}
`
export const onClickCss = css`
  ${p => p.noSelect && 'user-select: none;'}
  ${p => p.onClick && 'cursor: pointer;'}
  ${p => p.disabled && 'cursor: not-allowed;'}
`

export const spacingCss = css`
  ${p => 
    [
      { key: 'Base', value: 'Base', cssKey: 'padding' },
      { key: 'XS', value: 'XS', cssKey: 'padding' },
      { key: 'S', value: 'S', cssKey: 'padding' },
      { key: 'M', value: 'M', cssKey: 'padding' },
      { key: 'L', value: 'L', cssKey: 'padding' },
      { key: 'XL', value: 'XL', cssKey: 'padding' },

      { key: 'Base', value: 'Base', cssKey: 'margin', prefix: 'Margin' },
      { key: 'XS', value: 'XS', cssKey: 'margin', prefix: 'Margin' },
      { key: 'S', value: 'S', cssKey: 'margin', prefix: 'Margin' },
      { key: 'M', value: 'M', cssKey: 'margin', prefix: 'Margin' },
      { key: 'L', value: 'L', cssKey: 'margin', prefix: 'Margin' },
      { key: 'XL', value: 'XL', cssKey: 'margin', prefix: 'Margin' },
    ].map( ({ key, value, cssKey, prefix = '' }) => css`
      ${(p['spacing' + prefix + key] || p[prefix + 'All' + key]) && `${cssKey}: ${p.theme['spacing' + value]}`};
      ${(p['spacingV' + prefix + key] || p[prefix + 'V' + key]) && `${cssKey}-top: ${p.theme['spacing' + value]}; ${cssKey}-bottom: ${p.theme['spacing' + value]};`}
      ${(p['spacingH' + prefix + key] || p[prefix + 'H' + key]) && `${cssKey}-left: ${p.theme['spacing' + value]}; ${cssKey}-right: ${p.theme['spacing' + value]};`}
      ${(p['spacingLeft' + prefix + key] || p[prefix + 'Left' + key]) && `${cssKey}-left: ${p.theme['spacing' + value]}`};
      ${(p['spacingRight' + prefix + key] || p[prefix + 'Right' + key]) && `${cssKey}-right: ${p.theme['spacing' + value]}`};
      ${(p['spacingBottom' + prefix + key] || p[prefix + 'Bottom' + key]) && `${cssKey}-bottom: ${p.theme['spacing' + value]}`};
      ${(p['spacingTop' + prefix + key] || p[prefix + 'Top' + key]) && `${cssKey}-top: ${p.theme['spacing' + value]}`};    
    `)
  }
`