import {
  POST_NEW_COMMENT_ONCHANGE,
  POST_LIST_REQUESTED, POST_LIST_SUCCEEDED, POST_LIST_FAILED,
  POST_ONE_REQUESTED, POST_ONE_SUCCEEDED, POST_ONE_FAILED,
  POST_REPLY_CHILDREN_LIST_REQUESTED, POST_REPLY_CHILDREN_LIST_SUCCEEDED, POST_REPLY_CHILDREN_LIST_FAILED,
  POST_REPLY_LIST_REQUESTED, POST_REPLY_LIST_SUCCEEDED, POST_REPLY_LIST_FAILED,
  POST_REPLY_ONE_REQUESTED, POST_REPLY_ONE_SUCCEEDED, POST_REPLY_ONE_FAILED,
  POST_USER_ADD_REQUESTED, POST_USER_ADD_SUCCEEDED, POST_USER_ADD_FAILED,
  POST_USER_REPLAY_ADD_REQUESTED, POST_USER_REPLAY_ADD_SUCCEEDED, POST_USER_REPLAY_ADD_FAILED,
  POST_TOGGLE_POST_LIKE, POST_TOGGLE_POST_DISLIKE, POST_TOGGLE_REPLY_LIKE, POST_TOGGLE_REPLY_DISLIKE
} from './actionTypes';
import {
  API_POST_LIKE,
  API_POST_LIST, API_POST_ONE, API_POST_REPLY_CHILDREN_LIST,
  API_POST_REPLY_LIST, API_POST_REPLY_ONE, API_USER_POST_ADD, API_USER_POST_REPLY_ADD
} from './api';
import fetch from '../lib/util/fetch';
import { asyncFunction } from '../integrator'

export function onChangeNewComment(value) {
  return {
    type: POST_NEW_COMMENT_ONCHANGE,
    payload: { value }
  }
}

/*
查询主题列表
requestParam: type(root/market), marketAddress(如果type=root marketAddress为空)
*/
export function getRootPost() {
  return getPostList({ type: 'root' })
}

export function getMarketPost() {
  return (dispatch, getState) => {
    dispatch(
      getPostList({ type: 'market', marketId: getState().market.currentMarketId })
    )
  }
}

function getPostList(requestParam) {
  return asyncFunction(
    fetch.post,
    POST_LIST_REQUESTED, POST_LIST_SUCCEEDED, POST_LIST_FAILED,
    {
      params: API_POST_LIST,
      params2: requestParam,
      responsePayload: reps => reps.list
    }
  )
}

export function getPost(postId) {
  return asyncFunction(
    fetch.post,
    POST_ONE_REQUESTED, POST_ONE_SUCCEEDED, POST_ONE_FAILED,
    {
      params: API_POST_ONE,
      params2: { postId },
    }
  )
}

/*
回复下回复列表
requestParam: fatherId
*/
export function getPostReplyChildrenList(requestParam) {
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.post,
        POST_REPLY_CHILDREN_LIST_REQUESTED, POST_REPLY_CHILDREN_LIST_SUCCEEDED, POST_REPLY_CHILDREN_LIST_FAILED,
        {
          params: API_POST_REPLY_CHILDREN_LIST,
          params2: requestParam,
          responsePayload: reps => reps.list
        }
      )
    )
}

/*
主题下回复列表
requestParam: postId
*/
export function getReplyList(postId) {
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.post,
        POST_REPLY_LIST_REQUESTED, POST_REPLY_LIST_SUCCEEDED, POST_REPLY_LIST_FAILED,
        {
          params: API_POST_REPLY_LIST,
          params2: { postId },
        }
      )
    )
}

/*
回复详情
requestParam: replyId
*/
export function getReplyOne(requestParam) {
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.post,
        POST_REPLY_ONE_REQUESTED, POST_REPLY_ONE_SUCCEEDED, POST_REPLY_ONE_FAILED,
        {
          params: API_POST_REPLY_ONE,
          params2: requestParam
        }
      )
    )
}

/*
发布主题
requestParam: type(root=系统讨论区, market=市场讨论区), marketAddress(如果type=root marketAddress为空), title, description
*/
export function addMarketPost(title, text, photo) {
  return (dispatch, getState) =>
    dispatch(
      addPost({ type: 'market', marketId: getState().market.currentMarketId, title, description: text, photo })
    )

}
export function addRootPost() {

}

export function addPost(requestParam) {
  return dispatch =>
    dispatch(
      asyncFunction(
        fetch.post,
        null, null, null,
        {
          params: API_USER_POST_ADD,
          params2: requestParam
        }
      )
    )
}

/*
发布回复
requestParam: postId, fatherId(可以空, 如果对个一个回复进行回复则需填写, 且只能回复一级), content
*/
export function reply() {
  return async (dispatch, getState) => {
    const { detail: {postId}, newComment } = getState().post
    const [e, r] = await dispatch(
      asyncFunction(
        fetch.post,
        POST_USER_REPLAY_ADD_REQUESTED, POST_USER_REPLAY_ADD_SUCCEEDED, POST_USER_REPLAY_ADD_FAILED,
        {
          params: API_USER_POST_REPLY_ADD,
          params2: { postId, content: newComment }
        }
      )
    )
    if(!e) dispatch(getReplyList(postId))
  }
}

export function toggleLikePost(post) {
  return toggleLikeDislike(post, POST_TOGGLE_POST_LIKE, true, 'post')
}

export function toggleDislikePost(post) {
  return toggleLikeDislike(post, POST_TOGGLE_POST_DISLIKE, false, 'post')
}

export function toggleLikeReply(reply) {
  return toggleLikeDislike(reply, POST_TOGGLE_REPLY_LIKE, true)
}

export function toggleDislikeReply(reply) {
  return toggleLikeDislike(reply, POST_TOGGLE_REPLY_DISLIKE, false)
}

// type: reply || post
export function toggleLikeDislike(postOrReplyObject, actionType, isLike, type = 'reply', ) { 
  const { id, isDisliked, isLiked } = postOrReplyObject
  return dispatch => {
    dispatch({ type: actionType, payload: {id, isDisliked, isLiked} })
    dispatch(
      asyncFunction(
        () => fetch.post(API_POST_LIKE, { type, id, isLike, isMark: isLike ? !isLiked : !isDisliked }),
      )
    )
  }

}










