import {
    POST_TOGGLE_POST_LIKE, POST_TOGGLE_POST_DISLIKE, POST_TOGGLE_POST_FOLLOW,
    USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
} from '../actions/actionTypes';

import { postMassage, toggleLike, toggleDislike, toggleFollow, updateLoadMore } from '../integrator/massager'
import { changeArrayById } from '../lib/util/reducerHelper'

export const initialState = {
  posts: [],
  getting: false,
  error: null,
  pageNumb: 1,
  pageSize: 10,
  hasNextPage: false,
}


export default (state = initialState, action) => {
    switch (action.type) {
      case USER_POST_COLLECTED_REQUESTED:
        return {
          ...state,
          getting: true,
        }
      case USER_POST_COLLECTED_SUCCEEDED: {
        const { list, pageNumb, hasNextPage } = action.payload
        return {
          ...state,
          posts: updateLoadMore(state.posts, list.map(postMassage), action.meta.isLoadMore, 'postId'),
          getting: false,
          pageNumb,
          hasNextPage,
          error: initialState.error,
        }
      }
      case USER_POST_COLLECTED_FAIL:
        return {
          ...state,
          getting: false,
          error: action.payload,
        }
      case POST_TOGGLE_POST_LIKE: 
        return {
          ...state,
          posts: changeArrayById(state.posts, action.payload.id, toggleLike),
        } 

      case POST_TOGGLE_POST_DISLIKE: 
        return {
          ...state,
          posts: changeArrayById(state.posts, action.payload.id, toggleDislike),
        }
      
      case POST_TOGGLE_POST_FOLLOW:
        return {
          ...state,
          posts: changeArrayById(state.posts, action.payload.id, toggleFollow),
        }
  
      default:
        return state;
    }
};