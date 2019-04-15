import { SET_ACTIVE_TAB, SET_IS_SELL, } from '../actions/actionTypes';

export const initialState = {
  activeTab: 'trading',
  isSell: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_ACTIVE_TAB: {
        return {
          ...state,
          activeTab: action.payload,
        }
      }
      case SET_IS_SELL: {
        return {
          ...state,
          isSell: !state.isSell,
        }
      }
      default:
        return state;
    }
  }