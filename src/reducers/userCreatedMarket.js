import {
  USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
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
    case USER_MARKET_CREATED_REQUESTED:
      return {
        ...state,
        getting: true,
      }
    case USER_MARKET_CREATED_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload
      return {
        ...state,
        markets: updateLoadMore(state.markets, list.map(marketMassage), action.meta.isLoadMore),
        getting: false,
        pageNumb,
        hasNextPage,
        error: initialState.error,
      }
    }
    case USER_MARKET_CREATED_FAIL:
      return {
        ...state,
        getting: false,
        error: action.payload,
      }

    default:
      return state;
  }
};