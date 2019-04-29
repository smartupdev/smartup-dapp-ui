import {
  USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED
} from './actionTypes';
import { API_USER_COLLECT_LIST, API_USER_COLLECT_ADD, API_USER_COLLECT_DEL } from './api';
import fetch from '../lib/util/fetch';
import { asyncFunction } from '../integrator'

// type: market | post | reply
export function addCollect(type, id) {
  return asyncFunction(
    () => fetch.post(API_USER_COLLECT_ADD, { type, objectMark: id })
  )
}

// type: market | post | reply
export function delCollect(type, id) {
  return asyncFunction(
    () => fetch.post(API_USER_COLLECT_DEL, { type, objectMark: id })
  )
}


//收藏列表
export function getUserCollectLists(requestParam) {
  requestParam = { type: 'market' }
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.post,
        USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED,
        {
          params: API_USER_COLLECT_LIST,
          params2: requestParam,
          responsePayload: reps => reps.list
        }
      )
    )
}