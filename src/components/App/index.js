import React from 'react'

import { ThemedButton, Text, Text2 } from '../Text'
import { StateProvider, cmProvider } from '../../store'

const App = () => {  
  console.log('App')
  return (
    <cmProvider>
      <div>
        <header>i am header</header>
        <div>123</div>
        <ThemedButton />
        <Text />
        <Text2 />
        <footer>i am footer</footer>
      </div>
    </cmProvider>
  );
}

export default App;
