import {
  MARKET_DETAIL_RESET,
  POST_NEW_COMMENT_ONCHANGE, POST_ONCHANGE_KEYWORD,
  POST_TOGGLE_POST_FOLLOW, POST_TOGGLE_REPLY_FOLLOW,
  POST_TOGGLE_POST_LIKE, POST_TOGGLE_POST_DISLIKE, POST_TOGGLE_REPLY_LIKE, POST_TOGGLE_REPLY_DISLIKE,
  POST_LIST_REQUESTED, POST_LIST_SUCCEEDED, POST_LIST_FAILED,
  POST_ONE_REQUESTED, POST_ONE_SUCCEEDED, POST_ONE_FAILED,
  // POST_REPLY_CHILDREN_LIST_REQUESTED, POST_REPLY_CHILDREN_LIST_SUCCEEDED, POST_REPLY_CHILDREN_LIST_FAILED,
  POST_REPLY_LIST_REQUESTED, POST_REPLY_LIST_SUCCEEDED, POST_REPLY_LIST_FAILED,
  POST_REPLY_ONE_REQUESTED, POST_REPLY_ONE_SUCCEEDED, POST_REPLY_ONE_FAILED,
  // POST_USER_ADD_REQUESTED, POST_USER_ADD_SUCCEEDED, POST_USER_ADD_FAILED,
  POST_USER_REPLAY_ADD_REQUESTED, POST_USER_REPLAY_ADD_SUCCEEDED, POST_USER_REPLAY_ADD_FAILED
} from '../actions/actionTypes';

import { changeArrayById } from '../lib/util/reducerHelper'
import { toggleFollow, toggleLike, toggleDislike, replyMassage, postMassage, updateLoadMore } from '../integrator/massager'

export const initialState = {

  keyword: '',

  posts: [],
  gettingPost: false,
  getPostError: null,
  pageSize: 10,
  pageNumb: 1,
  hasNextPage: true,

  detail: null,
  gettingDetail: false,
  getDetailError: null,
  newComment: '',

  // replyChildren: [],
  // gettingReplyChildren: false,
  // replyChildrenError: null,

  replys: [],
  pageNumbReply: 1,
  replyHasMore: false,
  gettingReply: false,
  getReplyError: null,
  /*
  [{
    content: "cmcmcm"
    createTime: "2019-04-27 17:43:25"
    fatherId: 0
    isDisliked: null
    isLiked: null
    postId: 9098959200980992
    replyId: 9146123868442624
    userAddress
  }]
  */
  replyDetail: null,
  gettingReplyDetail: false,
  replyDetailError: null,
  /*主题详情
  {
  "postId": 6859106652524544,
  "replyId": 5869106652523214,
  "fatherId": 4869106659087232,
  "userAddress": "0x8028012ef4b5aceba7778afbdf1757018af1eee8",
  "content": "post test desc",
  "createTime": "2019-04-21 10:15:38",
  "childrenPage":{"list":[]}
  }
  */

  // addingPost: false,
  // addPostError: null,

  replying: false,
  replyError: null,

}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DETAIL_RESET:
      return initialState
    case POST_ONCHANGE_KEYWORD: 
      return {
        ...state,
        keyword: action.payload.value
      }
    case POST_TOGGLE_POST_FOLLOW: 
      return {
        ...state,
        detail: state.detail && {
          ...state.detail,
          isCollect: !state.detail.isCollect
        },
        posts: changeArrayById(state.posts, action.payload.id, toggleFollow)
      }
    case POST_TOGGLE_REPLY_FOLLOW: 
      return {
        ...state,
        replys: changeArrayById(state.replys, action.payload.id, toggleFollow)
      }

    case POST_TOGGLE_POST_LIKE: {
      const { id } = action.payload
      return {
        ...state,
        detail: toggleLike(state.detail),
        posts: changeArrayById(state.posts, id, toggleLike)
      } 
    }
    case POST_TOGGLE_POST_DISLIKE: {
      const { id } = action.payload
      return {
        ...state,
        detail: toggleDislike(state.detail),
        posts: changeArrayById(state.posts, id, toggleDislike)
      }
    }
    case POST_TOGGLE_REPLY_LIKE: {
      const { id } = action.payload
      return {
        ...state,
        replys: changeArrayById(state.replys, id, toggleLike)
      } 
    }
    case POST_TOGGLE_REPLY_DISLIKE: {
      const { id } = action.payload
      return {
        ...state,
        replys: changeArrayById(state.replys, id, toggleDislike)
      }
    }

    case POST_NEW_COMMENT_ONCHANGE:
      return {
        ...state,
        newComment: action.payload.value
      }
    case POST_LIST_REQUESTED:
      return {
        ...state,
        gettingPost: true
      }
    case POST_LIST_SUCCEEDED:{
      const { list: postList, pageNumb, pageSize, hasNextPage } = action.payload
      const posts = postList.map(postMassage)
      return {
        ...state,
        posts: updateLoadMore(state.posts, posts, action.meta.isLoadMore, 'postId', action.meta.isPolling),
        pageNumb,
        pageSize,
        hasNextPage,
        gettingPost: false,
        getPostError: initialState.getPostError
      }
    }
      
    case POST_LIST_FAILED:
      return {
        ...state,
        gettingPost: false,
        getPostError: action.payload,
      }
    case POST_ONE_REQUESTED:
      return {
        ...state,
        gettingDetail: true
      }
    case POST_ONE_SUCCEEDED:
      return {
        ...state,
        detail: postMassage(action.payload),
        gettingDetail: false,
        getDetailError: initialState.getDetailError
      }
    case POST_ONE_FAILED:
      return {
        ...state,
        gettingDetail: false,
        getDetailError: action.payload,
      }
    // case POST_REPLY_CHILDREN_LIST_REQUESTED:
    //   return {
    //     ...state,
    //     gettingReplyChildren: true
    //   }
    // case POST_REPLY_CHILDREN_LIST_SUCCEEDED:
    //   return {
    //     ...state,
    //     replyChildren: action.payload,
    //     gettingReplyChildren: false,
    //     replyChildrenError: initialState.replyChildrenError
    //   }
    // case POST_REPLY_CHILDREN_LIST_FAILED:
    //   return {
    //     ...state,
    //     gettingReplyChildren: false,
    //     replyChildrenError: action.payload,
    //   }
    case POST_REPLY_LIST_REQUESTED:
      return {
        ...state,
        gettingReply: true
      }
    case POST_REPLY_LIST_SUCCEEDED:
      return {
        ...state,
        replys: updateLoadMore(state.replys, action.payload.list.map(replyMassage), action.meta.isLoadMore, 'replyId', action.meta.isPolling),
        pageNumbReply: action.payload.pageNumb,
        replyHasMore: action.payload.hasNextPage,
        gettingReply: false,
        getReplyError: initialState.getReplyError
      }
    case POST_REPLY_LIST_FAILED:
      return {
        ...state,
        gettingReply: false,
        getReplyError: action.payload,
      }
    case POST_REPLY_ONE_REQUESTED:
      return {
        ...state,
        gettingReplyDetail: true
      }
    case POST_REPLY_ONE_SUCCEEDED:
      return {
        ...state,
        replyDetail: action.payload,
        gettingReplyDetail: false,
        replyDetailError: initialState.replyDetailError
      }
    case POST_REPLY_ONE_FAILED:
      return {
        ...state,
        gettingReplyDetail: false,
        replyDetailError: action.payload,
      }
    // case POST_USER_ADD_REQUESTED:
    //   return {
    //     ...state,
    //     addingPost: true
    //   }
    // case POST_USER_ADD_SUCCEEDED:
    //   return {
    //     ...state,
    //     addingPost: false,
    //     addPostError: initialState.addPostError
    //   }
    // case POST_USER_ADD_FAILED:
    //   return {
    //     ...state,
    //     addingPost: false,
    //     addPostError: action.payload,
    //   }
    case POST_USER_REPLAY_ADD_REQUESTED:
      return {
        ...state,
        replying: true
      }
    case POST_USER_REPLAY_ADD_SUCCEEDED:
      return {
        ...state,
        replying: false,
        replyError: initialState.replyError,
        newComment: initialState.newComment,
        detail: {
          ...state.detail,
          numberOfComment: state.detail.numberOfComment + 1
        }
      }
    case POST_USER_REPLAY_ADD_FAILED:
      return {
        ...state,
        replying: false,
        replyError: action.payload,
      }
    default:
      return state;
  }
}