import {
  GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
  CT_ACCOUNT_IN_MARKET_REQUESTED,CT_ACCOUNT_IN_MARKET_SUCCEEDED,CT_ACCOUNT_IN_MARKET_FAILED,
  GET_MARKET_GLOBAL_REQUESTED,GET_MARKET_GLOBAL_SUCCEEDED,GET_MARKET_GLOBAL_FAILED,
  TABLE_HEADER_CLICK,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED
} from './actionTypes'
import fetch from '../lib/util/fetch'
import { API_MARKET_LIST, API_CT_ACCOUNT_IN_MARKET, API_MARKET_GLOBAL, API_MARKET_DETAIL} from './api'
import { asyncFunction } from '../integrator'

export function get(marketAddress) {
  return asyncFunction(
    fetch.get,
    GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
    { params: API_MARKET_DETAIL, params2: { marketAddress } }
  )
}

//全部市场列表
export function getMarketList(requestParams) {
  return (dispatch, getState) => dispatch(
    asyncFunction(
      fetch.post,
      GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
      {
        params: API_MARKET_LIST,
        params2: requestParams,
        responsePayload: reps => reps.list
      }
    )
  )
}

export function getDefaultMarketList() {
  return (dispatch, getState) => {
    const requestParams = {
      orderBy: getState().home.sortBy,
      asc:  getState().home.orderBy === 'asc'
    }
    dispatch(asyncFunction(
      fetch.post,
      GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
      {
        params: API_MARKET_LIST,
        params2: requestParams,
        responsePayload: reps => reps.list
      }
    )
  )}
}

//CT账户和市场信息
export function getCtAccountInMarket(){
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.post,
        CT_ACCOUNT_IN_MARKET_REQUESTED, CT_ACCOUNT_IN_MARKET_SUCCEEDED, CT_ACCOUNT_IN_MARKET_FAILED,
        {
          params: API_CT_ACCOUNT_IN_MARKET,
          params2: {},
          responsePayload: reps => reps.list
        }
      )
    )
}

//全部市场数据
export function getMarketGlobal(){
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.post,
        GET_MARKET_GLOBAL_REQUESTED, GET_MARKET_GLOBAL_SUCCEEDED, GET_MARKET_GLOBAL_FAILED,
        {
          params: API_MARKET_GLOBAL,
        }
      )
    )
}




