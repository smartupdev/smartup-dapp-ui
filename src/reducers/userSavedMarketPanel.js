import {
  USER_MARKET_COLLECTED_PANEL_REQUESTED, USER_MARKET_COLLECTED_PANEL_SUCCEEDED, USER_MARKET_COLLECTED_PANEL_FAIL
} from '../actions/actionTypes';
import { marketMassage, updateLoadMore } from '../integrator/massager'

export const initialState = {
  markets: [],
  getting: false,
  error: null,
  hasNextPage: true,
  pageSize: 20,
  pageNumb: 1,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_MARKET_COLLECTED_PANEL_REQUESTED:
      return {
        ...state,
        getting: true,
      };
    case USER_MARKET_COLLECTED_PANEL_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload;
      return {
        ...state,
        getting: false,
        error: initialState.error,
        pageNumb,
        hasNextPage,
        markets: updateLoadMore(state.markets, list.map(marketMassage), action.meta.isLoadMore),
      };
    }
    case USER_MARKET_COLLECTED_PANEL_FAIL:
      return {
        ...state,
        getting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};