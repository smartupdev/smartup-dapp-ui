import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import thunk from 'redux-thunk';


import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, thunk);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, thunk, createLogger())
    }
};

export const store = createStore(
    reducer, composeWithDevTools(getMiddleware()));
