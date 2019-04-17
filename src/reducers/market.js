import {
  GET_MARKET_LIST, GET_MARKET_CREATED_LIST, GET_MARKET_DETAIL, CREATE_MARKET, BOOKMARK_MARKET,
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED, CREATE_MARKET_SMARTUP_SUCCEEDED,
  TRADE_SUCCEEDED
} from '../actions/actionTypes';
import { markets } from '../devData/marketDetail/'

export const initialState = {

  marketName: null,
  marketDesc: null,
  createMarketHash: null,
  creatingMarket: false,
  createMarketError: null,
  
  markets: markets,
  marketCreatedList: null,
  marketDetail: null,
  createMarketInfo: null,
  totalResults: 0,

  payload: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRADE_SUCCEEDED: {
      const { id, username, userIcon, time, avg, ct, isSell } = action.payload
      const marketIndex= state.markets.findIndex(m => m.id === id)
      if(marketIndex <0) return state
      return {
        ...state,
        markets: [
          ...state.markets.slice(0, marketIndex),
          {
            ...state.markets[marketIndex],
            transations: [
              { 
                id: state.markets[marketIndex].transations.length+100, 
                type: isSell ? 'SELL' : 'BUY', 
                username, userIcon,
                time, avg, ct },
              ...state.markets[marketIndex].transations
            ]
          },
          ...state.markets.slice(marketIndex+1),
        ]
      }
    }

    case CREATE_MARKET_PAY_REQUESTED:
      return {
        ...state,
        creatingMarket: true,
      };
    case CREATE_MARKET_PAY_SUCCEEDED:
      return {
        ...state,
        createMarketHash: action.payload,
        creatingMarket: false,
        createMarketError: initialState.loginError
      };
    case CREATE_MARKET_PAY_FAILED:
      return {
        ...state,
        creatingMarket: false,
        createMarketError: action.payload,
      };

    case GET_MARKET_LIST: {
      return Object.assign({}, state, {
        markets: action.payload.obj,
        totalResults: action.payload.obj.length,
        payload: action.payload,
      })
    }
    case GET_MARKET_CREATED_LIST: {
      let marketCreatedList =
        state.marketCreatedList.concat(action.payload.obj);
      return Object.assign({}, state, {
        marketCreatedList: marketCreatedList,
        payload: action.payload,
      })
    }
    case GET_MARKET_DETAIL: {
      return Object.assign({}, state, {
        marketDetail: action.payload.obj,
        payload: action.payload,
      })
    }
    case CREATE_MARKET: {
      return Object.assign({}, state, {
        createMarketInfo: action.payload.obj,
        payload: action.payload,
      })
    }
    case BOOKMARK_MARKET: {
      const { id } = action.recordData;
      const currentMarkets = state.markets;
      let tempMarkets = currentMarkets.map(market => market.id === id ? {
        ...market, following: !market.following
      } : market);
      return Object.assign({}, state, {
        markets: tempMarkets,
      })
    }
    case CREATE_MARKET_SMARTUP_SUCCEEDED: {
      return {
        ...state,
       markets: [
         ...state.markets,
         action.payload
       ] 
      }
    }

    default:
      return state;
  }
}