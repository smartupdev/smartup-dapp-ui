import { GLOBAL_GET_MARKET_REQUESTED, GLOBAL_GET_MARKET_SUCCEEDED, GLOBAL_GET_MARKET_FAILED, GLOBAL_GET_SUT_VALUE } from './actionTypes'
import { action } from './actionHelper'
import { asyncFunction, apiGetGlobalMarket, apiGetSutValue } from '../integrator'

export function getGlobalMarket() {
  return asyncFunction(
    apiGetGlobalMarket(),
    GLOBAL_GET_MARKET_REQUESTED, GLOBAL_GET_MARKET_SUCCEEDED, GLOBAL_GET_MARKET_FAILED,
  )
}

export function getSutValue() {
  return async dispatch => {
    try {
      dispatch(
        action(GLOBAL_GET_SUT_VALUE, await apiGetSutValue()())
      )
    }
    catch (error) {
      window.log.error('get sut value failed', error)
    }
  }
}
