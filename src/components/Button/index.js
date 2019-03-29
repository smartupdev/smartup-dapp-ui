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
  ${p => p.primary && css`background-color: ${p.theme.colorPrimary}; color: ${p.theme.colorDark}`}  
`

export default ({ label, icon, ...rest }) => {
  return (
    <Button {...rest}>
      <Image source={icon} XS rightText />
      <Text>{label}</Text>
    </Button>
  )
}
