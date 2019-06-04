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

export const media = (...cssArray) => 
    css`
      ${cssArray[0]}
      ${p => p.theme.sizes.map((size, index) =>
        css`
          @media (min-width: ${size}px) {
            ${cssArray[index+1]}
          }
        `
      )}
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

export const onClickCss = css`
  ${p => p.onClick && css`cursor: pointer`};
  ${p => p.disabled && css`cursor: not-allowed;`}
`

export const spacingCss = css`
  ${p => (p.spacingBase || p.AllBase) && css`padding: ${p.theme.spacingBase}`};
  ${p => (p.spacingVBase || p.VBase) && css`padding-top: ${p.theme.spacingBase}; padding-bottom: ${p.theme.spacingBase};`}
  ${p => (p.spacingHBase || p.HBase) && css`padding-left: ${p.theme.spacingBase}; padding-right: ${p.theme.spacingBase};`}
  ${p => (p.spacingLeftBase || p.LeftBase) && css`padding-left: ${p.theme.spacingBase}`};
  ${p => (p.spacingRightBase || p.RightBase) && css`padding-right: ${p.theme.spacingBase}`};
  ${p => (p.spacingBottomBase || p.BottomBase) && css`padding-bottom: ${p.theme.spacingBase}`};
  ${p => (p.spacingTopBase || p.TopBase) && css`padding-top: ${p.theme.spacingBase}`};

  ${p => (p.spacingXS || p.AllXS) && css`padding: ${p.theme.spacingXS}`};
  ${p => (p.spacingVXS || p.VXS) && css`padding-top: ${p.theme.spacingXS}; padding-bottom: ${p.theme.spacingXS};`}
  ${p => (p.spacingHXS || p.HXS) && css`padding-left: ${p.theme.spacingXS}; padding-right: ${p.theme.spacingXS};`}
  ${p => (p.spacingLeftXS || p.LeftXS) && css`padding-left: ${p.theme.spacingXS}`};
  ${p => (p.spacingRightXS || p.RightXS) && css`padding-right: ${p.theme.spacingXS}`};
  ${p => (p.spacingBottomXS || p.BottomXS) && css`padding-bottom: ${p.theme.spacingXS}`};
  ${p => (p.spacingTopXS || p.TopXS) && css`padding-top: ${p.theme.spacingXS}`};

  ${p => (p.spacingS || p.AllS) && css`padding: ${p.theme.spacingS}`};
  ${p => (p.spacingVS || p.VS) && css`padding-top: ${p.theme.spacingS}; padding-bottom: ${p.theme.spacingS};`}
  ${p => (p.spacingHS || p.HS) && css`padding-left: ${p.theme.spacingS}; padding-right: ${p.theme.spacingS};`}
  ${p => (p.spacingLeftS || p.LeftS) && css`padding-left: ${p.theme.spacingS}`};
  ${p => (p.spacingRightS || p.RightS) && css`padding-right: ${p.theme.spacingS}`};
  ${p => (p.spacingBottomS || p.BottomS) && css`padding-bottom: ${p.theme.spacingS}`};
  ${p => (p.spacingTopS || p.TopS) && css`padding-top: ${p.theme.spacingS}`};

  ${p => (p.spacingM || p.AllM) && css`padding: ${p.theme.spacingM}`};
  ${p => (p.spacingVM || p.VM) && css`padding-top: ${p.theme.spacingM}; padding-bottom: ${p.theme.spacingM};`}
  ${p => (p.spacingHM || p.HM) && css`padding-left: ${p.theme.spacingM}; padding-right: ${p.theme.spacingM};`}
  ${p => (p.spacingLeftM || p.LeftM) && css`padding-left: ${p.theme.spacingM}`};
  ${p => (p.spacingRightM || p.RightM) && css`padding-right: ${p.theme.spacingM}`};
  ${p => (p.spacingBottomM || p.BottomM) && css`padding-bottom: ${p.theme.spacingM}`};
  ${p => (p.spacingTopM || p.TopM) && css`padding-top: ${p.theme.spacingM}`};

  ${p => (p.spacingL || p.AllL) && css`padding: ${p.theme.spacingL}`};
  ${p => (p.spacingVL || p.VL) && css`padding-top: ${p.theme.spacingL}; padding-bottom: ${p.theme.spacingL};`}
  ${p => (p.spacingHL || p.HL) && css`padding-left: ${p.theme.spacingL}; padding-right: ${p.theme.spacingL};`}
  ${p => (p.spacingLeftL || p.LeftL) && css`padding-left: ${p.theme.spacingL}`};
  ${p => (p.spacingRightL || p.RightL) && css`padding-right: ${p.theme.spacingL}`};
  ${p => (p.spacingBottomL || p.BottomL) && css`padding-bottom: ${p.theme.spacingL}`};
  ${p => (p.spacingTopL || p.TopL) && css`padding-top: ${p.theme.spacingL}`};
  
  ${p => (p.spacingXL || p.AllXL) && css`padding: ${p.theme.spacingXL}`};
  ${p => (p.spacingVXL || p.VXL) && css`padding-top: ${p.theme.spacingXL}; padding-bottom: ${p.theme.spacingXL};`}
  ${p => (p.spacingHXL || p.HXL) && css`padding-left: ${p.theme.spacingXL}; padding-right: ${p.theme.spacingXL};`}
  ${p => (p.spacingLeftXL || p.LeftXL) && css`padding-left: ${p.theme.spacingXL}`};
  ${p => (p.spacingRightXL || p.RightXL) && css`padding-right: ${p.theme.spacingXL}`};
  ${p => (p.spacingBottomXL || p.BottomXL) && css`padding-bottom: ${p.theme.spacingXL}`};
  ${p => (p.spacingTopXL || p.TopXL) && css`padding-top: ${p.theme.spacingXL}`};


  
  ${p => (p.spacingMarginBase || p.MarginAllBase) && css`margin: ${p.theme.spacingBase}`};
  ${p => (p.spacingMarginVBase || p.MarginVBase) && css`margin-top: ${p.theme.spacingBase}; margin-bottom: ${p.theme.spacingBase};`}
  ${p => (p.spacingMarginHBase || p.MarginHBase) && css`margin-left: ${p.theme.spacingBase}; margin-right: ${p.theme.spacingBase};`}
  ${p => (p.spacingMarginLeftBase || p.MarginLeftBase) && css`margin-left: ${p.theme.spacingBase}`};
  ${p => (p.spacingMarginRightBase || p.MarginRightBase) && css`margin-right: ${p.theme.spacingBase}`};
  ${p => (p.spacingMarginBottomBase || p.MarginBottomBase) && css`margin-bottom: ${p.theme.spacingBase}`};
  ${p => (p.spacingMarginTopBase || p.MarginTopBase) && css`margin-top: ${p.theme.spacingBase}`};

  ${p => (p.spacingMarginXS || p.MarginAllXS) && css`margin: ${p.theme.spacingXS}`};
  ${p => (p.spacingMarginVXS || p.MarginVXS) && css`margin-top: ${p.theme.spacingXS}; margin-bottom: ${p.theme.spacingXS};`}
  ${p => (p.spacingMarginHXS || p.MarginHXS) && css`margin-left: ${p.theme.spacingXS}; margin-right: ${p.theme.spacingXS};`}
  ${p => (p.spacingMarginLeftXS || p.MarginLeftXS) && css`margin-left: ${p.theme.spacingXS}`};
  ${p => (p.spacingMarginRightXS || p.MarginRightXS) && css`margin-right: ${p.theme.spacingXS}`};
  ${p => (p.spacingMarginBottomXS || p.MarginBottomXS) && css`margin-bottom: ${p.theme.spacingXS}`};
  ${p => (p.spacingMarginTopXS || p.MarginTopXS) && css`margin-top: ${p.theme.spacingXS}`};

  ${p => (p.spacingMarginS || p.MarginAllS) && css`margin: ${p.theme.spacingS}`};
  ${p => (p.spacingMarginVS || p.MarginVS) && css`margin-top: ${p.theme.spacingS}; margin-bottom: ${p.theme.spacingS};`}
  ${p => (p.spacingMarginHS || p.MarginHS) && css`margin-left: ${p.theme.spacingS}; margin-right: ${p.theme.spacingS};`}
  ${p => (p.spacingMarginLeftS || p.MarginLeftS) && css`margin-left: ${p.theme.spacingS}`};
  ${p => (p.spacingMarginRightS || p.MarginRightS) && css`margin-right: ${p.theme.spacingS}`};
  ${p => (p.spacingMarginBottomS || p.MarginBottomS) && css`margin-bottom: ${p.theme.spacingS}`};
  ${p => (p.spacingMarginTopS || p.MarginTopS) && css`margin-top: ${p.theme.spacingS}`};

  ${p => (p.spacingMarginM || p.MarginAllM) && css`margin: ${p.theme.spacingM}`};
  ${p => (p.spacingMarginVM || p.MarginVM) && css`margin-top: ${p.theme.spacingM}; margin-bottom: ${p.theme.spacingM};`}
  ${p => (p.spacingMarginHM || p.MarginHM) && css`margin-left: ${p.theme.spacingM}; margin-right: ${p.theme.spacingM};`}
  ${p => (p.spacingMarginLeftM || p.MarginLeftM) && css`margin-left: ${p.theme.spacingM}`};
  ${p => (p.spacingMarginRightM || p.MarginRightM) && css`margin-right: ${p.theme.spacingM}`};
  ${p => (p.spacingMarginBottomM || p.MarginBottomM) && css`margin-bottom: ${p.theme.spacingM}`};
  ${p => (p.spacingMarginTopM || p.MarginTopM) && css`margin-top: ${p.theme.spacingM}`};

  ${p => (p.spacingMarginL || p.MarginAllL) && css`margin: ${p.theme.spacingL}`};
  ${p => (p.spacingMarginVL || p.MarginVL) && css`margin-top: ${p.theme.spacingL}; margin-bottom: ${p.theme.spacingL};`}
  ${p => (p.spacingMarginHL || p.MarginHL) && css`margin-left: ${p.theme.spacingL}; margin-right: ${p.theme.spacingL};`}
  ${p => (p.spacingMarginLeftL || p.MarginLeftL) && css`margin-left: ${p.theme.spacingL}`};
  ${p => (p.spacingMarginRightL || p.MarginRightL) && css`margin-right: ${p.theme.spacingL}`};
  ${p => (p.spacingMarginBottomL || p.MarginBottomL) && css`margin-bottom: ${p.theme.spacingL}`};
  ${p => (p.spacingMarginTopL || p.MarginTopL) && css`margin-top: ${p.theme.spacingL}`};
  
  ${p => (p.spacingMarginXL || p.MarginAllXL) && css`margin: ${p.theme.spacingXL}`};
  ${p => (p.spacingMarginVXL || p.MarginVXL) && css`margin-top: ${p.theme.spacingXL}; margin-bottom: ${p.theme.spacingXL};`}
  ${p => (p.spacingMarginHXL || p.MarginHXL) && css`margin-left: ${p.theme.spacingXL}; margin-right: ${p.theme.spacingXL};`}
  ${p => (p.spacingMarginLeftXL || p.MarginLeftXL) && css`margin-left: ${p.theme.spacingXL}`};
  ${p => (p.spacingMarginRightXL || p.MarginRightXL) && css`margin-right: ${p.theme.spacingXL}`};
  ${p => (p.spacingMarginBottomXL || p.MarginBottomXL) && css`margin-bottom: ${p.theme.spacingXL}`};
  ${p => (p.spacingMarginTopXL || p.MarginTopXL) && css`margin-top: ${p.theme.spacingXL}`};
`