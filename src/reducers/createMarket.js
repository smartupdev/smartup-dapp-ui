import { SET_ACTIVE_INDEX } from '../actions/actionTypes';

export const initialState = {
    activeIndex: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_INDEX:{
            const tempIndex = state.activeIndex + action.changeNumber;
            return Object.assign({}, state, {activeIndex: tempIndex});
        }
        default:
            return state;
    }
}