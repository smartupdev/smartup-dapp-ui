import {
    PERSONAL_CENTER_RESET,
    POST_TOGGLE_POST_LIKE, POST_TOGGLE_POST_DISLIKE, POST_TOGGLE_POST_FOLLOW,
    POST_TOGGLE_REPLY_LIKE, POST_TOGGLE_REPLY_DISLIKE, POST_TOGGLE_REPLY_FOLLOW,
    USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
    USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
    USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
    USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
} from '../actions/actionTypes';

import { postMassage, replyMassage, toggleLike, toggleDislike, toggleFollow } from './post'
import { changeArrayById } from '../lib/util/reducerHelper'

export const initialState = {
    pageSize: 10,

    collectedPosts: [],
    gettingCollectedPosts: false,
    collectedPostsError: null,
    collectedPostsPageNumb: 1,
    collectedPostsHasNextPage: false,
  
    createdPosts: [],
    gettingCreatedPosts: false,
    createdPostsError: null,
    createdPostsPageNumb: 1,
    createdPostsHasNextPage: false,
  
    collectedReplys: [],
    gettingCollectedReplys: false,
    collectedReplysError: null,
    collectedReplysPageNumb: 1,
    collectedReplysHasNextPage: false,
  
    createdReplys: [],
    gettingCreatedReplys: false,
    createdReplysError: null,
    createdReplysPageNumb: 1,
    createdReplysHasNextPage: false,
}


export default (state = initialState, action) => {
    switch (action.type) {
      case USER_POST_COLLECTED_REQUESTED:
        return {
          ...state,
          gettingCollectedPosts: true,
        }
      case USER_POST_COLLECTED_SUCCEEDED: {
        const { list, pageNumb, hasNextPage } = action.payload
        const postList = list.map(postMassage)
        return {
          ...state,
          collectedPosts: action.meta.isLoadMore ? [...state.collectedPosts, ...postList] : postList,
          gettingCollectedPosts: false,
          collectedPostsPageNumb: pageNumb,
          collectedPostsHasNextPage: hasNextPage,
          collectedPostsError: initialState.collectedPostsError,
        }
      }
      case USER_POST_COLLECTED_FAIL:
        return {
          ...state,
          gettingCollectedPosts: false,
          collectedPostsError: action.payload,
        }
      case USER_POST_CREATED_REQUESTED:
        return {
          ...state,
          gettingCreatedPosts: true,
        }
      case USER_POST_CREATED_SUCCEEDED: {
        const { list, pageNumb, hasNextPage } = action.payload
        const postList = list.map(postMassage)
        return {
          ...state,
          createdPosts: action.meta.isLoadMore ? [...state.createdPosts, ...postList] : postList,
          gettingCreatedPosts: false,
          createdPostsPageNumb: pageNumb,
          createdPostsHasNextPage: hasNextPage,
          createdPostsError: initialState.createdPostsError,
        }
      }
      case USER_POST_CREATED_FAIL:
        return {
          ...state,
          gettingCreatedPosts: false,
          createdPostsError: action.payload,
        }
      case USER_REPLY_COLLECTED_REQUESTED:
        return {
          ...state,
          gettingCollectedReplys: true,
        }
      case USER_REPLY_COLLECTED_SUCCEEDED: {
        const { list, pageNumb, hasNextPage } = action.payload
        const replyList = list.map(replyMassage)
        return {
          ...state,
          collectedReplys: action.meta.isLoadMore ? [...state.collectedReplys, ...replyList] : replyList,
          gettingCollectedReplys: false,
          collectedReplysPageNumb: pageNumb,
          collectedReplysHasNextPage: hasNextPage,
          collectedReplysError: initialState.collectedReplysError,
        }
      }
      case USER_REPLY_COLLECTED_FAIL:
        return {
          ...state,
          gettingCollectedReplys: false,
          collectedReplysError: action.payload,
        }
      case USER_REPLY_CREATED_REQUESTED:
        return {
          ...state,
          gettingCreatedReplys: true,
        }
      case USER_REPLY_CREATED_SUCCEEDED: {
        const { list, pageNumb, hasNextPage } = action.payload
        const replyList = list.map(replyMassage)
        return {
          ...state,
          createdReplys: action.meta.isLoadMore ? [...state.createdReplys, ...replyList] : replyList,
          gettingCreatedReplys: false,
          createdReplysPageNumb: pageNumb,
          createdReplysHasNextPage: hasNextPage,
          createdReplysError: initialState.createdReplysError,
        }
      }
      case USER_REPLY_CREATED_FAIL:
        return {
          ...state,
          gettingCreatedReplys: false,
          createdReplysError: action.payload,
        }

        case POST_TOGGLE_POST_LIKE: 
          return {
            ...state,
            collectedPosts: changeArrayById(state.collectedPosts, action.payload.id, toggleLike),
            createdPosts: changeArrayById(state.createdPosts, action.payload.id, toggleLike)
          } 

        case POST_TOGGLE_POST_DISLIKE: 
          return {
            ...state,
            collectedPosts: changeArrayById(state.collectedPosts, action.payload.id, toggleDislike),
            createdPosts: changeArrayById(state.createdPosts, action.payload.id, toggleDislike)
          }
        
        case POST_TOGGLE_POST_FOLLOW:
          return {
            ...state,
            collectedPosts: changeArrayById(state.collectedPosts, action.payload.id, toggleFollow),
            createdPosts: changeArrayById(state.createdPosts, action.payload.id, toggleFollow)
          }

        case POST_TOGGLE_REPLY_LIKE: 
          return {
            ...state,
            collectedReplys: changeArrayById(state.collectedReplys, action.payload.id, toggleLike),
            createdReplys: changeArrayById(state.createdReplys, action.payload.id, toggleLike),
          } 
        
        case POST_TOGGLE_REPLY_DISLIKE: 
          return {
            ...state,
            collectedReplys: changeArrayById(state.collectedReplys, action.payload.id, toggleDislike),
            createdReplys: changeArrayById(state.createdReplys, action.payload.id, toggleDislike),
          }
        case POST_TOGGLE_REPLY_FOLLOW:
          return {
            ...state,
            collectedReplys: changeArrayById(state.collectedReplys, action.payload.id, toggleFollow),
            createdReplys: changeArrayById(state.createdReplys, action.payload.id, toggleFollow),
          }
  
      case PERSONAL_CENTER_RESET:
        return initialState
  
      default:
        return state;
    }
};