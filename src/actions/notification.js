import {
  USER_NOTIFICATION_TOGGLE_UNREAD, USER_NOTIFICATION_KEYWORD_CHANGE,
  USER_NOTIFICATION_LIST_REQUESTED, USER_NOTIFICATION_LIST_SUCCEEDED, USER_NOTIFICATION_LIST_FAILED,
  USER_NOTIFICATION_READ_REQUESTED, USER_NOTIFICATION_READ_SUCCEEDED, USER_NOTIFICATION_READ_FAILED,
  USER_NOTIFICATION_UNREAD_REQUESTED, USER_NOTIFICATION_UNREAD_SUCCEEDED, USER_NOTIFICATION_UNREAD_FAILED
} from './actionTypes';
import { action } from './actionHelper'
import fetch from '../lib/util/fetch'
import { asyncFunction, API_USER_NOTIFICATION_LIST, API_USER_NOTIFICATION_SEARCH, API_USER_NOTIFICATION_SET_READ, apiGetNotificationUnread } from '../integrator'

export function onChangeKeyword(value) {
  return {
    type: USER_NOTIFICATION_KEYWORD_CHANGE,
    payload: {
      value
    }
  }
}

export function toggleShowUnread() {
  return {
    type: USER_NOTIFICATION_TOGGLE_UNREAD
  }
}

//通知列表
export function getList(isLoadMore, autoFetch) { // isLoadMore can be event
  return (dispatch, getState) => {
    const { showUnreadOnly, keyword, pageNumb, pageSize } = getState().notification
    dispatch(
      asyncFunction(
        fetch.post,
        USER_NOTIFICATION_LIST_REQUESTED, USER_NOTIFICATION_LIST_SUCCEEDED, USER_NOTIFICATION_LIST_FAILED,
        {
          params: keyword && !autoFetch ? API_USER_NOTIFICATION_SEARCH : API_USER_NOTIFICATION_LIST,
          params2: keyword && !autoFetch
          ? { query: keyword, pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize } 
          : { pageNumb: isLoadMore ? pageNumb + 1 : 1, pageSize, unread: showUnreadOnly ? true : null },
          responsePayload: r => ({...r, marketIndex: r.list.findIndex( n => n.content.marketId === getState().market.id )}),
          meta: { isLoadMore, autoFetch }
          // responsePayload: reps => reps.list
        }
      )
    )
  }
}

export function readAll() {
  return (dispatch, getState) =>
    dispatch(readApi(
      getState().notification.notifications.filter(n => !n.isRead).map(n => n.notificationId)
    ))
}

export function read(id) {
  return readApi([id])
}

//设为已读
export function readApi(notificationIds) {
  if(!notificationIds.length) return () => {}
  return asyncFunction(
    fetch.post,
    USER_NOTIFICATION_READ_REQUESTED, USER_NOTIFICATION_READ_SUCCEEDED, USER_NOTIFICATION_READ_FAILED,
    {
      params: API_USER_NOTIFICATION_SET_READ,
      params2: { notificationIds },
      meta: { notificationIds }
    }
  )
}

//未读通知
export function getUnread() {
  return async (dispatch, getState) => {
    try {
      const { unreadCount } = getState().notification
      const response = await apiGetNotificationUnread()()
      if(response && response.count !== unreadCount) {
        dispatch(action(USER_NOTIFICATION_UNREAD_SUCCEEDED, response))
        dispatch(getList(false, true))
      } 
      else console.debug('Notification unread count no change')
    }
    catch (error) {
      console.debug(error)
    }
  }  
}