import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../Text'
import Image from '../Image'

const Button = styled.button`
  background-color: transparent
  border: 0;
  color: ${p => p.theme.white}
  border-radius: ${p => p.theme.borderRadius}
  padding: ${p => p.theme.spacingXXS} ${p => p.theme.spacingXS}
  display: flex;
  cursor: pointer;
  ${p => p.verticalMargin && css`margin-top: ${p.theme.spacingXS}; margin-bottom: ${p.theme.spacingXS}`}  
  ${p => p.primary && css`background-color: ${p.theme.colorPrimary}; color: ${p.theme.colorDark}`}  
  ${p => p.primary && p.outline && css`background-color: transparent; color: ${p.theme.colorPrimary}; border: 1px solid ${p.theme.colorPrimary}`}  
`

export default ({ label, icon, primary, outline, verticalMargin, ...rest }) => {
  return (
    <Button primary={primary} outline={outline} verticalMargin={verticalMargin} {...rest}>
      { icon && <Image source={icon} XS rightText />}
      <Text>{label}</Text>
    </Button>
  )
}
