import React from 'react'
import cmTheme from './defaultTheme'
import { ThemeProvider as Provider, css } from 'styled-components'

export const ThemeProvider = ({defaultTheme = cmTheme, children}) => {
  return (
    <Provider theme={defaultTheme}>
      {children}
    </Provider>
  );
}

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
`

export const onClickCss = css`
  ${p => p.onClick && css`cursor: pointer`};
  ${p => p.disabled && css`cursor: not-allowed;`}
`

export const spacingCss = css`
  ${p => p.spacingLeftBase && css`padding-left: ${p.theme.spacingBase}`};
  ${p => p.spacingRightBase && css`padding-right: ${p.theme.spacingBase}`};
  ${p => p.spacingBottomBase && css`padding-bottom: ${p.theme.spacingBase}`};
  ${p => p.spacingTopBase && css`padding-top: ${p.theme.spacingBase}`};

  ${p => p.spacingLeftXS && css`padding-left: ${p.theme.spacingXS}`};
  ${p => p.spacingRightXS && css`padding-right: ${p.theme.spacingXS}`};
  ${p => p.spacingBottomXS && css`padding-bottom: ${p.theme.spacingXS}`};
  ${p => p.spacingTopXS && css`padding-top: ${p.theme.spacingXS}`};

  ${p => p.spacingLeftS && css`padding-left: ${p.theme.spacingS}`};
  ${p => p.spacingRightS && css`padding-right: ${p.theme.spacingS}`};
  ${p => p.spacingBottomS && css`padding-bottom: ${p.theme.spacingS}`};
  ${p => p.spacingTopS && css`padding-top: ${p.theme.spacingS}`};

  ${p => p.spacingLeftM && css`padding-left: ${p.theme.spacingM}`};
  ${p => p.spacingRightM && css`padding-right: ${p.theme.spacingM}`};
  ${p => p.spacingBottomM && css`padding-bottom: ${p.theme.spacingM}`};
  ${p => p.spacingTopM && css`padding-top: ${p.theme.spacingM}`};

  ${p => p.spacingLeftL && css`padding-left: ${p.theme.spacingL}`};
  ${p => p.spacingRightL && css`padding-right: ${p.theme.spacingL}`};
  ${p => p.spacingBottomL && css`padding-bottom: ${p.theme.spacingL}`};
  ${p => p.spacingTopL && css`padding-top: ${p.theme.spacingL}`};

  ${p => p.spacingLeftXL && css`padding-left: ${p.theme.spacingXL}`};
  ${p => p.spacingRightXL && css`padding-right: ${p.theme.spacingXL}`};
  ${p => p.spacingBottomXL && css`padding-bottom: ${p.theme.spacingXL}`};
  ${p => p.spacingTopXL && css`padding-top: ${p.theme.spacingXL}`};
`