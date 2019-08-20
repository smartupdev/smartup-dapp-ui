import {
  ORDER_BOOK_RESET,
  ORDER_BOOK_BUY_REQUESTED, ORDER_BOOK_BUY_SUCCEEDED, ORDER_BOOK_BUY_FAILED,
  ORDER_BOOK_SELL_REQUESTED, ORDER_BOOK_SELL_SUCCEEDED, ORDER_BOOK_SELL_FAILED,  
} from '../actions/actionTypes'

export const initialState = {
  buyOrder: {
    orders: [],
    error: null,
    // fetching: false,
    hasNextPage: false,
    pageNumb: 1,
    pageSize: 100,
  },
  
  sellOrder: {
    orders: [],
    error: null,
    // fetching: false,
    hasNextPage: false,
    pageNumb: 1,
    pageSize: 100,
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_RESET:
      return initialState

    case ORDER_BOOK_BUY_SUCCEEDED: {
      const { hasNextPage, list: orders, pageNumb, pageSize } = action.payload
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          error: null,
          orders, hasNextPage, pageNumb, pageSize
        }
      }
    }

    case ORDER_BOOK_BUY_FAILED: 
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          error: action.payload
        }
      }

    case ORDER_BOOK_SELL_SUCCEEDED: {
      const { hasNextPage, list: orders, pageNumb, pageSize } = action.payload
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          error: null,
          orders, hasNextPage, pageNumb, pageSize
        }
      }
    }

    case ORDER_BOOK_SELL_FAILED: 
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          error: action.payload
        }
      }

    default:
      return state;
  }
}