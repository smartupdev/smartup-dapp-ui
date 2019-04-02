import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../Text'
import Image from '../Image'

const Button = styled.button`
  background-color: transparent
  border: 0;
  color: ${p => p.theme.white}
  fill: ${p => p.theme.white}
  border-radius: ${p => p.condensed ? '2px' : p.theme.borderRadius}
  padding: ${p => p.condensed ? '2px' : p.theme.spacingXXS} ${p => p.theme.spacingXS}
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${p => p.verticalMargin && css`margin-top: ${p.theme.spacingXS}; margin-bottom: ${p.theme.spacingXS}`}  
  ${p => p.primary && css`background-color: ${p.theme.colorPrimary}; color: ${p.theme.colorDark}; fill: ${p.theme.colorDark};`}  
  ${p => p.light && css`color: ${p.theme.white}; fill: ${p.theme.white};`}  
  ${p => p.primary && p.outline && css`background-color: transparent; color: ${p.theme.colorPrimary}; border: 1px solid ${p.theme.colorPrimary}`}  
`

export default ({ label, icon: Icon, primary, light, condensed, outline, verticalMargin, ...rest }) => {
  return (
    <Button primary={primary} light={light} condensed={condensed} outline={outline} verticalMargin={verticalMargin} {...rest}>
      { Icon && <Icon XS rightText={!!label} />}
      { label && <Text>{label}</Text>}
    </Button>
  )
}
