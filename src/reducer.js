import createMarket from './reducers/createMarket'
import general from './reducers/general'
import home from './reducers/home'
import market from './reducers/market'
import notification from './reducers/notification'
import panel from './reducers/panel'
import post from './reducers/post'
import proposal from './reducers/proposal'
import proposalDetail from './reducers/proposalDetail'
import trade from './reducers/trade'
import user from './reducers/user'

import wallet from './reducers/wallet'

import kline from './reducers/kline'
import marketEditingSellOrder from './reducers/marketEditingSellOrder'
import marketUserOrder from './reducers/marketUserOrder'
import orderBook from './reducers/orderBook'
import globalInfo from './reducers/globalInfo'
import metamask from './reducers/metamask'
import userCreatedMarket from './reducers/userCreatedMarket'
import userCreatedPost from './reducers/userCreatedPost'
import userCreatedReply from './reducers/userCreatedReply'
import userMarketWallet from './reducers/userMarketWallet'
import userSavedMarket from './reducers/userSavedMarket'
import userSavedMarketPanel from './reducers/userSavedMarketPanel'
import userSavedPost from './reducers/userSavedPost'
import userSavedReply from './reducers/userSavedReply'
import userTradedMarket from './reducers/userTradedMarket'
import userTransaction from './reducers/userTransaction'

import { combineReducers } from 'redux';

export default combineReducers({
    kline,
    marketEditingSellOrder,
    marketUserOrder,
    orderBook,
    globalInfo,
    metamask,
    userCreatedMarket,
    userCreatedPost,
    userCreatedReply,
    userMarketWallet,
    userSavedMarket,
    userSavedMarketPanel,
    userSavedPost,
    userSavedReply,
    userTradedMarket,
    userTransaction,

    user,
    home,
    market,
    proposal,
    proposalDetail,
    general,
    post,
    notification,
    createMarket,
    trade,
    panel,

    wallet,
});