import {
  SET_IS_SELL, DETAIL_MARKET_SET_TAB
} from './actionTypes';

export function setActiveTab(tabIndex) {
  return {
    type: DETAIL_MARKET_SET_TAB,
    payload: tabIndex
  }
}

export function setIsSell() {
    return ({
      type: SET_IS_SELL,
    })
}