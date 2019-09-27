import {
  MARKET_DETAIL_RESET,
  MARKET_ADD_SAVED_MARKET, MARKET_DEL_SAVED_MARKET,
  POST_ADD_SUCCEEDED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
  TRADE_HIGH_LOW_REQUESTED, TRADE_HIGH_LOW_SUCCEEDED, TRADE_HIGH_LOW_FAILED,
  USER_NOTIFICATION_LIST_SUCCEEDED,
  MARKET_DETAIL_GET_CT_SUCCEEDED,
  TRADE_SUCCEEDED,
} from '../actions/actionTypes';

import { marketMassage } from '../integrator/massager'

export const initialState = {
  id: null,
  getting: true, // only show after getting done
  error: null,
  userCt: null,
  details: {}
  // lots of market details will be added to this store
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DETAIL_RESET:
      return initialState
    // case TRADE_HIGH_LOW_REQUESTED:
    //   return {
    //     ...state,
    //     getting: true,
    //     error: initialState.error
    //   }
    case TRADE_HIGH_LOW_SUCCEEDED:
      return {
        ...state,
        details: action.payload[0] || {}
      }
    // case TRADE_HIGH_LOW_FAILED:
    //   return {
    //     ...state,
    //     getting: false,
    //     error: action.payload
    //   }
    case TRADE_SUCCEEDED: 
      if(action.meta.stage !== 1) return state
      return {
        ...state,
        ctRest: state.ctRest - action.payload.entrustVolume
      }
    case USER_NOTIFICATION_LIST_SUCCEEDED: {
      const { marketIndex, list } = action.payload
      if(marketIndex < 0) return state
      const { type, content: {isSuccess, marketAddress} } = list[marketIndex]
      return !state.marketAddress && type === 'MarketCreateFinish' && isSuccess ?
        {
          ...state,
          address: marketAddress,
          marketAddress
        } 
      : state
    }
    case MARKET_DETAIL_GET_CT_SUCCEEDED: 
      return {
        ...state,
        userCt: +action.payload
      }
    case POST_ADD_SUCCEEDED:
      return {
        ...state,
        numberOfComments: state.numberOfComments + 1
      }
    case GET_MARKET_DETAIL_REQUESTED:
      return {
        ...state,
        id: action.meta.marketId,
        // getting: true,
        error: initialState.error
      }
    case GET_MARKET_DETAIL_SUCCEEDED:
      return {
        ...state,
        ...marketMassage(action.payload),
        getting: false,
        error: initialState.error,
      }
    case GET_MARKET_DETAIL_FAILED:
      return {
        ...state,
        getting: false,
        error: action.payload
      }

    case MARKET_ADD_SAVED_MARKET: 
      if(state.id === action.payload.id) {
        return {
          ...state,
          following: true
        }
      }
      return state
    case MARKET_DEL_SAVED_MARKET: 
      if(state.id === action.payload.id) {
        return {
          ...state,
          following: false
        }
      }
      return state
    default:
      return state;
  }
}