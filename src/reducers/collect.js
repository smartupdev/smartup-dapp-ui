import {
    USER_COLLECT_LIST_REQUESTED, USER_COLLECT_LIST_SUCCEEDED, USER_COLLECT_LIST_FAILED
} from '../actions/actionTypes';
export const initialState = {
    collects: [],
    gettingCollects: false,
    collectsError: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
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