import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

const getMiddleware = () => {
  return process.env.NODE_ENV === 'production' ?
    applyMiddleware(thunk)
    :
    composeWithDevTools(applyMiddleware(thunk
      // , createLogger()
      ))
};

export const store = createStore(reducer, getMiddleware());
