import theme from './reducers/theme';
import user from './reducers/user';
import home from './reducers/home';
import market from './reducers/market';
import collect from './reducers/collect';
import proposal from './reducers/proposal';
import general from './reducers/general';
import notification from './reducers/notification';
import createMarket from './reducers/createMarket';
import panel from './reducers/panel';
import trade from './reducers/trade';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    theme,
    user,
    home,
    market,
    collect,
    proposal,
    general,
    notification,
    createMarket,
    trade,
    panel,
    router: routerReducer
});