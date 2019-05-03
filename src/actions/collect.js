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
export function getUserCollectLists(isLoadMore) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().collect
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED,
        {
          params: API_USER_COLLECT_LIST,
          params2: { type: 'market', pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize },
          // responsePayload: reps => reps.list,
          meta: {isLoadMore}
        }
      )
    )
  }
}