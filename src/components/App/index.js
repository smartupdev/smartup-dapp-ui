import React from 'react'
import { ThemedButton, Text, Text2 } from '../Text'
import Home from '../home';
import About from '../about';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';

const App = () => {  
  console.log('App')
  return (
      <Router>
        <div>
          <header>i am header</header>
          <div>123</div>
          <ThemedButton />
          <Text />
          <Text2 />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>
          <footer>i am footer</footer>
        </div>
      </Router>
  );
}

export default App;
