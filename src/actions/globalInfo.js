import { GLOBAL_GET_MARKET_REQUESTED, GLOBAL_GET_MARKET_SUCCEEDED, GLOBAL_GET_MARKET_FAILED } from './actionTypes'
import { apiGetGlobalMarket } from '../integrator/api'
import { asyncFunction } from '../integrator'

export function getGlobalMarket() {
  return asyncFunction(
    apiGetGlobalMarket(),
    GLOBAL_GET_MARKET_REQUESTED, GLOBAL_GET_MARKET_SUCCEEDED, GLOBAL_GET_MARKET_FAILED,
  )
}
