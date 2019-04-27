import {
    POST_LIST_REQUESTED, POST_LIST_SUCCEEDED, POST_LIST_FAILED,
    POST_ONE_REQUESTED, POST_ONE_SUCCEEDED, POST_ONE_FAILED,
    POST_REPLY_CHILDREN_LIST_REQUESTED, POST_REPLY_CHILDREN_LIST_SUCCEEDED, POST_REPLY_CHILDREN_LIST_FAILED,
    POST_REPLY_LIST_REQUESTED, POST_REPLY_LIST_SUCCEEDED, POST_REPLY_LIST_FAILED,
    POST_REPLY_ONE_REQUESTED, POST_REPLY_ONE_SUCCEEDED, POST_REPLY_ONE_FAILED,
    POST_USER_ADD_REQUESTED, POST_USER_ADD_SUCCEEDED, POST_USER_ADD_FAILED,
    POST_USER_REPLAY_ADD_REQUESTED, POST_USER_REPLAY_ADD_SUCCEEDED, POST_USER_REPLAY_ADD_FAILED
} from '../actions/actionTypes';

function postMassage(p) {
    return {
        ...p,
        id: p.postId, 
        authorName: p.username || p.userAddress, 
        time: p.createTime, 
        // title, 
        content: p.description, 
        // numberOfLike, 
        // numberOfDislike, 
        // numberOfComment, 
    }
}

export const initialState = {

    posts: [],
    gettingPost: false,
    getPostError: null,
    pageSize: 10,
    pageNumb: 0,
    hasNextPage: true,

    /*主题列表
    [
      {
        "postId": 6859106652524544,
        "type": "market",
        "marketAddress": "0x4b331d6AdCdBE3d9228c2BbA113b93681958263F",
        "userAddress": "0x8028012ef4b5aceba7778afbdf1757018af1eee8",
        "title": "post test title",
        "description": "post test desc",
        "createTime": "2019-04-21 10:15:38"
      }
    ]
    */

    detail: null,
    gettingDetail: false,
    getDetailError: null,
    /*主题详情
    {
    "postId": 6859106652524544,
    "type": "market",
    "marketAddress": "0x4b331d6AdCdBE3d9228c2BbA113b93681958263F",
    "userAddress": "0x8028012ef4b5aceba7778afbdf1757018af1eee8",
    "title": "post test title",
    "description": "post test desc",
    "createTime": "2019-04-21 10:15:38"
    }
    */

    replyChildren: [],
    gettingReplyChildren: false,
    replyChildrenError: null,

    postChildren: [],
    gettingPostChildren: false,
    postChildrenError: null,

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

    addingPost: false,
    addPostError: null,

    addingPostReply: false,
    addPostReplyError: null,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_LIST_REQUESTED:
            return {
                ...state,
                gettingPost: true
            }
        case POST_LIST_SUCCEEDED:{
            const {list: postList, pageNumb,pageSize,hasNextPage} = action.payload;
            return {
                ...state,
                posts: postList.map(postMassage),
                pageNumb,pageSize,hasNextPage,
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
        case POST_REPLY_CHILDREN_LIST_REQUESTED:
            return {
                ...state,
                gettingReplyChildren: true
            }
        case POST_REPLY_CHILDREN_LIST_SUCCEEDED:
            return {
                ...state,
                replyChildren: action.payload,
                gettingReplyChildren: false,
                replyChildrenError: initialState.replyChildrenError
            }
        case POST_REPLY_CHILDREN_LIST_FAILED:
            return {
                ...state,
                gettingReplyChildren: false,
                replyChildrenError: action.payload,
            }
        case POST_REPLY_LIST_REQUESTED:
            return {
                ...state,
                gettingPostChildren: true
            }
        case POST_REPLY_LIST_SUCCEEDED:
            return {
                ...state,
                postChildren: action.payload,
                gettingPostChildren: false,
                postChildrenError: initialState.postChildrenError
            }
        case POST_REPLY_LIST_FAILED:
            return {
                ...state,
                gettingPostChildren: false,
                postChildrenError: action.payload,
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
        case POST_USER_ADD_REQUESTED:
            return {
                ...state,
                addingPost: true
            }
        case POST_USER_ADD_SUCCEEDED:
            return {
                ...state,
                addingPost: false,
                addPostError: initialState.addPostError
            }
        case POST_USER_ADD_FAILED:
            return {
                ...state,
                addingPost: false,
                addPostError: action.payload,
            }
        case POST_USER_REPLAY_ADD_REQUESTED:
            return {
                ...state,
                addingPostReply: true
            }
        case POST_USER_REPLAY_ADD_SUCCEEDED:
            return {
                ...state,
                addingPostReply: false,
                addPostReplyError: initialState.addPostReplyError
            }
        case POST_USER_REPLAY_ADD_FAILED:
            return {
                ...state,
                addingPostReply: false,
                addPostReplyError: action.payload,
            }
        default:
            return state;
    }
}