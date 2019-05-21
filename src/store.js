import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
// import { createLogger } from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

export const store = createStore(reducer, applyMiddleware(thunk));
