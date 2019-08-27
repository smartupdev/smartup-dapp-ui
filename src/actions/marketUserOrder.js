import {
  ORDER_USER_RESET,
  ORDER_USER_GET_BUY_REQUESTED, ORDER_USER_GET_BUY_SUCCEEDED, ORDER_USER_GET_BUY_FAILED,
  ORDER_USER_GET_SELL_REQUESTED, ORDER_USER_GET_SELL_SUCCEEDED, ORDER_USER_GET_SELL_FAILED,
  ORDER_USER_GET_HISTORY_REQUESTED, ORDER_USER_GET_HISTORY_SUCCEEDED, ORDER_USER_GET_HISTORY_FAILED
} from './actionTypes'
import { action } from './actionHelper'

import { apiGetUserOrder, asyncFunction, ORDER_SIDE, ORDER_STATE } from '../integrator'

export function reset() { return action(ORDER_USER_RESET) }

export function getBuyOrder(marketId) {
  return asyncFunction(apiGetUserOrder({marketId, side: ORDER_SIDE.buy, states: [ORDER_STATE.active, ORDER_STATE.locked, ORDER_STATE.onHold]}), 
    ORDER_USER_GET_BUY_REQUESTED, ORDER_USER_GET_BUY_SUCCEEDED, ORDER_USER_GET_BUY_FAILED,
  )
}

export function getSellOrder(marketId) {
  return asyncFunction(apiGetUserOrder({marketId, side: ORDER_SIDE.sell, states: [ORDER_STATE.active, ORDER_STATE.locked, ORDER_STATE.onHold]}), 
    ORDER_USER_GET_SELL_REQUESTED, ORDER_USER_GET_SELL_SUCCEEDED, ORDER_USER_GET_SELL_FAILED,
  )
}

export function getHistoryOrder(marketId) {
  return asyncFunction(apiGetUserOrder({marketId, states: [ORDER_STATE.fullyExecuted, ORDER_STATE.notExecuted, ORDER_STATE.partiallyExecuted, ORDER_STATE.processing]}), 
    ORDER_USER_GET_HISTORY_REQUESTED, ORDER_USER_GET_HISTORY_SUCCEEDED, ORDER_USER_GET_HISTORY_FAILED
  )
}
