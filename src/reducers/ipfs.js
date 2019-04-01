import {
    IPFS_POST_STRING, IPFS_GET_FILE,IPFS_POST_FILE,
} from '../actions/actionTypes';
export const initialState = {
    postStringHash: null,
    fileContent: null,
    postFileHash: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case IPFS_POST_STRING:
            return Object.assign({}, state, { postStringHash: action.postStringHash });
        case IPFS_GET_FILE:
            return Object.assign({}, state, { fileContent: action.fileContent });
        case IPFS_POST_FILE:
            return Object.assign({}, state, { postFileHash: action.postFileHash });
        default:
            return state;
    }
};