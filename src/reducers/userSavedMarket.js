import {
  MARKET_ADD_SAVED_MARKET, MARKET_DEL_SAVED_MARKET, 
  USER_MARKET_COLLECTED_REQUESTED, USER_MARKET_COLLECTED_SUCCEEDED, USER_MARKET_COLLECTED_FAIL,
} from '../actions/actionTypes';

import { marketMassage, updateLoadMore } from '../integrator/massager'
import { changeArrayById, addArrayById, removeArrayById } from '../lib/util/reducerHelper'

export const initialState = {
  markets: [],
  getting: false,
  error: null,
  pageSize: 10,
  pageNumb: 1,
  hasNextPage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_ADD_SAVED_MARKET: 
      return {
        ...state,
        markets: addArrayById(state.markets, action.payload.id, action.payload)
      }
    case MARKET_DEL_SAVED_MARKET: 
      return {
        ...state,
        markets: removeArrayById(state.markets, action.payload.id)
      }

    case USER_MARKET_COLLECTED_REQUESTED:
      return {
        ...state,
        getting: true
      }
    case USER_MARKET_COLLECTED_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload;
      return {
        ...state,
        getting: false,
        error: initialState.error,
        pageNumb,
        hasNextPage,
        markets: updateLoadMore(state.markets, list.map(marketMassage), action.meta.isLoadMore),
      }
    }
    case USER_MARKET_COLLECTED_FAIL:
      return {
        ...state,
        getting: false,
        error: action.payload
      }
    default:
      return state;
  }
};