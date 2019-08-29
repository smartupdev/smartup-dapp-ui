import {
  ORDER_USER_RESET,

  ORDER_USER_SELL_ORDER_UNLOCK,
  ORDER_USER_SELL_DELETE,
  ORDER_USER_SELL_DELETE_UNDO,
  ORDER_USER_SELL_EDIT_PRICE,
  ORDER_USER_SELL_EDIT_AMOUNT,
  ORDER_USER_SELL_ADD,

  ORDER_USER_SELL_EDIT_REQUESTED, ORDER_USER_SELL_EDIT_SUCCEEDED, ORDER_USER_SELL_EDIT_FAILED
} from '../actions/actionTypes'

import { ORDER_STATE } from '../integrator'

const initialState = {
  // active: false,
  removedOrderIds: [],
  addedOrders: [], // amount, price
  unlockOrders: [],
  editingPrice: '',
  editingAmount: '',
  gasFee: '',
  fetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_USER_RESET:
      return initialState
    case ORDER_USER_SELL_ORDER_UNLOCK:
      return {
        ...state,
        // active: true,
        unlockOrders: action.payload
      }
    case ORDER_USER_SELL_DELETE:
      return {
        ...state,
        // active: true,
        removedOrderIds: action.payload < 0 ? state.removedOrderIds : [...state.removedOrderIds, action.payload],
        addedOrders: state.addedOrders.filter(o => o.orderId !== action.payload)
        // remaining: state.sellOrderEditor.remaining + state.sellOrder.orders.find(o => o.id === action.payload).remaining,
      }
    case ORDER_USER_SELL_DELETE_UNDO:
      return {
        ...state,
        removedOrderIds: state.removedOrderIds.filter(o => o !== action.payload),
      }
    case ORDER_USER_SELL_EDIT_PRICE:
      return {
        ...state,
        editingPrice: action.payload
      }
    case ORDER_USER_SELL_EDIT_AMOUNT:
      return {
        ...state,
        editingAmount: action.payload
      }
    case ORDER_USER_SELL_ADD:
      return {
        ...state,
        editingPrice: initialState.editingPrice,
        editingAmount: initialState.editingAmount,
        addedOrders: [
          { 
            orderId: -(state.addedOrders.length + 1),
            sellingPrice: state.editingPrice,
            avgTradedPrice: state.editingPrice,
            totalAmount: state.editingAmount,
            remaining: state.editingAmount,
            state: ORDER_STATE.newAdded,
            total: state.editingPrice * state.editingAmount
           },
          ...state.addedOrders,
        ]
      }
    case ORDER_USER_SELL_EDIT_REQUESTED: 
      return {
        ...state,
        fetching: true
      }
    case ORDER_USER_SELL_EDIT_SUCCEEDED: 
      return initialState
    case ORDER_USER_SELL_EDIT_FAILED: 
      return {
        ...state,
        fetching: false,
        gasFee: action.payload.gasFee
      }
    default:
      return state
  }
}
