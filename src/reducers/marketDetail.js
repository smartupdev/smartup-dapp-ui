import { DETAIL_MARKET_SET_TAB, SET_IS_SELL, } from '../actions/actionTypes';

export const initialState = {
  activeTabIndex: 0,
  isSell: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case DETAIL_MARKET_SET_TAB: {
        return {
          ...state,
          activeTabIndex: action.payload,
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