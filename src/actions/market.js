import {
  MARKET_DETAIL_RESET,
  GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,

  MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED, MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED, MARKET_GET_TRADED_MARKET_WITH_CT_FAILED,

  MARKET_ADD_SAVED_MARKET, MARKET_DEL_SAVED_MARKET,

  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
  MARKET_DETAIL_GET_CT_REQUESTED, MARKET_DETAIL_GET_CT_SUCCEEDED, MARKET_DETAIL_GET_CT_FAILED,
  // MARKET_SEARCH_REQUESTED, MARKET_SEARCH_SUCCEEDED, MARKET_SEARCH_FAILED,
  // MARKET_TOP_REQUESTED, MARKET_TOP_SUCCEEDED, MARKET_TOP_FAILED, HOME_SET_SORTING
} from './actionTypes'
import {
  API_MARKET_LIST, API_MARKET_DETAIL,
  API_MARKET_SEARCH, API_MARKET_TOP
} from './api'
import fetch from '../lib/util/fetch'
import { asyncFunction, callbackFunction, getBalance, getAccount, getMarketCt, smartupWeb3, decodeResult, apiGetMarket, getMarketStatus } from '../integrator'
import { addCollect, delCollect } from './bookmark'

import { 
  apiGetTradedMarketCt, 
} from '../integrator/api'

const topIndexToValueMap = [
  null, 
  'hottest',
  'newest',
  'populous',
  'richest',
]

export function resetDetail() {
  return {
    type: MARKET_DETAIL_RESET
  }
}

export function getCtBalance(marketAddress) {
  return callbackFunction(
    () => getMarketCt(marketAddress),
    MARKET_DETAIL_GET_CT_REQUESTED, MARKET_DETAIL_GET_CT_SUCCEEDED, MARKET_DETAIL_GET_CT_FAILED
  )
}

export function get(marketId) {
  return async (dispatch, getState) => {
    const [error, result] = await dispatch(
      asyncFunction(
        apiGetMarket(marketId),
        GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
        { meta: { marketId } }
      )
    )
    if(!error) {
      const marketAddress = result.marketAddress
      console.log('marketAddress')
      console.log(marketAddress)
      dispatch(getCtBalance(marketAddress))
      getMarketStatus(marketAddress).then(console.log).catch(console.error)
    }
    return [error, result]
  }
}

// /api/market/list   Get all markets
// /api/market/search Get market by filter
// /api/market/top    Get filtered markets, e.g. hottest
export function getList(isLoadMore) {
  return (dispatch, getState) => {
    const {sortBy, orderBy, searchContent, activeTabIndex, markets, pageNumb, pageSize} = getState().home;
    const isAll = !activeTabIndex
    if(!isAll && searchContent) return // handle in ui
    if(!isAll && sortBy) return dispatch({
      type: GET_MARKET_LIST_SUCCEEDED,
      payload: {
        list: [...markets].sort( (a, b) => {
          const A = a[sortBy], B = b[sortBy]
          if(A === null) return 1
          if(B === null) return -1
          return (orderBy === 'asc' ? 1 : -1) *
          (typeof A === 'string' || typeof B === 'string' ?
          A.localeCompare(B) :
          A - B)
        })
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
            ? { orderBy: sortBy, asc: orderBy === 'asc', name: searchContent, pageSize, pageNumb: isLoadMore ? pageNumb + 1 : 1 } 
            : { type: topIndexToValueMap[activeTabIndex] },
          responsePayload: r => isAll ? r : {list: r},
          meta: { isLoadMore }
        }
      )
    )
  }
}

// DONE
export function getMarketWallet(isLoadMore) {
  return (dispatch, getState) => {
    const { pageSize, pageNumb } = getState().userMarketWallet;
    dispatch(
      asyncFunction(
        apiGetTradedMarketCt({ pageSize, pageNumb, isLoadMore }),
        MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED, MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED, MARKET_GET_TRADED_MARKET_WITH_CT_FAILED,
        {
          meta: { isLoadMore }
        }
      )
    )
  }
}

export function toggleSavedMarket(market) {
  return market.following ? delSavedMarket(market) : addSavedMarket(market)
}

export function addSavedMarket(market) {
  return dispatch => {
    dispatch({
      type: MARKET_ADD_SAVED_MARKET,
      payload: market
    })
    return dispatch(addCollect('market', market.id))
  }
}
export function delSavedMarket(market) {
  return dispatch => {
    dispatch({
      type: MARKET_DEL_SAVED_MARKET,
      payload: market
    })
    return dispatch(delCollect('market', market.id))
  }
}