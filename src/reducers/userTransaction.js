import {
  USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
} from '../actions/actionTypes';

import { updateLoadMore } from '../integrator/massager'

export const initialState = {
  transactions: [],
  getting: false,
  error: null,
  pageSize: 10,
  pageNumb: 1,
  hasNextPage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_TRANSACTION_LIST_REQUESTED:
      return {
        ...state,
        getting: true,
      }
    case USER_TRANSACTION_LIST_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload;
      return {
        ...state,
        transactions: updateLoadMore(state.transactions, list, action.meta.isLoadMore, 'txHash'),
        getting: false,
        pageNumb,
        hasNextPage,
        error: initialState.error,
      }
    }
    case USER_TRANSACTION_LIST_FAIL:
      return {
        ...state,
        getting: false,
        error: action.payload,
      }
    default:
      return state;
  }
};