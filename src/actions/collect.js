import {
    USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
    USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
    USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED
} from './actionTypes';
import { API_USER_COLLECT_ADD, API_USER_COLLECT_DEL, API_USER_COLLECT_LIST } from './api';
import fetch from '../lib/util/fetch';
import { asyncFunction } from '../integrator'

//添加收藏
export function addUserCollect(requestParam) {
    return (dispatch, getState) =>
        dispatch(
            asyncFunction(
                fetch.post,
                USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
                {
                    params: API_USER_COLLECT_ADD,
                    params2: requestParam,
                }
            )
        )
}

//取消收藏
export function delUserCollect(requestParam) {
    return (dispatch, getState) =>
        dispatch(
            asyncFunction(
                fetch.post,
                USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
                {
                    params: API_USER_COLLECT_DEL,
                    params2: requestParam,
                }
            )
        )
}

//收藏列表
export function getUserCollectLists(requestParam) {
    requestParam ={type:'market'}
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