import React from 'react'
import { withToastManager } from 'react-toast-notifications'

export function withToast(Component) {
  return withToastManager(
    ({toastManager, ...props}) => 
      <Component {...props} addToast={
        (text) => toastManager.add(text, {appearance: 'info', autoDismiss: true})
      } />
  )
}