import {
  ORDER_USER_RESET,
  ORDER_USER_GET_BUY_REQUESTED, ORDER_USER_GET_BUY_SUCCEEDED, ORDER_USER_GET_BUY_FAILED,
  ORDER_USER_GET_SELL_REQUESTED, ORDER_USER_GET_SELL_SUCCEEDED, ORDER_USER_GET_SELL_FAILED,
  ORDER_USER_GET_HISTORY_REQUESTED, ORDER_USER_GET_HISTORY_SUCCEEDED, ORDER_USER_GET_HISTORY_FAILED,

  ORDER_USER_SELL_DELETE,
  ORDER_USER_SELL_DELETE_UNDO,
  ORDER_USER_SELL_EDIT_PRICE,
  ORDER_USER_SELL_EDIT_AMOUNT,
  ORDER_USER_SELL_ADD,
  ORDER_USER_SELL_ORDER_UNLOCK,
  ORDER_USER_SELL_EDIT_REQUESTED, ORDER_USER_SELL_EDIT_SUCCEEDED, ORDER_USER_SELL_EDIT_FAILED
} from './actionTypes'
import { action } from './actionHelper'

import { apiGetUserOrder, apiEditSellOrder, asyncFunction, ORDER_SIDE, ORDER_STATE } from '../integrator'

export function reset() { return action(ORDER_USER_RESET) }

export function getBuyOrder() {
  return (dispatch, getState) => dispatch(
    asyncFunction(apiGetUserOrder({marketId: getState().market.id, side: ORDER_SIDE.buy, states: [ORDER_STATE.active, ORDER_STATE.locked, ORDER_STATE.onHold], pageSize: 100}), 
      ORDER_USER_GET_BUY_REQUESTED, ORDER_USER_GET_BUY_SUCCEEDED, ORDER_USER_GET_BUY_FAILED,
    )
  )
}

export function getSellOrder() {
  return (dispatch, getState) => dispatch(
    asyncFunction(apiGetUserOrder({marketId: getState().market.id, side: ORDER_SIDE.sell, states: [ORDER_STATE.active, ORDER_STATE.locked, ORDER_STATE.onHold], pageSize: 100}), 
      ORDER_USER_GET_SELL_REQUESTED, ORDER_USER_GET_SELL_SUCCEEDED, ORDER_USER_GET_SELL_FAILED,
    )
  )
}

export function getHistoryOrder(isLoadMore) {
  return (dispatch, getState) => {
    const { market: { id: marketId }, marketUserOrder: { historyOrder: {pageSize, pageNumb} } } = getState()
    return dispatch(
      asyncFunction(apiGetUserOrder({marketId, states: [ORDER_STATE.fullyExecuted, ORDER_STATE.notExecuted, ORDER_STATE.partiallyExecuted, ORDER_STATE.processing], pageNumb, pageSize, isLoadMore}), 
        ORDER_USER_GET_HISTORY_REQUESTED, ORDER_USER_GET_HISTORY_SUCCEEDED, ORDER_USER_GET_HISTORY_FAILED,
        { meta: { isLoadMore } }
      )
    )
  }
  
}

export function deleteSellOrder(id) { return action(ORDER_USER_SELL_DELETE, id) }
export function undoDeleteSellOrder(id) { return action(ORDER_USER_SELL_DELETE_UNDO, id) }
export function onChangePrice(v) { return action(ORDER_USER_SELL_EDIT_PRICE, v) }
export function onChangeAmount(v) { return action(ORDER_USER_SELL_EDIT_AMOUNT, v) }
export function addSellOrder() { return action(ORDER_USER_SELL_ADD) }
export function unlockOrder(ids) { return action(ORDER_USER_SELL_ORDER_UNLOCK, ids) }

export function confirmChange() {
  return (dispatch, getState) => {
    const { marketEditingSellOrder: {removedOrderIds: cancelledOrderIds, addedOrders, unlockOrders: unlockedOrderIds}, market: {id: marketId} } = getState()
    return dispatch(
      asyncFunction(apiEditSellOrder({ marketId, cancelledOrderIds, unlockedOrderIds, addedOrders }),
        ORDER_USER_SELL_EDIT_REQUESTED, ORDER_USER_SELL_EDIT_SUCCEEDED, ORDER_USER_SELL_EDIT_FAILED
      )
    )
  }
}