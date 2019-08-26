import {
  ORDER_BOOK_RESET,
  ORDER_BOOK_BUY_REQUESTED, ORDER_BOOK_BUY_SUCCEEDED, ORDER_BOOK_BUY_FAILED,
  ORDER_BOOK_SELL_REQUESTED, ORDER_BOOK_SELL_SUCCEEDED, ORDER_BOOK_SELL_FAILED,  
} from '../actions/actionTypes'

import { numberOfOrderBookRecord } from '../config'

const DEFAULT_ORDER = new Array(numberOfOrderBookRecord).fill(null).map( (v, i) => ({ key: -i }))
function orderMassage(orders) {
  return {
    orders: [
      ...orders.map(order => ({ ...order, key: order.price, total: order.price * order.amount })),
      ...DEFAULT_ORDER
    ],
    max: Math.max(...orders.map(o => o.amount))
  }
}

export const initialState = {
  buyOrder: {
    max: 0,
    orders: DEFAULT_ORDER,
    error: null,
    // fetching: false,
    hasNextPage: false,
    pageNumb: 1,
    pageSize: 100,
  },
  
  sellOrder: {
    max: 0,
    orders: DEFAULT_ORDER,
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
          ...orderMassage(orders), 
          hasNextPage, pageNumb, pageSize
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
          ...orderMassage(orders), 
          hasNextPage, pageNumb, pageSize
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