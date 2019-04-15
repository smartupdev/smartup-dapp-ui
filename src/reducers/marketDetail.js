import { DETAIL_MARKET_SET_TAB, SET_IS_SELL, TRADE_CHANGE_CT_AMOUNT,} from '../actions/actionTypes';

export const initialState = {
  activeTabIndex: 0,
  isSell: false,
  ctInputAmount: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case TRADE_CHANGE_CT_AMOUNT:
            return {
                ...state,
                ctInputAmount: action.payload,
            };
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