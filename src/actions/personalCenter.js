import {
  PERSONAL_CENTER_RESET,
  USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
  USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
  USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
  USER_MARKET_COLLECTED_REQUESTED, USER_MARKET_COLLECTED_SUCCEEDED, USER_MARKET_COLLECTED_FAIL,
  USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
  USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
  USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
  USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
} from './actionTypes'

import { asyncFunction } from '../integrator'
import {
  API_USER_TRANSACTION_LIST, 
  API_USER_MARKET_CREATED, API_USER_MARKET_TRADED, API_USER_MARKET_COLLECTED,
  API_USER_POST_COLLECTED, API_USER_POST_CREATED,
  API_USER_REPLY_CREATED, API_USER_REPLY_COLLECTED,
} from './api';
import fetch from '../lib/util/fetch';

export function reset() {
  return {
    type: PERSONAL_CENTER_RESET,
  }
}

//get user transactions
export function getUserTransactionList(isLoadMore) { // isLoadMore can be event
  return (dispatch, getState) => {
    const { transPageNumb: pageNumb, pageSize } = getState().personalCenterMarket
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
        {
          params: API_USER_TRANSACTION_LIST,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}

//用户创建的市场
export function getCreatedMarkets(isLoadMore) {
  return (dispatch, getState) => {
    const { createdMarketsPageNumb: pageNumb, pageSize } = getState().personalCenterMarket
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
        {
          params: API_USER_MARKET_CREATED,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}

//用户交易的市场
export function getTradedMarkets(isLoadMore) {
  return (dispatch, getState) => {
    const { tradedMarketsPageNumb: pageNumb, pageSize } = getState().personalCenterMarket
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
        {
          params: API_USER_MARKET_TRADED,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}

export function getCollectedMarkets(isLoadMore) {
  return (dispatch, getState) => {
    const { collectedMarketsPageNumb: pageNumb, pageSize } = getState().personalCenterMarket
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_MARKET_COLLECTED_REQUESTED, USER_MARKET_COLLECTED_SUCCEEDED, USER_MARKET_COLLECTED_FAIL,
        {
          params: API_USER_MARKET_COLLECTED,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}

//用户收藏的帖子
export function getCollectedPosts(isLoadMore) {
  return (dispatch, getState) => {
    const { collectedPostsPageNumb: pageNumb, pageSize } = getState().personalCenterPost
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
        {
          params: API_USER_POST_COLLECTED,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}

//用户创建的帖子
export function getCreatedPosts(isLoadMore) {
  return (dispatch, getState) => {
    const { createdPostsPageNumb: pageNumb, pageSize } = getState().personalCenterPost
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
        {
          params: API_USER_POST_CREATED,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}

//用户收藏的回复
export function getCollectedReplys(isLoadMore) {
  return (dispatch, getState) => {
    const { collectedReplysPageNumb: pageNumb, pageSize } = getState().personalCenterPost
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
        {
          params: API_USER_REPLY_COLLECTED,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}

//用户创建的回复
export function getCreatedReplys(isLoadMore) {
  return (dispatch, getState) => {
    const { createdReplysPageNumb: pageNumb, pageSize } = getState().personalCenterPost
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
        {
          params: API_USER_REPLY_CREATED,
          params2: { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
}