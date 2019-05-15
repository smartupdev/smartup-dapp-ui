import {
  // TODO: Reset
  USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
} from '../actions/actionTypes';

import { marketMassage, updateLoadMore } from '../integrator/massager'

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
    case USER_MARKET_TRADED_REQUESTED:
      return {
        ...state,
        getting: true,
      }
    case USER_MARKET_TRADED_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload
      return {
        ...state,
        tradedMarkets: updateLoadMore(state.tradedMarkets, list.map(marketMassage), action.meta.isLoadMore),
        getting: false,
        pageNumb,
        hasNextPage,
        error: initialState.error,
      }
    }
    case USER_MARKET_TRADED_FAIL:
      return {
        ...state,
        getting: false,
        error: action.payload,
      }
    default:
      return state;
  }
};