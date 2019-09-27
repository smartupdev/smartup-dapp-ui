import {
  MARKET_DETAIL_RESET,
  TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
} from '../actions/actionTypes';

export const initialState = {
  getting: false,
  error: null,
  list: [] 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DETAIL_RESET:
      return initialState
    case TRADE_KLINE_REQUESTED:
      return {
        ...state,
        getting: true,
        error: initialState.error
      }
    case TRADE_KLINE_SUCCEEDED:
      return {
        ...state,
        getting: false,
        list: (action.payload.length === 1 ? [...action.payload, { open: 0, close: 0, volume: 0, high: 0, low: 0 }] : action.payload).map( line => ({
          ...line,
          open: line.start,
          close: line.end,
          volume: line.amount,
          date: new Date(line.time),
        }))
      }
    case TRADE_KLINE_FAILED:
      return {
        ...state,
        getting: false,
        error: action.payload
      }

    default:
      return state
  }
};