import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store, history} from './store';
import App from './containers/App';
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from './components/Theme'
import theme from './theme'


const Index = () =>
  <Router>
    <ThemeProvider defaultTheme={theme}>
      <App />
    </ThemeProvider>
  </Router>

ReactDOM.render(<Index />, document.getElementById('root'));

