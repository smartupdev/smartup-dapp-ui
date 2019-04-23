import {
    USER_COLLECT_ADD_REQUESTED, USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_ADD_FAILED,
    USER_COLLECT_DEL_REQUESTED, USER_COLLECT_DEL_SUCCEEDED, USER_COLLECT_DEL_FAILED,
    USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED
} from '../actions/actionTypes';
export const initialState = {

    collects: [],
    gettingCollects: false,
    collectsError: null,

    addingCollect: false,
    addCollectError: null,

    delingCollect: false,
    delCollectError: null,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_COLLECT_ADD_REQUESTED:
            return {
                ...state,
                addingCollect: true,
            };
        case USER_COLLECT_ADD_SUCCEEDED:
            return {
                ...state,
                addingCollect: false,
                addCollectError: initialState.addCollectError,
            };
        case USER_COLLECT_ADD_FAILED:
            return {
                ...state,
                addingCollect: false,
                addCollectError: action.payload,
            };
        case USER_COLLECT_DEL_REQUESTED:
            return {
                ...state,
                addingCollect: true,
            };
        case USER_COLLECT_DEL_SUCCEEDED:
            return {
                ...state,
                delingCollect: false,
                delCollectError: initialState.delCollectError,
            };
        case USER_COLLECT_DEL_FAILED:
            return {
                ...state,
                delingCollect: false,
                delCollectError: action.payload,
            };
        case USER_COLLECT_LIST_REQUESTED:
            return {
                ...state,
                gettingCollects: true,
            };
        case USER_COLLECT_LIST_SUCCEEDED:
            return {
                ...state,
                collects: action.payload,
                gettingCollects: false,
                collectsError: initialState.collectsError,
            };
        case USER_COLLECT_LIST_FAILED:
            return {
                ...state,
                gettingCollects: false,
                collectsError: action.payload,
            };
        default:
            return state;
    }
};