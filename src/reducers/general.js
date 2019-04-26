import {
    TOGGLE_EXPANDED_INFO,
    TOGGLE_EXPANDED_RULE,
    TOGGLE_EXPANDED_SUB
} from '../actions/actionTypes';

export const initialState = {
    expandedInfo: true,
    expandedRule: false,
    expandedSub: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_EXPANDED_INFO:
            return {
                ...state,
                expandedInfo: !state.expandedInfo,
            }
        case TOGGLE_EXPANDED_RULE:
            return {
                ...state,
                expandedRule: !state.expandedRule,
            }
        case TOGGLE_EXPANDED_SUB:
            return {
                ...state,
                expandedSub: !state.expandedSub,
            }
        default:
            return state;
    }
};