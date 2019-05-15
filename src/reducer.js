import user from './reducers/user';
import home from './reducers/home';
import market from './reducers/market';
import proposal from './reducers/proposal';
import general from './reducers/general';
import post from './reducers/post';
import notification from './reducers/notification';
import createMarket from './reducers/createMarket';
import panel from './reducers/panel';
import trade from './reducers/trade';

import globalInfo from './reducers/globalInfo'
import userMarketWallet from './reducers/userMarketWallet'
import userTransaction from './reducers/userTransaction'
import userCreatedMarket from './reducers/userCreatedMarket'
import userSavedMarket from './reducers/userSavedMarket'
import userSavedMarketPanel from './reducers/userSavedMarketPanel';
import userTradedMarket from './reducers/userTradedMarket'
import userCreatedPost from './reducers/userCreatedPost'
import userSavedPost from './reducers/userSavedPost'
import userCreatedReply from './reducers/userCreatedReply'
import userSavedReply from './reducers/userSavedReply'

import { combineReducers } from 'redux';

export default combineReducers({
    globalInfo,
    userMarketWallet,
    userTransaction,
    userCreatedMarket,
    userSavedMarket,
    userSavedMarketPanel,
    userTradedMarket,
    userCreatedPost,
    userSavedPost,
    userCreatedReply,
    userSavedReply,

    user,
    home,
    market,
    proposal,
    general,
    post,
    notification,
    createMarket,
    trade,
    panel,
});