import {
  CREATE_MARKET_SET_TAB, CREATE_MARKET_NAME_CHANGE, CREATE_MARKET_DESC_CHANGE, CREATE_MARKET_RESET,
  CREATE_MARKET_GET_REQUESTED, CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
  CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,
  CREATE_MARKET_SAVE_REQUESTED, CREATE_MARKET_SAVE_SUCCEEDED, CREATE_MARKET_SAVE_FAILED,
  CREATE_MARKET_LOCK_REQUESTED, CREATE_MARKET_LOCK_SUCCEEDED, CREATE_MARKET_LOCK_FAILED,
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
  CREATE_MARKET_AVATAR_CHANGE_REQUESTED, CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED, CREATE_MARKET_AVATAR_CHANGE_FAILED,
  CREATE_MARKET_COVER_CHANGE_REQUESTED, CREATE_MARKET_COVER_CHANGE_SUCCEEDED, CREATE_MARKET_COVER_CHANGE_FAILED
} from './actionTypes';
import { API_MARKET_CREATE_GET, API_MARKET_CREATE_CHANGE_NAME, API_MARKET_CREATE_SAVE, API_MARKET_CREATE_LOCK } from './api'

import { postIpfsImg } from './ipfs'

import fetch from '../lib/util/fetch'
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

export function lock(txHash) {
  return async (dispatch, getState) => {
    const { marketId } = getState().createMarket
    return dispatch(
      asyncFunction(
        fetch.post,
        CREATE_MARKET_LOCK_REQUESTED, CREATE_MARKET_LOCK_SUCCEEDED, CREATE_MARKET_LOCK_FAILED,
        { params: API_MARKET_CREATE_LOCK, params2: { txHash, marketId } }
      )
    )
  }
}

export function pay() {
  return async (dispatch, getState) => {
    const [error, response] = await dispatch(
      callbackFunction(
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
    )
    if (!error) dispatch(lock(response))
  }
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

export function onChangeAvatar(files) {
  if(!files) return {
    type: CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED,
  }
  return asyncFunction(
    postIpfsImg,
    CREATE_MARKET_AVATAR_CHANGE_REQUESTED, CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED, CREATE_MARKET_AVATAR_CHANGE_FAILED,
    {
      params: files[0]
    }
  )
}

export function onChangeCover(files) {
  if(!files) return {
    type: CREATE_MARKET_COVER_CHANGE_SUCCEEDED,
  }
  return asyncFunction(
    postIpfsImg,
    CREATE_MARKET_COVER_CHANGE_REQUESTED, CREATE_MARKET_COVER_CHANGE_SUCCEEDED, CREATE_MARKET_COVER_CHANGE_FAILED,
    {
      params: files[0]
    }
  )
}

export function reset() {
  return {
    type: CREATE_MARKET_RESET,
  }
}