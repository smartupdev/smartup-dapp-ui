import { 
  MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED, MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED, MARKET_GET_TRADED_MARKET_WITH_CT_FAILED,
  TRADE_SUCCEEDED,
} from '../actions/actionTypes'

import { updateLoadMore } from '../integrator/massager'
import { changeArrayById } from '../lib/util/reducerHelper'

export const initialState = {
  getting: false,
  error: null,
  markets: [],
  pageNumb: 1,
  pageSize: 10,
  hasNextPage: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED:
      return {
        ...state,
        getting: true,
      };
    case MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED: {
      const { list, pageNumb, pageSize, hasNextPage } = action.payload
      return {
        ...state,
        getting: false,
        error: initialState.error,
        pageSize, 
        pageNumb,
        hasNextPage,
        markets: updateLoadMore(state.markets, list.map(m => ({ ...m, id: m.marketId })), action.meta.isLoadMore)
      };
    }
    case TRADE_SUCCEEDED:
      return {
        ...state,
        markets: changeArrayById(state.markets, action.meta.marketId, m => ({ ...m, ctAmount: m.ctAmount + action.payload.entrustVolume }))
      }
    case MARKET_GET_TRADED_MARKET_WITH_CT_FAILED:
      return {
        ...state,
        getting: false,
        error: action.payload,
      };
    default:
      return state;
  }
}