import {
    USER_POST_COLLECTED_REQUESTED,USER_POST_COLLECTED_SUCCEEDED,USER_POST_COLLECTED_FAIL,
    USER_POST_CREATED_REQUESTED,USER_POST_CREATED_SUCCEEDED,USER_POST_CREATED_FAIL,
    USER_REPLY_COLLECTED_REQUESTED,USER_REPLY_COLLECTED_SUCCEEDED,USER_REPLY_COLLECTED_FAIL,
    USER_REPLY_CREATED_REQUESTED,USER_REPLY_CREATED_SUCCEEDED,USER_REPLY_CREATED_FAIL,
  } from '../actionTypes'
  import {asyncFunction} from '../integrator'
  import {
    API_USER_POST_COLLECTED,API_USER_POST_CREATED,
    API_USER_REPLY_CREATED,API_USER_REPLY_COLLECTED,
  } from './api';
  import fetch from '../lib/util/fetch';

  //用户收藏的帖子
export function getCollectedPosts(){
    return (dispatch,getState)=>{
      return dispatch(
        asyncFunction(
          fetch.post,
          USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
          { params: API_USER_POST_COLLECTED,
            params2:{pageNumb:getState().personalCenterPost.collectedPostsPageNumb + 1, pageSize: getState().personalCenterPost.pageSize}
           }
        )
      )
    }
  }
  
  //用户创建的帖子
  export function getCreatedPosts(){
    return (dispatch,getState)=>{
      return dispatch(
        asyncFunction(
          fetch.post,
          USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
          { params: API_USER_POST_CREATED,
            params2:{pageNumb:getState().personalCenterPost.createdPostsPageNumb + 1, pageSize: getState().personalCenterPost.pageSize}
           }
        )
      )
    }
  }
  
  //用户收藏的回复
  export function getCollectedReplys(){
    return (dispatch,getState)=>{
      return dispatch(
        asyncFunction(
          fetch.post,
          USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
          { params: API_USER_REPLY_COLLECTED,
            params2:{pageNumb:getState().personalCenterPost.collectedReplysPageNumb + 1, pageSize: getState().personalCenterPost.pageSize}
           }
        )
      )
    }
  }
  
  //用户创建的回复
  export function getCreatedReplys(){
    return (dispatch,getState)=>{
      return dispatch(
        asyncFunction(
          fetch.post,
          USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
          { params: API_USER_REPLY_CREATED,
            params2:{pageNumb:getState().personalCenterPost.createdReplysPageNumb + 1, pageSize: getState().personalCenterPost.pageSize}
           }
        )
      )
    }
  }