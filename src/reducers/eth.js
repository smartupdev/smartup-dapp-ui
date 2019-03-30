import {
    ETH_SUT_BALANCE, ETH_CREATE_MARKET, ETH_GET_MARKET_BY_INDEX,
    ETH_SET_MARKET_ADDRESS, ETH_GET_CT_BALANCE, ETH_IS_TRADE_ENABLE,
    ETH_GET_MARKET_CREATOR, ETH_GET_Total_SUT, ETH_BID_QUOTE,
    ETH_ASK_QUOTE,
} from '../constants/actionTypes';

export const initialState = {
    sutBalance: null,
    createMarketHash: null,
    indexMarketHash: null,
    setMarketAddress: null,
    ctBalance: null,
    isTradeEnabled: false,
    totalSut: null,
    bidQuote: null,
    askQuote: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ETH_SUT_BALANCE:
            return Object.assign({}, state, { sutBalance: action.sutBalance });
        case ETH_CREATE_MARKET:
            return Object.assign({}, state, { createMarketHash: action.createMarketHash });
        case ETH_GET_MARKET_BY_INDEX:
            return Object.assign({}, state, { indexMarketHash: action.indexMarketHash });
        case ETH_SET_MARKET_ADDRESS:
            return Object.assign({}, state, { setMarketAddress: action.setMarketAddress });
        case ETH_GET_CT_BALANCE:
            return Object.assign({}, state, { ctBalance: action.ctBalance });
        case ETH_IS_TRADE_ENABLE:
            return Object.assign({}, state, { isTradeEnabled: action.isTradeEnabled });
        case ETH_GET_MARKET_CREATOR:
            return Object.assign({}, state, { createMarketHash: action.createMarketHash });
        case ETH_GET_Total_SUT:
            return Object.assign({}, state, { totalSut: action.totalSut });
        case ETH_BID_QUOTE:
            return Object.assign({}, state, { bidQuote: action.bidQuote });
        case ETH_ASK_QUOTE:
            return Object.assign({}, state, { ETH_ASK_QUOTE: action.ETH_ASK_QUOTE });
        default:
            return state;
    }
};