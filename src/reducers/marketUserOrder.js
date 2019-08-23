import {
  ORDER_USER_RESET,
  ORDER_USER_GET_BUY_REQUESTED, ORDER_USER_GET_BUY_SUCCEEDED, ORDER_USER_GET_BUY_FAILED,
  ORDER_USER_GET_SELL_REQUESTED, ORDER_USER_GET_SELL_SUCCEEDED, ORDER_USER_GET_SELL_FAILED,
  ORDER_USER_GET_HISTORY_REQUESTED, ORDER_USER_GET_HISTORY_SUCCEEDED, ORDER_USER_GET_HISTORY_FAILED,
} from '../actions/actionTypes'

export const initialState = {
  buyOrders: {
    orders: [],
    error: null,
  },
  sellOrders: {
    orders: [],
    error: null,
  },
  historyOrders: {
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
        buyOrders: {
          ...state.buyOrders,
          error: null
        }
      }
    case ORDER_USER_GET_BUY_SUCCEEDED: 
      return {
        ...state,
        buyOrders: {
          ...state.buyOrders,
          orders: action.payload.list
        }
      }
    case ORDER_USER_GET_BUY_FAILED: 
      return {
        ...state,
        buyOrders: {
          ...state.buyOrders,
          error: action.payload
        }
      }
    case ORDER_USER_GET_SELL_REQUESTED: 
      return {
        ...state,
        sellOrders: {
          ...state.sellOrders,
          error: null
        }
      }
    case ORDER_USER_GET_SELL_SUCCEEDED: 
      return {
        ...state,
        sellOrders: {
          ...state.sellOrders,
          orders: action.payload.list
        }
      }
    case ORDER_USER_GET_SELL_FAILED: 
      return {
        ...state,
        sellOrders: {
          ...state.sellOrders,
          error: action.payload
        }
      }
    case ORDER_USER_GET_HISTORY_REQUESTED: 
      return {
        ...state,
        historyOrders: {
          ...state.historyOrders,
          error: action.payload,
          fetching: true
        }
      }
    case ORDER_USER_GET_HISTORY_SUCCEEDED: {
      const { list: orders, hasNextPage, pageNumb, pageSize } = action.payload
      return {
        ...state,
        historyOrders: {
          ...state.historyOrders,
          orders, hasNextPage, pageNumb, pageSize,
          fetching: false
        }
      }
    }
    case ORDER_USER_GET_HISTORY_FAILED: 
      return {
        ...state,
        historyOrders: {
          ...state.historyOrders,
          error: action.payload,
          fetching: false
        }
      }
    
    default:
      return state;
  }
}