import React from 'react'
import styled, { css } from 'styled-components'
import theme from '../../theme';

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  font-size: ${theme.fontSizeM};
  ${props => props.XS && css`font-size: ${theme.fontSizeXS}`}
  ${props => props.S && css`font-size: ${theme.fontSizeS}`}
  ${props => props.M && css`font-size: ${theme.fontSizeM}`}
  ${props => props.L && css`font-size: ${theme.fontSizeL}`}
  ${props => props.XL && css`font-size: ${theme.fontSizeXL}`}
`

export const Header = styled(Text)`
  
`
export const Title = styled(Text)`

`
export const P = styled(Text)`

`
export const H1 = styled(Text)`

`
export const Note = styled(Text)`

`
export default Text