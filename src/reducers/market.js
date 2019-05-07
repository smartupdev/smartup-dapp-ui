import {
  MARKET_DETAIL_RESET,
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
  CT_ACCOUNT_IN_MARKET_REQUESTED, CT_ACCOUNT_IN_MARKET_SUCCEEDED, CT_ACCOUNT_IN_MARKET_FAILED,
  GET_MARKET_GLOBAL_REQUESTED, GET_MARKET_GLOBAL_SUCCEEDED, GET_MARKET_GLOBAL_FAILED,
  USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
  USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
  TRADE_SUCCEEDED,
  POST_ADD_SUCCEEDED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
} from '../actions/actionTypes';

import { ipfsHost } from '../actions/ipfs'
import { changeArrayById } from '../lib/util/reducerHelper'

export function marketMassage(m) {
  return {
    ...m,
    ...m.data,
    id: m.marketId,
    address: m.marketAddress,
    cover: m.cover && (ipfsHost + m.cover),
    avatar: m.photo,
    numberOfComments: m.data ? m.data.postCount || 0 : '-',
    numberOfSub: m.data ? m.data.userCount || 0 : '-',
    lately_volume: m.data && m.data.latelyVolume,
    lately_change: m.data && m.data.latelyChange,
    priceIn7d: m.sevenDayNode,
    following: m.isCollected,
    overview: m.description,
    icon: null,
  }
}

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

  ctInMarket: [],
  gettingCtInMarket: false,
  ctInMarketError: null,
  ctInMarketPageSize: 10,
  ctInMarketPageNumb: 0,
  ctInMarketHasNextPage: true,

  marketGlobal: {},
  gettingMarketGlobal: false,
  marketGlobalError: null,

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

    case CT_ACCOUNT_IN_MARKET_REQUESTED:
      return {
        ...state,
        gettingCtInMarket: true,
      };
    case CT_ACCOUNT_IN_MARKET_SUCCEEDED: {
      const { list, pageNumb, pageSize, hasNextPage } = action.payload
      const ctList = list.map(c => ({ ...c, id: c.marketId }))
      return {
        ...state,
        gettingCtInMarket: false,
        ctInMarketError: initialState.ctInMarketError,
        ctInMarket: action.meta.isLoadMore ? [...state.ctInMarket, ...ctList] : ctList,
        ctInMarketPageNumb: pageNumb,
        ctInMarketPageSize: pageSize,
        ctInMarketHasNextPage: hasNextPage,
      };
    }
    case CT_ACCOUNT_IN_MARKET_FAILED:
      return {
        ...state,
        gettingCtInMarket: false,
        ctInMarketError: action.payload,
      };
    case GET_MARKET_GLOBAL_REQUESTED:
      return {
        ...state,
        gettingMarketGlobal: true,
      };
    case GET_MARKET_GLOBAL_SUCCEEDED:
      return {
        ...state,
        marketGlobal: action.payload,
        gettingMarketGlobal: false,
        marketGlobalError: initialState.marketGlobalError
      };
    case GET_MARKET_GLOBAL_FAILED:
      return {
        ...state,
        gettingMarketGlobal: false,
        marketGlobalError: action.payload,
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