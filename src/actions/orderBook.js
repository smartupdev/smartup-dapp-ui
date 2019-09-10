import {
  ORDER_BOOK_RESET,
  ORDER_BOOK_SUCCEEDED, ORDER_BOOK_FAILED
} from './actionTypes'
import { action } from './actionHelper'
import { apiGetOrderBook } from '../integrator'

export function reset() { return action(ORDER_BOOK_RESET) }
// TODO: change to web socket
export function getOrder(marketId) {
  return async dispatch => {
    try {
      dispatch(action(ORDER_BOOK_SUCCEEDED, await apiGetOrderBook(marketId)()))
    } 
    catch (error) {
      dispatch(action(ORDER_BOOK_FAILED, error))
    }
  }
}