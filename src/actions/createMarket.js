import {
  CREATE_MARKET_SET_TAB, CREATE_MARKET_NAME_CHANGE, CREATE_MARKET_DESC_CHANGE, CREATE_MARKET_RESET,
  CREATE_MARKET_GET_REQUESTED, CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
  CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,
  CREATE_MARKET_SAVE_REQUESTED, CREATE_MARKET_SAVE_SUCCEEDED, CREATE_MARKET_SAVE_FAILED,
  CREATE_MARKET_LOCK_REQUESTED, CREATE_MARKET_LOCK_SUCCEEDED, CREATE_MARKET_LOCK_FAILED,
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
  CREATE_MARKET_AVATAR_CHANGE_REQUESTED, CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED, CREATE_MARKET_AVATAR_CHANGE_FAILED,
  CREATE_MARKET_COVER_CHANGE_REQUESTED, CREATE_MARKET_COVER_CHANGE_SUCCEEDED, CREATE_MARKET_COVER_CHANGE_FAILED,
  CREATE_MARKET_PRICE, CREATE_MARKET_UNIT, CREATE_MARKET_RESERVE
} from './actionTypes';
import { API_MARKET_CREATE_CHANGE_NAME, API_MARKET_CREATE_SAVE, API_MARKET_CREATE_LOCK } from './api'

import { postIpfsImg } from './ipfs'
import { action } from './actionHelper'

import fetch from '../lib/util/fetch'
import { 
  asyncFunction, 
  callbackFunction, getAccount, createMarketData, smartupWeb3,
  apiGetSavedMarket,
  apiCreateMarketCheckInput1, apiCreateMarketCheckInput2,
  apiCreateMarket
 } from '../integrator'

export function get() {
  return asyncFunction(
    apiGetSavedMarket(),
    null, CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
  )
}

export function check() {
  return (dispatch, getState) => {
    const {activeIndex, name, desc, avatarHash, coverHash, unit, unitPrice, reserveRatio} = getState().createMarket
    if(activeIndex !== 0 && activeIndex !== 1) return action(CREATE_MARKET_CHECK_SUCCEEDED)
    const params = activeIndex === 0 ? {name, desc, avatarHash, coverHash} : {unit, unitPrice, reserveRatio}
    return dispatch(
      asyncFunction(
        activeIndex === 0 ? apiCreateMarketCheckInput1(params) : apiCreateMarketCheckInput2(params),
        CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,
        { meta: params }
      )
    )
  }
}

export function create() {
  return async (dispatch, getState) => {
    const { name, desc: description, avatarHash, coverHash } = getState().createMarket
    const [error] = await dispatch(
      asyncFunction(
        fetch.post,
        CREATE_MARKET_SAVE_REQUESTED, CREATE_MARKET_SAVE_SUCCEEDED, CREATE_MARKET_SAVE_FAILED,
        { params: API_MARKET_CREATE_SAVE, params2: { name, description, photo: avatarHash, cover: coverHash } }
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
        smartupWeb3 && smartupWeb3.eth && smartupWeb3.eth.sendTransaction,
        CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
        {
          isWeb3: true,
          loginRequired: true,
          params: {
            from: await getAccount(),
            // to: sutContractAddress,
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
    await dispatch(check())
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
    () => postIpfsImg(files[0]),
    CREATE_MARKET_AVATAR_CHANGE_REQUESTED, CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED, CREATE_MARKET_AVATAR_CHANGE_FAILED,
  )
}

export function onChangeCover(files) {
  if(!files) return {
    type: CREATE_MARKET_COVER_CHANGE_SUCCEEDED,
  }
  return asyncFunction(
    () => postIpfsImg(files[0]),
    CREATE_MARKET_COVER_CHANGE_REQUESTED, CREATE_MARKET_COVER_CHANGE_SUCCEEDED, CREATE_MARKET_COVER_CHANGE_FAILED,
  )
}

export function onChangePrice(v) { return action(CREATE_MARKET_PRICE, v) }
export function onChangeUnit(v) { return action(CREATE_MARKET_UNIT, v) }
export function onChangeReserveRatio(v) { return action(CREATE_MARKET_RESERVE, v) }

export function reset() {
  return {
    type: CREATE_MARKET_RESET,
  }
}