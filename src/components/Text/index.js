import React, {useContext} from 'react'

import { useStateValue, StateContext } from '../../store';

export const Text2 = () => {
  console.log('Text2')
  return (
    <div>I am text2</div>
  )
}


export const Text = () => {
  const [s, dispatch] = useStateValue()
  console.log(s,'Text')
  const theme = s.theme
  return (
    <div style={{ color: theme.primary }}>I am text</div>
  )
}

export const ThemedButton = () => {
  const [{ theme }, dispatch] = useStateValue()
  console.log('Button')
  return (
    <button
      style={{ backgroundColor: theme.primary }}
      onClick={() => dispatch({
        type: 'changeTheme',
        newTheme: 'blue'
      })}
    >
      Make me blue!
    </button>
  );
}