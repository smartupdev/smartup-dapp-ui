import theme from './reducers/theme';
import user from './reducers/user';
import home from './reducers/home';
import matemask from './reducers/matemask';
import eth from './reducers/eth';
import ipfs from './reducers/ipfs';
import bigchain from './reducers/bigchain';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    theme,
    user,
    home,
    matemask,
    eth,
    ipfs,
    bigchain,
    router: routerReducer
});