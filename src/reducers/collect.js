import {
  USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED
} from '../actions/actionTypes';
import { updateLoadMore } from '../lib/util/reducerHelper'
export const initialState = {
  collects: [],
  gettingCollects: false,
  collectsError: null,
  hasNextPage: true,
  pageSize: 20,
  pageNumb: 1,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_COLLECT_LIST_REQUESTED:
      return {
        ...state,
        gettingCollects: true,
      };
    case USER_COLLECT_LIST_SUCCEEDED:
      return {
        ...state,
        collects: updateLoadMore(state.collects, action.payload.list, action.meta.isLoadMore, 'marketId'),
        gettingCollects: false,
        hasNextPage: action.payload.hasNextPage,
        collectsError: initialState.collectsError,
      };
    case USER_COLLECT_LIST_FAILED:
      return {
        ...state,
        gettingCollects: false,
        collectsError: action.payload,
      };
    default:
      return state;
  }
};