import {
  PERSONAL_CENTER_RESET,
  USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
  USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
  USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
  USER_MARKET_COLLECTED_REQUESTED, USER_MARKET_COLLECTED_SUCCEEDED, USER_MARKET_COLLECTED_FAIL,
  USER_MARKET_COLLECTED_PANEL_REQUESTED, USER_MARKET_COLLECTED_PANEL_SUCCEEDED, USER_MARKET_COLLECTED_PANEL_FAIL,
  USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
  USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
  USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
  USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
} from './actionTypes'

import { asyncFunction } from '../integrator'

import { 
  apiGetCreatedMarket, apiGetCollectedMarket, apiGetTradedMarket,
  apiGetCreatedPost, apiGetCollectedPost,
  apiGetCreatedReply, apiGetCollectedReply,
  apiGetTransaction,
} from '../integrator/api'


export function reset() {
  return {
    type: PERSONAL_CENTER_RESET,
  }
}

export function getUserTransactionList(isLoadMore) { // isLoadMore can be event
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userTransaction
    return dispatch(
      asyncFunction(
        apiGetTransaction({pageNumb, pageSize, isLoadMore}),
        USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}


export function getCreatedMarkets(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userCreatedMarket
    return dispatch(
      asyncFunction(
        apiGetCreatedMarket({pageNumb, pageSize, isLoadMore}),
        USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}

export function getTradedMarkets(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userTradedMarket
    return dispatch(
      asyncFunction(
        apiGetTradedMarket({pageNumb, pageSize, isLoadMore}),
        USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}

export function getCollectedMarkets(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userSavedMarket
    return dispatch(
      asyncFunction(
        apiGetCollectedMarket({pageNumb, pageSize, isLoadMore}),
        USER_MARKET_COLLECTED_REQUESTED, USER_MARKET_COLLECTED_SUCCEEDED, USER_MARKET_COLLECTED_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}

export function getCollectedMarketsPanel(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userSavedMarketPanel
    return dispatch(
      asyncFunction(
        apiGetCollectedMarket({pageNumb, pageSize, isLoadMore}),
        USER_MARKET_COLLECTED_PANEL_REQUESTED, USER_MARKET_COLLECTED_PANEL_SUCCEEDED, USER_MARKET_COLLECTED_PANEL_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}

//用户收藏的帖子
export function getCollectedPosts(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userSavedPost
    return dispatch(
      asyncFunction(
        apiGetCollectedPost({pageNumb, pageSize, isLoadMore}),
        USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}

//用户创建的帖子
export function getCreatedPosts(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userCreatedPost
    return dispatch(
      asyncFunction(
        apiGetCreatedPost({pageNumb, pageSize, isLoadMore}),
        USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}

//用户收藏的回复
export function getCollectedReplys(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userSavedReply
    return dispatch(
      asyncFunction(
        apiGetCollectedReply({pageNumb, pageSize, isLoadMore}),
        USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}

//用户创建的回复
export function getCreatedReplys(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().userCreatedReply
    return dispatch(
      asyncFunction(
        apiGetCreatedReply({pageNumb, pageSize, isLoadMore}),
        USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
        { meta: { isLoadMore } }
      )
    )
  }
}