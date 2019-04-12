import { SET_ACTIVE_INDEX, MARKET_NAME_CHANGE, MARKET_DESC_CHANGE } from './actionTypes';

export function setActiveIndex(changeNumber) {
  return ({
    type: SET_ACTIVE_INDEX,
    payload: changeNumber,
  })
}

export function onChangeName(text) {
  return ({
    type: MARKET_NAME_CHANGE,
    payload: text,
  })
}

export function onChangeDesc(text) {
  return ({
    type: MARKET_DESC_CHANGE,
    payload: text,
  })
}
