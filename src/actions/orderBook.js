import {
  ORDER_BOOK_RESET,
  ORDER_BOOK_BUY_REQUESTED, ORDER_BOOK_BUY_SUCCEEDED, ORDER_BOOK_BUY_FAILED,
  ORDER_BOOK_SELL_REQUESTED, ORDER_BOOK_SELL_SUCCEEDED, ORDER_BOOK_SELL_FAILED,
} from './actionTypes'
import { action } from './actionHelper'

import { apiGetBuyOrderBook, apiGetSellOrderBook } from '../integrator'
import { delay } from '../lib/util/fetch'

export function reset() { return action(ORDER_BOOK_RESET) }
// TODO: change to web socket
export function getBuyOrder() {
  return orderLoop(apiGetBuyOrderBook, ORDER_BOOK_BUY_SUCCEEDED, ORDER_BOOK_BUY_FAILED)
}

export function getSellOrder() {
  return orderLoop(apiGetSellOrderBook, ORDER_BOOK_SELL_SUCCEEDED, ORDER_BOOK_SELL_FAILED)
}

function orderLoop(api, successAction, failAction) {
  return async (dispatch, getState) => {
    const marketId = getState().market.id
    while(marketId === getState().market.id) {
      try {
        dispatch(action(successAction, await api(marketId)()))
      } 
      catch (error) {
        dispatch(action(failAction, error))
      }
      await delay(1000000)
    }
  }
}