import {
    USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED
} from './actionTypes';
import { API_USER_COLLECT_LIST } from './api';
import fetch from '../lib/util/fetch';
import { asyncFunction } from '../integrator'

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