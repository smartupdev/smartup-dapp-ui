import {
    POST_TOGGLE_REPLY_LIKE, POST_TOGGLE_REPLY_DISLIKE, POST_TOGGLE_REPLY_FOLLOW,
    USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
} from '../actions/actionTypes';

import { replyMassage, toggleLike, toggleDislike, toggleFollow, updateLoadMore } from '../integrator/massager'
import { changeArrayById } from '../lib/util/reducerHelper'

export const initialState = {
  replys: [],
  getting: false,
  error: null,
  pageNumb: 1,
  pageSize: 10,
  hasNextPage: false,
}


export default (state = initialState, action) => {
    switch (action.type) {
      case USER_REPLY_COLLECTED_REQUESTED:
        return {
          ...state,
          getting: true,
        }
      case USER_REPLY_COLLECTED_SUCCEEDED: {
        const { list, pageNumb, hasNextPage } = action.payload
        return {
          ...state,
          replys: updateLoadMore(state.replys, list.map(replyMassage), action.meta.isLoadMore, 'replyId'),
          getting: false,
          pageNumb,
          hasNextPage,
          error: initialState.error,
        }
      }
      case USER_REPLY_COLLECTED_FAIL:
        return {
          ...state,
          getting: false,
          error: action.payload,
        }
      case POST_TOGGLE_REPLY_LIKE: 
        return {
          ...state,
          replys: changeArrayById(state.replys, action.payload.id, toggleLike),
        } 
      
      case POST_TOGGLE_REPLY_DISLIKE: 
        return {
          ...state,
          replys: changeArrayById(state.replys, action.payload.id, toggleDislike),
        }
      case POST_TOGGLE_REPLY_FOLLOW:
        return {
          ...state,
          replys: changeArrayById(state.replys, action.payload.id, toggleFollow),
        }  
      default:
        return state;
    }
};