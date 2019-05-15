import {
  MARKET_DETAIL_RESET,
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
  USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
  USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
  // TRADE_SUCCEEDED,
  POST_ADD_SUCCEEDED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
} from '../actions/actionTypes';

import { changeArrayById } from '../lib/util/reducerHelper'
import { marketMassage } from '../integrator/massager'

export const initialState = {

  marketName: null,
  marketDesc: null,
  createMarketHash: null,
  creatingMarket: false,
  createMarketError: null,

  markets: [],
  gettingMarketList: false,
  marketListError: null,
  totalResults: 0,
  pageSize: 10,
  pageNumb: 1,
  hasNextPage: true,

  addingCollect: false,
  addCollectError: null,

  delingCollect: false,
  delCollectError: null,

  currentMarket: null,
  currentMarketId: null,
  gettingMarket: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DETAIL_RESET:
      return {
        ...state,
        currentMarket: initialState.currentMarket,
        currentMarketId: initialState.currentMarketId,
        gettingMarket: initialState.gettingMarket,      
      }
    case POST_ADD_SUCCEEDED:
      return {
        ...state,
        currentMarket: {
          ...state.currentMarket,
          numberOfComments: state.currentMarket.numberOfComments + 1
        }
      }
    case GET_MARKET_DETAIL_REQUESTED:
      return {
        ...state,
        currentMarketId: action.meta.marketId,
        gettingMarket: true
      }
    case GET_MARKET_DETAIL_SUCCEEDED:
      return {
        ...state,
        currentMarket: marketMassage(action.payload),
        gettingMarket: false
      }
    case GET_MARKET_DETAIL_FAILED:
      return {
        ...state,
        gettingMarket: false
      }

    // case TRADE_SUCCEEDED: {
    //   const { id, username, userIcon, time, avg, ct, isSell } = action.payload
    //   const marketIndex = state.markets.findIndex(m => m.id === id)
    //   if (marketIndex < 0) return state
    //   return {
    //     ...state,
    //     markets: [
    //       ...state.markets.slice(0, marketIndex),
    //       {
    //         ...state.markets[marketIndex],
    //         transations: [
    //           {
    //             id: state.markets[marketIndex].transations.length + 100,
    //             type: isSell ? 'SELL' : 'BUY',
    //             username, userIcon,
    //             time, avg, ct
    //           },
    //           ...state.markets[marketIndex].transations
    //         ]
    //       },
    //       ...state.markets.slice(marketIndex + 1),
    //     ]
    //   }
    // }
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

    case USER_COLLECT_ADD_REQUESTED:
      return {
        ...state,
        addingCollect: true,
      };
    // TODO: Refactor
    case USER_COLLECT_ADD_SUCCEEDED: {
      return {
        ...state,
        markets: changeArrayById(state.markets, action.payload.id, r => ({ following: true })),
        currentMarket: {
          ...state.currentMarket,
          following: true
        },
        addingCollect: false,
        addCollectError: initialState.addCollectError,
      };
    }
    case USER_COLLECT_ADD_FAILED:
      return {
        ...state,
        addingCollect: false,
        addCollectError: action.payload,
      };
    case USER_COLLECT_DEL_REQUESTED:
      return {
        ...state,
        addingCollect: true,
      };
    case USER_COLLECT_DEL_SUCCEEDED: {
      return {
        ...state,
        markets: changeArrayById(state.markets, action.payload.id, r => ({ following: false })),
        currentMarket: {
          ...state.currentMarket,
          following: false
        },
        delingCollect: false,
        delCollectError: initialState.delCollectError,
      };
    }
    case USER_COLLECT_DEL_FAILED:
      return {
        ...state,
        delingCollect: false,
        delCollectError: action.payload,
      };

    default:
      return state;
  }
}