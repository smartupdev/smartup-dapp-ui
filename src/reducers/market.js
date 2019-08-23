import {
  MARKET_DETAIL_RESET,
  MARKET_ADD_SAVED_MARKET, MARKET_DEL_SAVED_MARKET,
  POST_ADD_SUCCEEDED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
  USER_NOTIFICATION_LIST_SUCCEEDED,
  MARKET_DETAIL_GET_CT_SUCCEEDED,
} from '../actions/actionTypes';

import { marketMassage } from '../integrator/massager'

export const initialState = {
  id: null,
  getting: true, // only show after getting done
  error: null,
  // lots of market details will be added to this store
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DETAIL_RESET:
      return initialState
    case USER_NOTIFICATION_LIST_SUCCEEDED: {
      const { marketIndex, list } = action.payload
      const { type, content: {isSuccess, marketAddress} } = list[marketIndex]
      return marketIndex >= 0 && type === 'MarketCreateFinish' && isSuccess ?
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