import {
  ORDER_USER_RESET,
  ORDER_USER_GET_BUY_REQUESTED, ORDER_USER_GET_BUY_SUCCEEDED, ORDER_USER_GET_BUY_FAILED,
  ORDER_USER_GET_SELL_REQUESTED, ORDER_USER_GET_SELL_SUCCEEDED, ORDER_USER_GET_SELL_FAILED,
  ORDER_USER_GET_HISTORY_REQUESTED, ORDER_USER_GET_HISTORY_SUCCEEDED, ORDER_USER_GET_HISTORY_FAILED,
} from '../actions/actionTypes'

function sellOrderMassage(orders) {
  return orders.map(o => ({
    ...o,
    total: o.avgTradedPrice * o.sellingPrice
  }))
} 

export const initialState = {
  buyOrder: {
    orders: [],
    error: null,
  },
  sellOrder: {
    orders: [],
    error: null,
  },
  historyOrder: {
    orders: [],
    error: null,
    fetching: false,
    hasNextPage: false,
    pageNumb: 1,
    pageSize: 20,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_USER_RESET:
      return initialState

    case ORDER_USER_GET_BUY_REQUESTED: 
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          error: null
        }
      }
    case ORDER_USER_GET_BUY_SUCCEEDED: 
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          orders: action.payload.list
        }
      }
    case ORDER_USER_GET_BUY_FAILED: 
      return {
        ...state,
        buyOrder: {
          ...state.buyOrder,
          error: action.payload
        }
      }
    case ORDER_USER_GET_SELL_REQUESTED: 
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          error: null
        }
      }
    case ORDER_USER_GET_SELL_SUCCEEDED: 
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          orders: sellOrderMassage(action.payload.list)
        }
      }
    case ORDER_USER_GET_SELL_FAILED: 
      return {
        ...state,
        sellOrder: {
          ...state.sellOrder,
          error: action.payload
        }
      }
    case ORDER_USER_GET_HISTORY_REQUESTED: 
      return {
        ...state,
        historyOrder: {
          ...state.historyOrder,
          error: action.payload,
          fetching: true
        }
      }
    case ORDER_USER_GET_HISTORY_SUCCEEDED: {
      const { list: orders, hasNextPage, pageNumb, pageSize } = action.payload
      return {
        ...state,
        historyOrder: {
          ...state.historyOrder,
          orders, hasNextPage, pageNumb, pageSize,
          fetching: false
        }
      }
    }
    case ORDER_USER_GET_HISTORY_FAILED: 
      return {
        ...state,
        historyOrder: {
          ...state.historyOrder,
          error: action.payload,
          fetching: false
        }
      }
    
    default:
      return state;
  }
}