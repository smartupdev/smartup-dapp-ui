import {
    USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
    USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
    USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
    USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
} from '../actions/actionTypes';

export const initialState = {
    pageSize: 10,

    collectedPosts: [],
    gettingCollectedPosts: false,
    collectedPostsError: null,
    collectedPostsPageNumb: 0,
    collectedPostsHasNextPage: true,
  
    createdPosts: [],
    gettingCreatedPosts: false,
    createdPostsError: null,
    createdPostsPageNumb: 0,
    createdPostsHasNextPage: true,
  
    collectedReplys: [],
    gettingCollectedReplys: false,
    collectedReplysError: null,
    collectedReplysPageNumb: 0,
    collectedReplysHasNextPage: true,
  
    createdReplys: [],
    gettingCreatedReplys: false,
    createdReplysError: null,
    createdReplysPageNumb: 0,
    createdReplysHasNextPage: true,
}


export default (state = initialState, action) => {
    switch (action.type) {
      case USER_POST_COLLECTED_REQUESTED:
        return {
          ...state,
          gettingCollectedPosts: true,
        }
      case USER_POST_COLLECTED_SUCCEEDED: {
        const { list: postList, pageNumb, hasNextPage } = action.payload;
        let tempPosts = state.collectedPosts.concat(postList);
        return {
          ...state,
          collectedPosts: tempPosts,
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
        const { list: postList, pageNumb, hasNextPage } = action.payload;
        let tempPosts = state.createdPosts.concat(postList);
        return {
          ...state,
          createdPosts: tempPosts,
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
        const { list: replyList, pageNumb, hasNextPage } = action.payload;
        let tempReplys = state.collectedReplys.concat(replyList);
        return {
          ...state,
          collectedReplys: tempReplys,
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
        const { list: replyList, pageNumb, hasNextPage } = action.payload;
        let tempReplys = state.createdReplys.concat(replyList);
        return {
          ...state,
          createdReplys: tempReplys,
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

      default:
        return state;
    }
};