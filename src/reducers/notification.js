import {
  USER_NOTIFICATION_TOGGLE_UNREAD, USER_NOTIFICATION_KEYWORD_CHANGE,
  USER_NOTIFICATION_LIST_REQUESTED, USER_NOTIFICATION_LIST_SUCCEEDED, USER_NOTIFICATION_LIST_FAILED,
  USER_NOTIFICATION_READ_REQUESTED, USER_NOTIFICATION_READ_SUCCEEDED, USER_NOTIFICATION_READ_FAILED,
  USER_NOTIFICATION_UNREAD_REQUESTED, USER_NOTIFICATION_UNREAD_SUCCEEDED, USER_NOTIFICATION_UNREAD_FAILED
} from '../actions/actionTypes';

import { changeArrayById } from '../lib/util/reducerHelper'

export const initialState = {

  showUnreadOnly: false,
  keyword: '',

  notifications: [],
  // filteredNotification: [],
  gettingNotifications: false,
  notificationsError: null,
  unreadCount: 0,

  // readingNotification: false,
  // readingNotificationError: null,

  // unReadNotifications: [],
  // unReadCount: null,
  // gettingUnreads: false,
  // unreadsError: null,

}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_NOTIFICATION_KEYWORD_CHANGE: 
      return {
        ...state,
        keyword: action.payload.value
      }
    case USER_NOTIFICATION_TOGGLE_UNREAD: 
      return {
        ...state,
        showUnreadOnly: !state.showUnreadOnly
      }
    case USER_NOTIFICATION_KEYWORD_CHANGE: 
      return {
        ...state,
      }

    case USER_NOTIFICATION_LIST_REQUESTED:
      return {
        ...state,
        gettingNotifications: true,
      };
    case USER_NOTIFICATION_LIST_SUCCEEDED:
      return {
        ...state,
        notifications: action.payload,
        gettingNotifications: false,
        notificationsError: initialState.notificationsError,
      };
    case USER_NOTIFICATION_LIST_FAILED:
      return {
        ...state,
        gettingNotifications: false,
        notificationsError: action.payload,
      };
    // case USER_NOTIFICATION_READ_REQUESTED:
    //   return {
    //     ...state,
    //     readingNotification: true,
    //   };
    case USER_NOTIFICATION_READ_SUCCEEDED:
      return {
        ...state,
        // readingNotification: false,
        // readingNotificationError: initialState.readingNotificationError,
        notifications: state.notifications.map(n =>
          action.meta.notificationIds.includes(n.notificationId) 
          ? { ...n, isRead: true } 
          : n
        ),
        unreadCount: state.unreadCount - action.meta.notificationIds.length
      };
    // case USER_NOTIFICATION_READ_FAILED:
    //   return {
    //     ...state,
    //     readingNotification: false,
    //     readingNotificationError: action.payload,
    //   };
    // case USER_NOTIFICATION_UNREAD_REQUESTED:
    //   return {
    //     ...state,
    //     gettingUnreads: true,
    //   };
    case USER_NOTIFICATION_UNREAD_SUCCEEDED:
      return {
        ...state,
        // unReadNotifications: action.payload.list,
        unreadCount: action.payload.count,
        // gettingUnreads: false,
        // unreadsError: initialState.unreadsError,
      };
    // case USER_NOTIFICATION_UNREAD_FAILED:
    //   return {
    //     ...state,
    //     gettingUnreads: false,
    //     unreadsError: action.payload,
    //   };
    default:
      return state;
  }
};