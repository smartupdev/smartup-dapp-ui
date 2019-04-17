import {
  CREATE_MARKET_SET_TAB, CREATE_MARKET_NAME_CHANGE, CREATE_MARKET_DESC_CHANGE, CREATE_MARKET_RESET,
  CREATE_MARKET_GET_REQUESTED,
  CREATE_MARKET_GET_SUCCEEDED,
  CREATE_MARKET_GET_FAILED,
  CREATE_MARKET_CHECK_REQUESTED,
  CREATE_MARKET_CHECK_SUCCEEDED,
  CREATE_MARKET_CHECK_FAILED,
  CREATE_MARKET_SAVE_REQUESTED,
  CREATE_MARKET_SAVE_SUCCEEDED,
  CREATE_MARKET_SAVE_FAILED,
  CREATE_MARKET_PAY_REQUESTED,
  CREATE_MARKET_PAY_SUCCEEDED,
  CREATE_MARKET_PAY_FAILED,
} from './actionTypes';
import { API_MARKET_CREATE_GET, API_MARKET_CREATE_CHANGE_NAME, API_MARKET_CREATE_SAVE } from './api'

import fetch from '../lib/util/fetch';
import { asyncFunction, callbackFunction, getAccount, createMarketData, sutContractAddress, smartupWeb3, } from '../integrator'

export function get() {
  return asyncFunction(
    fetch.get,
    CREATE_MARKET_GET_REQUESTED, CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
    { params: API_MARKET_CREATE_GET }
  )
}

export function check() {
  return (dispatch, getState) =>
    dispatch(
      asyncFunction(
        fetch.get,
        CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,
        { params: API_MARKET_CREATE_CHANGE_NAME, params2: { marketName: getState().createMarket.name } }
      )
    )
}

export function create() {
  return async (dispatch, getState) => {
    const { name, desc: description } = getState().createMarket
    const [error, response] = await dispatch(
      asyncFunction(
        fetch.post,
        CREATE_MARKET_SAVE_REQUESTED, CREATE_MARKET_SAVE_SUCCEEDED, CREATE_MARKET_SAVE_FAILED,
        { params: API_MARKET_CREATE_SAVE, params2: { name, description } }
      )
    )
    if (!error)
      dispatch(pay())
  }
}

export function pay() {
  return callbackFunction(
    smartupWeb3.eth.sendTransaction,
    CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
    {
      isWeb3: true,
      params: {
        from: getAccount(),
        to: sutContractAddress,
        value: '0x0',
        data: createMarketData()
      }
    })
}


export function setActiveIndex(changeNumber) {
  return async (dispatch, getState) => {
    if (!getState().createMarket.activeIndex && changeNumber) {
      const [error] = await dispatch(check())
      if (error) return
    }
    dispatch({
      type: CREATE_MARKET_SET_TAB,
      payload: changeNumber,
    })
  }
}

export function onChangeName(text) {
  return ({
    type: CREATE_MARKET_NAME_CHANGE,
    payload: text,
  })
}

export function onChangeDesc(text) {
  return ({
    type: CREATE_MARKET_DESC_CHANGE,
    payload: text,
  })
}

export function reset() {
  return {
    type: CREATE_MARKET_RESET,
  }
}