import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store';
import App from './containers/App';
import './index.css'
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from './components/Theme'
import { LangProvider } from './language'
import theme from './theme'

import { ToastProvider } from 'react-toast-notifications';

const Index = () => 
  <Provider store={store}>
    <Router>
      <LangProvider>
        <ThemeProvider defaultTheme={theme}>
          <ToastProvider autoDismissTimeout={3000}>
            <App />
          </ToastProvider>
        </ThemeProvider>
      </LangProvider>
    </Router>
  </Provider>

ReactDOM.render(<Index />, document.getElementById('root'));
