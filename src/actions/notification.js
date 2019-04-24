import {
    USER_NOTIFICATION_LIST_REQUESTED, USER_NOTIFICATION_LIST_SUCCEEDED, USER_NOTIFICATION_LIST_FAILED,
    USER_NOTIFICATION_READ_REQUESTED, USER_NOTIFICATION_READ_SUCCEEDED, USER_NOTIFICATION_READ_FAILED,
    USER_NOTIFICATION_UNREAD_REQUESTED, USER_NOTIFICATION_UNREAD_SUCCEEDED, USER_NOTIFICATION_UNREAD_FAILED
} from './actionTypes';
import { API_USER_NOTIFICATION_LIST, API_USER_NOTIFICATION_SET_READ, API_USER_NOTIFICATION_UNREAD } from './api';
import fetch from '../lib/util/fetch';
import { asyncFunction } from '../integrator'

//通知列表
export function getNotificationList() {
    return (dispatch, getState) =>
        dispatch(
            asyncFunction(
                fetch.post,
                USER_NOTIFICATION_LIST_REQUESTED, USER_NOTIFICATION_LIST_SUCCEEDED, USER_NOTIFICATION_LIST_FAILED,
                {
                    params: API_USER_NOTIFICATION_LIST,
                    responsePayload: reps => reps.list
                }
            )
        )
}

//设为已读
export function setNotificationRead(notificationId) {
    return (dispatch, getState) =>
        dispatch(
            asyncFunction(
                fetch.post,
                USER_NOTIFICATION_READ_REQUESTED, USER_NOTIFICATION_READ_SUCCEEDED, USER_NOTIFICATION_READ_FAILED,
                {
                    params: API_USER_NOTIFICATION_SET_READ,
                    params2: {notificationId},
                    meta: {notificationId}
                }
            )
        )
}

//未读通知
export function getUnreadNotifications(requestParam) {
    return (dispatch, getState) =>
        dispatch(
            asyncFunction(
                fetch.post,
                USER_NOTIFICATION_UNREAD_REQUESTED, USER_NOTIFICATION_UNREAD_SUCCEEDED, USER_NOTIFICATION_UNREAD_FAILED,
                {
                    params: API_USER_NOTIFICATION_UNREAD,
                    params2: requestParam,
                }
            )
        )
}