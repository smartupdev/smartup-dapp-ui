import {
  ORDER_BOOK_RESET,
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
  currentPrice: null,
  changePercent: null, 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_RESET:
      return initialState

    case ORDER_BOOK_SUCCEEDED: {
      const { sellOrder, buyOrder, lastPrice, currentPrice } = action.payload
      return {
        ...state,
        error: null,
        didFetch: true,
        buyOrder, 
        sellOrder,
        currentPrice,
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