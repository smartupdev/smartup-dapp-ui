import { 
  GLOBAL_GET_MARKET_REQUESTED, GLOBAL_GET_MARKET_SUCCEEDED, GLOBAL_GET_MARKET_FAILED, GLOBAL_GET_SUT_VALUE,
} from '../actions/actionTypes'

export const initialState = {
  getting: false,
  error: null,
  globalMarket: {
    sutAmount: null, 
    marketCount: null, 
    latelyPostCount: null
  },
  sut2usd: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_GET_SUT_VALUE:
      return {
        ...state,
        sut2usd: action.payload.usd
      }
    case GLOBAL_GET_MARKET_REQUESTED:
      return {
        ...state,
        getting: true,
      };
    case GLOBAL_GET_MARKET_SUCCEEDED:
      return {
        ...state,
        globalMarket: action.payload,
        getting: false,
        error: initialState.error,
      };
    case GLOBAL_GET_MARKET_FAILED:
      return {
        ...state,
        getting: false,
        error: action.payload,
      };
    default:
      return state;
  }
}