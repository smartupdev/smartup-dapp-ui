import styled, { css } from 'styled-components'

export const fontSizeCss = css`
  font-size: ${p => p.theme.fontSizeM};
  ${props => props.XS && css`font-size: ${p => p.theme.fontSizeXS}`}
  ${props => props.S && css`font-size: ${p => p.theme.fontSizeS}`}
  ${props => props.M && css`font-size: ${p => p.theme.fontSizeM}`}
  ${props => props.L && css`font-size: ${p => p.theme.fontSizeL}`}
  ${props => props.XL && css`font-size: ${p => p.theme.fontSizeXL}`}
`

export const fontCss = css`
  font-family: 'Quicksand', sans-serif;
  ${fontSizeCss}
`

export const A = styled.a`
  ${fontCss}
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
  ${p => p.inline && css`display: inline`};
  ${p => p.lineHeight && css`line-height: 1.5`};

  ${p => p.right && css`text-align: right`};
  ${p => p.center && css`text-align: center`};

  ${p => p.wordSpaceL && css`letter-spacing: ${p => p.theme.fontSpacingL}`}
  ${p => p.wordSpaceM && css`letter-spacing: ${p => p.theme.fontSpacingM}`}
  ${p => p.wordSpaceS && css`letter-spacing: ${p => p.theme.fontSpacingS}`}

  ${p => p.spaceH && css`padding-right: ${p.spaceH}; padding-left: ${p.spaceH}`}
  ${p => p.spaceV && css`padding-top: ${p.theme.spacingXS}; padding-bottom: ${p.theme.spacingXS}`}
  ${p => p.spaceBottom && css`padding-bottom: ${p.theme.spacingXS}`}
  ${p => p.inlineSpace && css`padding-right: ${p => p.theme.fontSizeS};`}
  ${p => p.note && css`color: ${p => p.theme.colorSecondary}`}
  ${p => p.price && css`color: ${p => p.theme.colorPrice}`}
  ${p => p.primary && css`color: ${p => p.theme.colorPrimary}`}
  
  ${p => p.bold && css`font-weight: bold`}
  ${p => p.underline && css`text-decoration: underline;`}
  ${p => p.nowrap && css`white-space: nowrap;`}
  ${p => p.textOverflow && css`
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis;
    width: 100%;
  `}

  ${p => p.red && css`color: ${p.theme.red}`};
  ${p => p.green && css`color: ${p.theme.green}`};

  ${p => p.error && css`
    color: ${p.theme.red};
    font-size: ${p.theme.fontSizeXS};
    // position: absolute;
    // bottom: -20px;

    // white-space: nowrap; 

    :before {
      content: "!";
      font-size: calc( ${p.theme.fontSizeXS} * .8 );
      border-radius: 8px;
      border: 1px solid;
      padding-left: 5px;
      padding-right: 5px;
      margin-right: 4px;
    }    
  `}
  ${p => p.onClick && css`cursor: pointer`}

  ${fontCss}
  `
export default Text