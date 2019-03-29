import React from 'react'
import styled, { css } from 'styled-components'

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  font-size: ${p => p.theme.fontSizeM};
  ${props => props.XS && css`font-size: ${p => p.theme.fontSizeXS}`}
  ${props => props.S && css`font-size: ${p => p.theme.fontSizeS}`}
  ${props => props.M && css`font-size: ${p => p.theme.fontSizeM}`}
  ${props => props.L && css`font-size: ${p => p.theme.fontSizeL}`}
  ${props => props.XL && css`font-size: ${p => p.theme.fontSizeXL}`}

  ${p => p.wordSpaceL && css`letter-spacing: ${p => p.theme.fontSpacingL}`}

  ${p => p.spaceH && css`padding-right: ${p.spaceH}; padding-left: ${p.spaceH}`}
  ${p => p.inlineSpace && css`padding-right: ${p => p.theme.fontSizeS};`}
  ${p => p.note && css`color: ${p => p.theme.colorSecondary}`}
  ${p => p.price && css`color: ${p => p.theme.colorPrice}`}
  ${p => p.primary && css`color: ${p => p.theme.colorPrimary}`}
`
export default Text