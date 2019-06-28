import React from 'react'
import styled, { css } from 'styled-components'
import { spacingCss, onClickCss } from '../Theme'
import Text from '../Text'

const Button = styled.button`
  background-color: transparent
  border: 0;
  color: ${p => p.theme.white}
  fill: ${p => p.theme.white}
  min-height: fit-content;
  ${p => p.width && css`width: ${p.width}`}
  border-radius: ${p => p.theme.borderRadius}
  padding: ${p => p.theme.spacingXXS} ${p => p.theme.spacingXS}
  ${p => p.condensed && css`padding: 2px ${p => p.theme.spacingXS}; border-radius: 2px;`}
  // ${p => p.extended && css`padding: ${p.theme.spacingXXS} ${p.theme.spacingL};`}
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${p => p.verticalMargin && css`margin-top: ${p.theme.spacingXS}; margin-bottom: ${p.theme.spacingXS}`}  
  ${p => p.primary && css`background-color: ${p.theme.colorPrimary}; color: ${p.theme.colorDark}; fill: ${p.theme.colorDark};`}  
  ${p => p.light && css`color: ${p.theme.white}; fill: ${p.theme.white};`}  
  ${p => p.primary && p.outline && css`background-color: transparent; color: ${p.theme.colorPrimary}; border: 1px solid ${p.theme.colorPrimary}`}  
  
  ${p => p.backgroundColor && css`background-color: ${p.backgroundColor};`}  
  ${p => p.color && css`color: ${p.color}; fill: ${p.color}; border: 1px solid ${p.color}`}  
  :disabled {
    opacity: .5;
  }
  ${spacingCss}
  ${onClickCss}
`

export default ({ label, icon: Icon, primary, light, condensed, extended, outline, verticalMargin, iconSize, ...rest }) => {
  return (
    <Button primary={primary} light={light} condensed={condensed} VBase={extended} HL={extended} outline={outline} verticalMargin={verticalMargin} {...rest}>
      { Icon && <Icon XS RightBase={label !== null && label !== undefined} size={iconSize} />}
      { label && <Text nowrap>{label}</Text>}
    </Button>
  )
}
