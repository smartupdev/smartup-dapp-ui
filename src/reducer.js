import theme from './reducers/theme';
import user from './reducers/user';
import home from './reducers/home';
import market from './reducers/market'
import panel from './reducers/panel';
import eth from './reducers/eth';
import ipfs from './reducers/ipfs';
import bigchain from './reducers/bigchain';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    theme,
    user,
    home,
    market,
    panel,
    eth,
    ipfs,
    bigchain,
    router: routerReducer
});