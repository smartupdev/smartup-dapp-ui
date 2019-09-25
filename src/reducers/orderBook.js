import {
  GET_MARKET_DETAIL_SUCCEEDED,
  ORDER_BOOK_RESET,
  MARKET_DETAIL_RESET,
  ORDER_BOOK_SUCCEEDED, ORDER_BOOK_FAILED
} from '../actions/actionTypes'

export const initialState = {
  error: null,
  didFetch: false,
  // hasNextPage: false,
  // pageNumb: 1,
  // pageSize: 100,
  buyOrder: {
    max: 0,
    orders: [],
  },
  sellOrder: {
    max: 0,
    orders: [],
  },
  orders: [],
  currentPrice: null,
  changePercent: null, 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DETAIL_RESET:
      return initialState

    case GET_MARKET_DETAIL_SUCCEEDED:
      return {
        ...state, currentPrice: action.payload.ctPrice
      }

    case ORDER_BOOK_SUCCEEDED: {
      const { sellOrder, buyOrder, orders, lastPrice, currentPrice } = action.payload
      return {
        ...state,
        error: null,
        didFetch: true,
        buyOrder, 
        sellOrder,
        orders: orders.map(o => ({ ...o, total: o.price * o.volume })),
        currentPrice: currentPrice || state.currentPrice,
        changePercent: lastPrice && (currentPrice - lastPrice) / lastPrice 
      }
    }

    case ORDER_BOOK_FAILED: 
      return {
        ...state,
        didFetch: true,
        error: action.payload
      }

    default:
      return state;
  }
}