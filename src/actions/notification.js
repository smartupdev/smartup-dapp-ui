import {
  USER_NOTIFICATION_TOGGLE_UNREAD, USER_NOTIFICATION_KEYWORD_CHANGE,
  USER_NOTIFICATION_LIST_REQUESTED, USER_NOTIFICATION_LIST_SUCCEEDED, USER_NOTIFICATION_LIST_FAILED,
  USER_NOTIFICATION_READ_REQUESTED, USER_NOTIFICATION_READ_SUCCEEDED, USER_NOTIFICATION_READ_FAILED,
  USER_NOTIFICATION_UNREAD_REQUESTED, USER_NOTIFICATION_UNREAD_SUCCEEDED, USER_NOTIFICATION_UNREAD_FAILED
} from './actionTypes';
import { API_USER_NOTIFICATION_LIST, API_USER_NOTIFICATION_SEARCH, API_USER_NOTIFICATION_SET_READ, API_USER_NOTIFICATION_UNREAD } from './api';
import fetch, {delay} from '../lib/util/fetch';
import { asyncFunction } from '../integrator'

/*
=> toggle among type, fetch new data
=> unreadCount changed, fetch new unread message
  => add to list if match criteria
*/
export function watch() {
  return async (dispatch, getState) => {
    while(true) {
      const { notification: {unreadCount}, user: { loggedIn } } = getState()
      if(loggedIn) {
        const [error, response] = await dispatch(getUnread())
        if(!error && response && response.count !== unreadCount) dispatch(getList(false, true))
      }
      await delay(10000)
    }
  }
}

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
          responsePayload: r => ({...r, marketIndex: r.list.findIndex( n => n.content.marketId === getState().market.currentMarketId )}),
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
  return asyncFunction(
    fetch.post,
    USER_NOTIFICATION_UNREAD_REQUESTED, USER_NOTIFICATION_UNREAD_SUCCEEDED, USER_NOTIFICATION_UNREAD_FAILED,
    {
      params: API_USER_NOTIFICATION_UNREAD,
    }
  )
}