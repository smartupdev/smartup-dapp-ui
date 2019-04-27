import {
  GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
  CT_ACCOUNT_IN_MARKET_REQUESTED, CT_ACCOUNT_IN_MARKET_SUCCEEDED, CT_ACCOUNT_IN_MARKET_FAILED,
  GET_MARKET_GLOBAL_REQUESTED, GET_MARKET_GLOBAL_SUCCEEDED, GET_MARKET_GLOBAL_FAILED,
  USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
  USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
  MARKET_SEARCH_REQUESTED,MARKET_SEARCH_SUCCEEDED,MARKET_SEARCH_FAILED,
  MARKET_TOP_REQUESTED,MARKET_TOP_SUCCEEDED,MARKET_TOP_FAILED,TABLE_HEADER_CLICK
} from './actionTypes'
import {
  API_MARKET_LIST, API_CT_ACCOUNT_IN_MARKET, API_MARKET_GLOBAL,
  API_USER_COLLECT_ADD, API_USER_COLLECT_DEL, API_MARKET_DETAIL,
  API_MARKET_SEARCH,API_MARKET_TOP
} from './api'
import fetch from '../lib/util/fetch'
import { asyncFunction } from '../integrator'
import { getUserCollectLists } from '../actions/collect'

const topFilters = {
  0: 'all',
  1: 'hottest',
  2: 'newest',
  3: 'populous',
  4: 'richest',
}

export function get(marketId) {
  return asyncFunction(
    fetch.get,
    GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
    { params: API_MARKET_DETAIL, params2: { marketId }, meta: { marketId } }
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
      asc: getState().home.orderBy === 'asc'
    }

    if(getState().home.activeTabIndex === 0){
      dispatch(asyncFunction(
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
  }
}

//CT账户和市场信息
export function getCtAccountInMarket() {
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
export function getMarketGlobal() {
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

//搜索
export function markerSearch(requestParams){
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.post,
        MARKET_SEARCH_REQUESTED, MARKET_SEARCH_SUCCEEDED, MARKET_SEARCH_FAILED,
        {
          params: API_MARKET_SEARCH,
          params2: requestParams,
          responsePayload: reps => reps.list
        }
      )
    )
}

//市场TOP
export function markerTop(activeIndex){
  return (dispatch, getState) =>{
    const requestParams = {
      type: topFilters[activeIndex]
    }
    dispatch({
      type: TABLE_HEADER_CLICK,
      payload: { sortBy:'', orderBy:'' },
    });
    dispatch(
      asyncFunction(
        fetch.post,
        MARKET_TOP_REQUESTED, MARKET_TOP_SUCCEEDED, MARKET_TOP_FAILED,
        {
          params: API_MARKET_TOP,
          params2: requestParams,
        }
      )
    )
  }
}

//收藏
export function collectMarket(record) {
  const requestParams = {
    type: 'market',
    objectMark: record.id,
  }
  if(!record.following){
    //收藏
    return async (dispatch, getState) => {
      let [error, response] = await dispatch(asyncFunction(
          fetch.post,
          USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
          {
            params: API_USER_COLLECT_ADD,
            params2: requestParams,
            responsePayload: reps => record
          }
        )
      )
      if(!error){
        dispatch(getUserCollectLists())
      }
    }
  }else{
    //取消收藏
    return async (dispatch, getState) => {
      const requestParams = {
        type: 'market',
        objectMark: record.id,
      }
  
      let [error, response] = await dispatch(asyncFunction(
          fetch.post,
          USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
          {
            params: API_USER_COLLECT_DEL,
            params2: requestParams,
            responsePayload: reps => record
          }
        )
      )
      if(!error){
        dispatch(getUserCollectLists())
      }
    }
  }

}




