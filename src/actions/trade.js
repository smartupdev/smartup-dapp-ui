import {
  TRADE_RESET,
  TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
  TRADE_DETAIL_REQUESTED, TRADE_DETAIL_SUCCEEDED, TRADE_DETAIL_FAILED,
  TRADE_TOGGLE_IS_SELL, 
  TRADE_CHANGE_CT, TRADE_CHANGE_SUT,
  TRADE_GET_CT_REQUESTED, TRADE_GET_CT_SUCCEEDED, TRADE_GET_CT_FAILED,
  TRADE_GET_SUT_REQUESTED, TRADE_GET_SUT_SUCCEEDED, TRADE_GET_SUT_FAILED,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED,
  TRADE_SELL_REQUESTED, TRADE_SELL_SUCCEEDED, TRADE_SELL_FAILED,
  TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
  TRADE_BUY_REQUESTED, TRADE_BUY_SUCCEEDED, TRADE_BUY_FAILED,
  TOGGLE_IS_SELL, TRADE_CHANGE_CT_AMOUNT
} from '../actions/actionTypes';
import fetch from '../lib/util/fetch';
// import {
//   API_USER_TRADE_LIST, API_USER_TRADE_DETAIL,
// } from './api';
import {
  API_MARKET_TRADE_LIST, API_USER_TRADE_DETAIL,API_KLINE_DATA,
} from './api';
import {
  asyncFunction, toWei, encodeParam, sutContractAddress, smartupWeb3, callbackFunction, getAccount,
  createBidCtData, createAskCtData, createBidQuoteData, createAskQuoteData, decodeResult,
} from '../integrator'

const marketAddress = '0x4b331d6AdCdBE3d9228c2BbA113b93681958263F';

// function fakeFetch() {
//   return () => new Promise((resolve, reject) => setTimeout(resolve, 1000))
// }

export function reset() {
  return { type: TRADE_RESET }
}

export function toggleIsSell() {
  return ({
    type: TRADE_TOGGLE_IS_SELL,
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
  // return (dispatch, getState) => {
  //   const { isSell, sut } = getState().trade
  //   if(!sut) 
  //     return dispatch({
  //       type: TRADE_GET_CT_SUCCEEDED,
  //       payload: ''
  //     })
    
  //   const encodeCtAmount = encodeParam(toWei(sut))
  //   const data = isSell ? createBidQuoteData(encodeCtAmount) : createAskQuoteData(encodeCtAmount)
  //   dispatch(callbackFunction(
  //     smartupWeb3.eth.call,
  //     TRADE_GET_CT_REQUESTED, TRADE_GET_CT_SUCCEEDED, TRADE_GET_CT_FAILED,
  //     {
  //       isWeb3: true,
  //       params: {
  //         to: marketAddress,
  //         data,
  //       },
  //       responsePayload: decodeResult
  //     }
  //   ))
  // }
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
    const { trade: {isSell, ct}, market: {currentMarket: {address}} } = getState()
    if(!ct) 
      return dispatch({
        type: TRADE_GET_SUT_SUCCEEDED,
        payload: ''
      })
    const encodeCtAmount = encodeParam(toWei(ct))
    const data = !isSell ? createAskQuoteData(encodeCtAmount) : createBidQuoteData(encodeCtAmount)
    dispatch(callbackFunction(
      smartupWeb3.eth.call,
      TRADE_GET_SUT_REQUESTED, TRADE_GET_SUT_SUCCEEDED, TRADE_GET_SUT_FAILED,
      {
        isWeb3: true,
        params: {
          to: address,
          data,
        },
        responsePayload: decodeResult
      }
    ))
  }
}

export function onTrade() {
  return (dispatch, getState) => {
    const { trade: {ct, sut, isSell}, market: { currentMarket: {id, address} } } = getState()

    const encodeCtPrice = toWei(sut);
    const ctAmount = toWei(ct);
    const encodeCtAmount = encodeParam(ctAmount);

    dispatch(callbackFunction(
      smartupWeb3.eth.sendTransaction,
      TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED,
      {
        isWeb3: true,
        params: {
          from: getAccount(),
          to: isSell ? sutContractAddress : address,
          value: '0x0',
          data: isSell ? createBidCtData({ marketAddress: address, encodeCtPrice, encodeCtAmount }) : createAskCtData(encodeCtAmount)
        },
        responsePayload: hash => {
          const { trade: { sut, ct, isSell }, user: { userName: username, userAvatar: userIcon } } = getState()
          return {
            hash,
            isSell,
            id,
            username,
            userIcon,
            sut,
            ct
          }
        }
      }
    ));
  }
}

//get trade detail by txhash
export function getTradeDetail(txHash) {
  return (dispatch, getState) => {
    dispatch(callbackFunction(
      fetch.post,
      TRADE_DETAIL_REQUESTED, TRADE_DETAIL_SUCCEEDED, TRADE_DETAIL_FAILED,
      {
        isWeb3: true,
        params: API_USER_TRADE_DETAIL,
        params2: {
          txHash,
        },
      }
    ));
  }
}

//Market Trade List
export function getTradeList() {
  return (dispatch, getState) => {
    dispatch(asyncFunction(
      fetch.post,
      TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
      {
        isWeb3: true,
        params: API_MARKET_TRADE_LIST, 
        params2: {marketAddress: getState().market.currentMarket.address},
        responsePayload: reps => reps.list
      }
    ));
  }
}

// get kline list
export function getKlineList(){
  return (dispatch, getState) => {
    let requestParams = {
      marketAddress: getState().market.currentMarket.address,
      start:'2019_04_16',
      end:'2019_04_24',
      segment:'1day'
    }
    dispatch(asyncFunction(
      fetch.post,
      TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
      {
        isWeb3: true,
        params: API_KLINE_DATA,
        params2:requestParams,
        responsePayload: reps => reps.obj
      }
    ));
  }
}




