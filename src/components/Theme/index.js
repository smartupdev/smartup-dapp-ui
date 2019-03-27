import React from 'react'
import cmTheme from './defaultTheme'
import { ThemeProvider as Provider } from 'styled-components'

export const ThemeProvider = ({defaultTheme = cmTheme, children}) => {
  return (
    <Provider theme={defaultTheme}>
      {children}
    </Provider>
  );
}
