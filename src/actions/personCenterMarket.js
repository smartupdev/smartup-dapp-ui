import {
  PERSONAL_CENTER_RESET,
  USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
  USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
  USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
} from './actionTypes'

import { asyncFunction } from '../integrator'
import {
  API_USER_TRANSACTION_LIST, API_USER_MARKET_CREATED, API_USER_MARKET_TRADED,
} from './api';
import fetch from '../lib/util/fetch';

export function reset() {
  return {
    type: PERSONAL_CENTER_RESET,
  }
}

//get user transactions
export function getUserTransactionList() {
  return (dispatch, getState) => {
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
        {
          params: API_USER_TRANSACTION_LIST,
          params2: { pageNumb: getState().personalCenterMarket.transPageNumb + 1, pageSize: getState().personalCenterMarket.pageSize }
        }
      )
    )
  }
}

//用户创建的市场
export function getCreatedMarkets() {
  return (dispatch, getState) => {
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
        {
          params: API_USER_MARKET_CREATED,
          params2: { pageNumb: getState().personalCenterMarket.createdMarketsPageNumb + 1, pageSize: getState().personalCenterMarket.pageSize }
        }
      )
    )
  }
}

//用户交易的市场
export function getTradedMarkets() {
  return (dispatch, getState) => {
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
        {
          params: API_USER_MARKET_TRADED,
          params2: { pageNumb: getState().personalCenterMarket.tradedMarketsPageNumb + 1, pageSize: getState().personalCenterMarket.pageSize }
        }
      )
    )
  }
}