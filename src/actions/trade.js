import {
  TRADE_RESET,
  TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
  TRADE_DETAIL_REQUESTED, TRADE_DETAIL_SUCCEEDED, TRADE_DETAIL_FAILED,
  TOGGLE_IS_SELL, 
  TRADE_CHANGE_CT, TRADE_CHANGE_SUT,
  TRADE_GET_CT_REQUESTED, TRADE_GET_CT_SUCCEEDED, TRADE_GET_CT_FAILED,
  TRADE_GET_SUT_REQUESTED, TRADE_GET_SUT_SUCCEEDED, TRADE_GET_SUT_FAILED,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED
} from '../actions/actionTypes';
import fetch from '../lib/util/fetch';
import {
  API_USER_TRADE_LIST, API_USER_TRADE_DETAIL,
} from './api';
import {
  asyncFunction, toWei, encodeParam, sutContractAddress, smartupWeb3, callbackFunction, getAccount,
  createBidCtData, createAskCtData, createBidQuoteData, createAskQuoteData, decodeResult,
} from '../integrator'

const marketAddress = '0xF6f7C3CDbA6ef2E9fFF12b1702481f99CA6Cd38c';

// function fakeFetch() {
//   return () => new Promise((resolve, reject) => setTimeout(resolve, 1000))
// }

export function reset() {
  return { type: TRADE_RESET }
}

export function toggleIsSell() {
  return ({
    type: TOGGLE_IS_SELL,
  })
}

export function onChangeSUT(amount) {
  return dispatch => {
    dispatch({
      type: TRADE_CHANGE_SUT,
      payload: amount
    })
    dispatch(getCT())
  }
}

function getCT() { // TODO
  return (dispatch, getState) => {
    const { isSell, sut } = getState().trade
    if(!sut) 
      return dispatch({
        type: TRADE_GET_CT_SUCCEEDED,
        payload: ''
      })
    
    const encodeCtAmount = encodeParam(toWei(sut))
    const data = isSell ? createBidQuoteData(encodeCtAmount) : createAskQuoteData(encodeCtAmount)
    dispatch(callbackFunction(
      smartupWeb3.eth.call,
      TRADE_GET_CT_REQUESTED, TRADE_GET_CT_SUCCEEDED, TRADE_GET_CT_FAILED,
      {
        isWeb3: true,
        params: {
          to: marketAddress,
          data,
        },
        responsePayload: decodeResult
      }
    ))
  }
}

export function onChangeCT(amount) {
  return dispatch => {
    dispatch({
      type: TRADE_CHANGE_CT,
      payload: amount
    })
    dispatch(getSUT())
  }
}

function getSUT() {
  return (dispatch, getState) => {
    const { isSell, ct } = getState().trade
    if(!ct) 
      return dispatch({
        type: TRADE_GET_SUT_SUCCEEDED,
        payload: ''
      })

    const encodeCtAmount = encodeParam(toWei(ct))
    const data = isSell ? createAskQuoteData(encodeCtAmount) : createBidQuoteData(encodeCtAmount)
    dispatch(callbackFunction(
      smartupWeb3.eth.call,
      TRADE_GET_SUT_REQUESTED, TRADE_GET_SUT_SUCCEEDED, TRADE_GET_SUT_FAILED,
      {
        isWeb3: true,
        params: {
          to: marketAddress,
          data,
        },
        responsePayload: decodeResult
      }
    ))
  }
}

// TODO: Move mkt to reducer
export function onTrade(marketId) {
  return (dispatch, getState) => {
    const { ct, sut, isSell } = getState().trade

    // TODO: CHANGE!!!
    const encodeCtPrice = toWei(ct);
    const ctAmount = toWei(sut);
    const encodeCtAmount = encodeParam(ctAmount);

    dispatch(callbackFunction(
      smartupWeb3.eth.sendTransaction,
      TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED,
      {
        isWeb3: true,
        params: {
          from: getAccount(),
          to: !isSell ? marketAddress : sutContractAddress,
          value: '0x0',
          data: !isSell ? createAskCtData(encodeCtAmount) : createBidCtData({ marketAddress, encodeCtPrice, encodeCtAmount })
        },
        responsePayload: hash => {
          const { trade: { sut, ct, isSell }, user: { userName: username, userAvatar: userIcon } } = getState()
          return {
            hash,
            isSell,
            id: marketId,
            username,
            userIcon,
            time: Date.now(),
            avg: sut / ct,
            ct
          }
        }
      }
    ));
  }
}

//Trade Detail
export function getTradeDetail(txHash) {
  return (dispatch, getState) => {
    dispatch(callbackFunction(
      fetch.post,
      TRADE_DETAIL_REQUESTED, TRADE_DETAIL_SUCCEEDED, TRADE_DETAIL_FAILED,
      {
        isWeb3: true,
        params: {
          txHash,
        }
      }
    ));
  }
}

//Trade List
export function getTradeList() {
  return (dispatch, getState) => {

    dispatch(callbackFunction(
      fetch.post,
      TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
      {
        isWeb3: true,
        params: {

        }
      }
    ));
  }
}




