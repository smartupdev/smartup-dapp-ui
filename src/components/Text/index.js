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