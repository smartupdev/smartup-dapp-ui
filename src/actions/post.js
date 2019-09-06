import {
  POST_NEW_COMMENT_ONCHANGE,
  POST_ONCHANGE_KEYWORD,
  POST_TOGGLE_POST_FOLLOW, POST_TOGGLE_REPLY_FOLLOW,
  POST_LIST_REQUESTED, POST_LIST_SUCCEEDED, POST_LIST_FAILED,
  POST_ONE_REQUESTED, POST_ONE_SUCCEEDED, POST_ONE_FAILED,
  POST_REPLY_CHILDREN_LIST_REQUESTED, POST_REPLY_CHILDREN_LIST_SUCCEEDED, POST_REPLY_CHILDREN_LIST_FAILED,
  POST_REPLY_LIST_REQUESTED, POST_REPLY_LIST_SUCCEEDED, POST_REPLY_LIST_FAILED,
  POST_REPLY_ONE_REQUESTED, POST_REPLY_ONE_SUCCEEDED, POST_REPLY_ONE_FAILED,
  // POST_USER_ADD_REQUESTED, POST_USER_ADD_SUCCEEDED, POST_USER_ADD_FAILED,
  POST_USER_REPLAY_ADD_REQUESTED, POST_USER_REPLAY_ADD_SUCCEEDED, POST_USER_REPLAY_ADD_FAILED,
  POST_ADD_SUCCEEDED,
  POST_TOGGLE_POST_LIKE, POST_TOGGLE_POST_DISLIKE, POST_TOGGLE_REPLY_LIKE, POST_TOGGLE_REPLY_DISLIKE
} from './actionTypes';
import fetch from '../lib/util/fetch';
import { 
  asyncFunction, 
  apiGetPostList, apiGetReplyList,
  API_POST_LIKE,
  API_POST_LIST, API_POST_ONE, API_POST_REPLY_CHILDREN_LIST,
  API_POST_REPLY_LIST, API_POST_REPLY_ONE, API_USER_POST_ADD, API_USER_POST_REPLY_ADD
 } from '../integrator'
import { addCollect, delCollect } from './bookmark'

export function onChangeKeyword(value) {
  return {
    type: POST_ONCHANGE_KEYWORD,
    payload: { value }
  }
}

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
// export function getRootPost() {
//   return getPostList({ type: 'root' })
// }

export function getMarketPost(isLoadMore, isPolling) {
  return (dispatch, getState) => {
    const { market: { id: marketId }, post: { pageNumb, pageSize, keyword } } = getState()
    return dispatch(
      asyncFunction(
        apiGetPostList({ marketId, keyword, pageNumb, pageSize, isLoadMore, isPolling }),
        POST_LIST_REQUESTED, POST_LIST_SUCCEEDED, POST_LIST_FAILED,
        { meta: { isLoadMore, isPolling } }
      )  
    )
  }
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
主题下回复列表
requestParam: postId
*/
export function getReplyList(postId, isLoadMore, isPolling) {
  return (dispatch, getState) => {
    const { pageNumbReply: pageNumb, pageSize } = getState().post
    return dispatch(
      asyncFunction(
        apiGetReplyList({ postId, pageNumb, pageSize, isLoadMore, isPolling }),
        POST_REPLY_LIST_REQUESTED, POST_REPLY_LIST_SUCCEEDED, POST_REPLY_LIST_FAILED,
        { meta: { isLoadMore, isPolling } }
      )
    )
  }
}

/*
发布主题
requestParam: type(root=系统讨论区, market=市场讨论区), marketAddress(如果type=root marketAddress为空), title, description
*/
export function addMarketPost(title, text, photo) {
  return (dispatch, getState) =>
    dispatch(
      addPost({ type: 'market', marketId: getState().market.id, title, description: text, photo })
    )

}

export function addPost(requestParam) {
  return dispatch =>
    dispatch(
      asyncFunction(
        fetch.post,
        null, POST_ADD_SUCCEEDED, null,
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
    const { detail: { postId }, newComment } = getState().post
    const [e] = await dispatch(
      asyncFunction(
        fetch.post,
        POST_USER_REPLAY_ADD_REQUESTED, POST_USER_REPLAY_ADD_SUCCEEDED, POST_USER_REPLAY_ADD_FAILED,
        {
          params: API_USER_POST_REPLY_ADD,
          params2: { postId, content: newComment }
        }
      )
    )
    if (!e) dispatch(getReplyList(postId))
  }
}

export function toggleLikePost(e, post) {
  e.preventDefault(); e.stopPropagation();
  return toggleLikeDislike(post, POST_TOGGLE_POST_LIKE, true, 'post')
}

export function toggleDislikePost(e, post) {
  e.preventDefault(); e.stopPropagation();
  return toggleLikeDislike(post, POST_TOGGLE_POST_DISLIKE, false, 'post')
}

export function toggleLikeReply(e, reply) {
  e.preventDefault(); e.stopPropagation();
  return toggleLikeDislike(reply, POST_TOGGLE_REPLY_LIKE, true)
}

export function toggleDislikeReply(e, reply) {
  e.preventDefault(); e.stopPropagation();
  return toggleLikeDislike(reply, POST_TOGGLE_REPLY_DISLIKE, false)
}

// type: reply || post
export function toggleLikeDislike(postOrReplyObject, actionType, isLike, type = 'reply', ) {
  const { id, isDisliked, isLiked } = postOrReplyObject
  return dispatch => {
    dispatch({ type: actionType, payload: { id, isDisliked, isLiked } })
    dispatch(
      asyncFunction(
        () => fetch.post(API_POST_LIKE, { type, id, isLike, isMark: isLike ? !isLiked : !isDisliked }),
      )
    )
  }
}

export function toggleFollowPost(e, id, value) {
  e.preventDefault(); e.stopPropagation();
  return dispatch => {
    dispatch({
      type: POST_TOGGLE_POST_FOLLOW,
      payload: { id }
    })
    return value
    ? dispatch(delCollect('post', id))
    : dispatch(addCollect('post', id))
  }
}
export function toggleFollowReply(e, id, value) {
  e.preventDefault(); e.stopPropagation();
  return dispatch => {
    dispatch({
      type: POST_TOGGLE_REPLY_FOLLOW,
      payload: { id }
    })
    return value
    ? dispatch(delCollect('reply', id))
    : dispatch(addCollect('reply', id))
  }
}
