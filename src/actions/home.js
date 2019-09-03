import {
  HOME_RESET,
  HOME_SET_MARKET_STAGE, HOME_SET_MARKET_FILTER,
  HOME_SET_EXPANDED_RECORDS, 
  HOME_SET_SORTING, HOME_SEARCH_CONTENT_CHANGE, 
  HOME_GET_MARKET_LIST_REQUESTED, HOME_GET_MARKET_LIST_SUCCEEDED, HOME_GET_MARKET_LIST_FAILED
} from './actionTypes'
import { action } from './actionHelper'

import { apiGetMarketList } from '../integrator'

export function reset() { return action(HOME_RESET) }
export function setExpandedRecords({ record: { id }, isExpanded }) {
  return action(HOME_SET_EXPANDED_RECORDS, { id, isExpanded })
}

export function onTableHeaderClick(headerName) {
  return dispatch => {
    dispatch(action(HOME_SET_SORTING, headerName))
    dispatch(getList())
  }
}

export function onChangeFilter(index, value) {
  return dispatch => {
    dispatch(action(HOME_SET_MARKET_FILTER, {index, value}))
    dispatch(getList())
  }
}

export function onChangeStage(index, value) {
  return dispatch => {
    dispatch(action(HOME_SET_MARKET_STAGE, {index, value}))
    dispatch(getList())
  }
}

export function onSearchChange(content) {
  return action(HOME_SEARCH_CONTENT_CHANGE, content)
}

export function getList(isLoadMore) {
  return async (dispatch, getState) => {
    dispatch(action(HOME_GET_MARKET_LIST_REQUESTED))
    try {
      const {sortBy, orderBy, searchContent: keyword, filterType, pageNumb, pageSize} = getState().home;
      return dispatch(action(HOME_GET_MARKET_LIST_SUCCEEDED, await apiGetMarketList({
        sortBy, orderBy, keyword, 
        filterType,
        pageNumb, pageSize, isLoadMore
      })(), { isLoadMore }))
    }
    catch (error) {
      return dispatch(action(HOME_GET_MARKET_LIST_FAILED, error))
    }
  }
}