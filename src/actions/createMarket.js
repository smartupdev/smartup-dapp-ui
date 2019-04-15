import { CREATE_MARKET_SET_TAB, MARKET_NAME_CHANGE, MARKET_DESC_CHANGE, MARKET_RESET } from './actionTypes';

export function setActiveIndex(changeNumber) {
  return ({
    type: CREATE_MARKET_SET_TAB,
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

export function reset() {
  return {
    type: MARKET_RESET,
  }
}