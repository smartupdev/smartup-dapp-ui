import {
  GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
  CT_ACCOUNT_IN_MARKET_REQUESTED, CT_ACCOUNT_IN_MARKET_SUCCEEDED, CT_ACCOUNT_IN_MARKET_FAILED,
  GET_MARKET_GLOBAL_REQUESTED, GET_MARKET_GLOBAL_SUCCEEDED, GET_MARKET_GLOBAL_FAILED,
  USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
  USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
  MARKET_SEARCH_REQUESTED, MARKET_SEARCH_SUCCEEDED, MARKET_SEARCH_FAILED,
  MARKET_TOP_REQUESTED, MARKET_TOP_SUCCEEDED, MARKET_TOP_FAILED, HOME_SET_SORTING
} from './actionTypes'
import {
  API_MARKET_LIST, API_CT_ACCOUNT_IN_MARKET, API_MARKET_GLOBAL,
  API_USER_COLLECT_ADD, API_USER_COLLECT_DEL, API_MARKET_DETAIL,
  API_MARKET_SEARCH, API_MARKET_TOP
} from './api'
import fetch from '../lib/util/fetch'
import { asyncFunction } from '../integrator'
import { getUserCollectLists } from '../actions/collect'

const topIndexToValueMap = [
  null, 
  'hottest',
  'newest',
  'populous',
  'richest',
]


export function get(marketId) {
  return asyncFunction(
    fetch.get,
    GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
    { params: API_MARKET_DETAIL, params2: { marketId }, meta: { marketId } }
  )
}

// /api/market/list   Get all markets
// /api/market/search Get market by filter
// /api/market/top    Get filtered markets, e.g. hottest
export function getListMore() {
  return getList(true)
}
export function getList(isLoadMore) {
  return (dispatch, getState) => {
    const {sortBy, orderBy, searchContent, activeTabIndex, markets, pageNumb, pageSize} = getState().home;
    const isAll = !activeTabIndex
    if(!isAll && searchContent) return // handle in ui
    if(!isAll && sortBy) return dispatch({
      type: GET_MARKET_LIST_SUCCEEDED,
      payload: {
        list: [...markets].sort( (a, b) => 
          (orderBy === 'asc' ? 1 : -1) *
          (typeof a[sortBy] === 'string' || typeof b[sortBy] === 'string' ?
          a[sortBy].localeCompare(b[sortBy]) :
          a[sortBy] - b[sortBy])
        )
      }
    })
    
    return dispatch(
      asyncFunction(
        fetch.post,
        GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
        {
          params: isAll 
            ? searchContent ? API_MARKET_SEARCH : API_MARKET_LIST
            : API_MARKET_TOP,
          params2: isAll 
            ? { orderBy: sortBy, asc: orderBy === 'asc', name: searchContent, pageSize, pageNumb: isLoadMore === true ? pageNumb + 1 : 1 } 
            : { type: topIndexToValueMap[activeTabIndex] },
          responsePayload: r => isAll ? r : {list: r},
          meta: { isLoadMore }
        }
      )
    )
  }
}

//CT账户和市场信息
export function getCtAccountInMarketMore() {
  return getCtAccountInMarket(true)
}

export function getCtAccountInMarket(isLoadMore) {
  return (dispatch, getState) => {
    const {ctInMarketPageNumb, ctInMarketPageSize} = getState().market;
    dispatch(
      asyncFunction(
        fetch.post,
        CT_ACCOUNT_IN_MARKET_REQUESTED, CT_ACCOUNT_IN_MARKET_SUCCEEDED, CT_ACCOUNT_IN_MARKET_FAILED,
        {
          params: API_CT_ACCOUNT_IN_MARKET,
          params2: { pageNumb: isLoadMore ? ctInMarketPageNumb + 1 : 1, pageSize: ctInMarketPageSize },
          meta: { isLoadMore }
        }
      )
    )
  }
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

//收藏
export function collectMarket(record) {
  const requestParams = {
    type: 'market',
    objectMark: record.id,
  }
  if (!record.following) {
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
      if (!error) {
        dispatch(getUserCollectLists())
      }
    }
  } else {
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
      if (!error) {
        dispatch(getUserCollectLists())
      }
    }
  }

}




