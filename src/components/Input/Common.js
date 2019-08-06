import React from 'react'
import Text from '../Text'

export function Label({children}) {
  return children ?  <Text S VXS>{children}</Text> : null
}

export function InputWrapper({ label, error, description, children }) {
  return (
    <>
      <Label>{label}</Label>
      {children}
      <Text error={error} right S>{error || description}</Text>
    </>
  )
}