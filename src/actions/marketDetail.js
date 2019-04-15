import {
  SET_ACTIVE_TAB, SET_IS_SELL,
} from './actionTypes';

export function setActiveTab(v) {
    return ({
      type: SET_ACTIVE_TAB,
      payload: v,
    })
}

export function setIsSell() {
    return ({
      type: SET_IS_SELL,
    })
}