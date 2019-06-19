import {
  MARKET_DETAIL_RESET,
  MARKET_ADD_SAVED_MARKET, MARKET_DEL_SAVED_MARKET,
  POST_ADD_SUCCEEDED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
  USER_NOTIFICATION_LIST_SUCCEEDED,
} from '../actions/actionTypes';

import { marketMassage } from '../integrator/massager'

export const initialState = {

  marketName: null,
  marketDesc: null,

  currentMarket: null,
  currentMarketId: null,
  gettingMarket: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_NOTIFICATION_LIST_SUCCEEDED: {
      const { marketIndex, list } = action.payload
      return marketIndex >= 0 && list[marketIndex].type === 'MarketCreateFinish' && list[marketIndex].content.isSuccess ?
        {
          ...state,
          currentMarket: {
            ...state.currentMarket,
            address: action.payload.content.marketAddress,
            marketAddress: action.payload.content.marketAddress,
          }
        } 
      : state
    }
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

    case MARKET_ADD_SAVED_MARKET: 
      if(state.currentMarket && state.currentMarket.id === action.payload.id) {
        return {
          ...state,
          currentMarket: {
            ...state.currentMarket,
            following: true
          },
        }
      }
      return state
    case MARKET_DEL_SAVED_MARKET: 
      if(state.currentMarket && state.currentMarket.id === action.payload.id) {
        return {
          ...state,
          currentMarket: {
            ...state.currentMarket,
            following: false
          },
        }
      }
      return state
    default:
      return state;
  }
}