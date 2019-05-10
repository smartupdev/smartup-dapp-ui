import {
  TRADE_RESET,
  TRADE_SET_TAB,
  TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
  TRADE_DETAIL_REQUESTED, TRADE_DETAIL_SUCCEEDED, TRADE_DETAIL_FAILED,
  TRADE_TOGGLE_IS_SELL, TRADE_TOGGLE_AGREE_TNC,
  TRADE_CHANGE_CT, TRADE_CHANGE_SUT,
  TRADE_GET_SUT_REQUESTED, TRADE_GET_SUT_SUCCEEDED, TRADE_GET_SUT_FAILED,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED, TRADE_SAVE_SUCCEEDED,
  TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
  TRADE_HIGH_LOW_REQUESTED,TRADE_HIGH_LOW_SUCCEEDED,TRADE_HIGH_LOW_FAILED,
} from '../actions/actionTypes';
import fetch, {delay} from '../lib/util/fetch';
import {
  API_MARKET_TRADE_LIST, API_USER_TRADE_DETAIL,API_KLINE_DATA, API_USER_TRADE_SAVE
} from './api';
import {
  asyncFunction, toWei, encodeParam, sutContractAddress, smartupWeb3, callbackFunction, getAccount,
  createBidCtData, createAskCtData, createBidQuoteData, createAskQuoteData, decodeResult,
} from '../integrator'

import { getYear, getMonth, getDate, getHour } from '../lib/util'

export function reset() {
  return { type: TRADE_RESET }
}

export function setTab(index) {
  return (dispatch, getState) => {
    const { trade: { tabIndex } } = getState()
    if(index !== tabIndex) {
      dispatch({ type: TRADE_SET_TAB, payload: {index} })
      dispatch(getKlineList())
    }
  }  
}

export function toggleTnc() {
  return {
    type: TRADE_TOGGLE_AGREE_TNC,
  }
}

export function toggleIsSell() {
  return dispatch => {
    dispatch({ type: TRADE_TOGGLE_IS_SELL })
    dispatch(getSUT())    
  }
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
    const { trade: {isSell, ct, getSUTCount}, market: {currentMarket: {address}} } = getState()
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
          to: address,
          data,
        },
        meta: { getSUTCount: getSUTCount + 1 },
        responsePayload: decodeResult
      }
    ))
  }
}

export function onTrade() {
  return async (dispatch, getState) => {
    const { trade: {ct, sut, isSell}, market: { currentMarket: {id, address} } } = getState()

    const encodeCtPrice = toWei(sut);
    const ctAmount = toWei(ct);
    const encodeCtAmount = encodeParam(ctAmount);

    if(!address) return dispatch({
      type: TRADE_FAILED,
      payload: new Error('It is for preview. Refresh the page upon you received notification "Market is created".'),
      error: true
    })

    const [error, response] = await dispatch(callbackFunction(
      smartupWeb3.eth.sendTransaction,
      TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED,
      {
        isWeb3: true,
        loginRequired: true,
        params: {
          from: getAccount(),
          to: isSell ? address : sutContractAddress,
          value: '0x0',
          data: isSell ? createAskCtData(encodeCtAmount) : createBidCtData({ marketAddress: address, encodeCtPrice, encodeCtAmount })
        }
      }
    ))
    if(!error) {
      dispatch(
        asyncFunction(
          () => fetch.post(API_USER_TRADE_SAVE, {txHash: response, type: isSell ? 'sell' : 'buy',  marketId: id, sut, ct}),
          null, TRADE_SAVE_SUCCEEDED, null,
          {
            responsePayload: r => {
              const { avatarHash, userName } = getState().user
              return { ...r, user: { avatarIpfsHash: avatarHash, name: userName } }
            }
          }
        )
      )
    }
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
export function getTradeList(isLoadMore) {
  return (dispatch, getState) => {
    const { trade: {pageSize, pageNumb}, market: {currentMarket: {address}} } = getState()
    dispatch(asyncFunction(
      fetch.post,
      TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
      {
        isWeb3: true,
        params: API_MARKET_TRADE_LIST, 
        params2: {marketAddress: address, pageSize, pageNumb: isLoadMore ? pageNumb + 1 : 1, asc: false},
        meta: { isLoadMore }
      }
    ));
  }
}

// get kline list
const DAY = 1000 * 60 * 60 * 24
const MONTH = DAY * 30
const YEAR = DAY * 365
function getDateRange(tabIndex) {
  const now = Date.now()
  function getDateShort(d) { return `${getYear(d)}_${getMonth(d)}_${getDate(d)}` }
  function getDateLong(d) { return `${getYear(d)}_${getMonth(d)}_${getDate(d)}_${getHour(d)}` }
  const end = getDateShort(now)
  return [
    { start: getDateLong(now - DAY), end: getDateLong(now), segment: '1hour'}, // 1d
    { start: getDateShort(now - MONTH), end, segment: '1day'}, // 1m
    { start: getDateShort(now - YEAR), end, segment: '1week'}, // 1y
  ][tabIndex]
}

export function getKlineList(){
  return (dispatch, getState) => {
    const { 
      market: { currentMarket: {address: marketAddress} },
      trade: { tabIndex }
    } = getState()
    let requestParams = {
      marketAddress,
      ...getDateRange(tabIndex)
      // start:'2019_04_16',
      // end:'2019_04_24',
      // segment:'1day'
    }
    dispatch(asyncFunction(
      fetch.post,
      TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
      {
        isWeb3: true,
        params: API_KLINE_DATA,
        params2:requestParams,
      }
    ));
  }
}

export function getHighLowList(){
  return (dispatch, getState) => {
    const { 
      market: { currentMarket: {address: marketAddress} },
      // trade: { tabIndex }
    } = getState()
    let requestParams = {
      marketAddress,
      ...getDateRange(1)
    }
    dispatch(asyncFunction(
      fetch.post,
      TRADE_HIGH_LOW_REQUESTED,TRADE_HIGH_LOW_SUCCEEDED,TRADE_HIGH_LOW_FAILED,
      {
        isWeb3: true,
        params: API_KLINE_DATA,
        params2:requestParams,
      }
    ));
  }
}

export function watchKline() {
  return async (dispatch, getState) => {
    while(true) {
      const { market: {currentMarket}} = getState()
      if(!!currentMarket){
        await Promise.all([
          dispatch(getKlineList()),
          dispatch(getHighLowList())
        ]);
      }
      await delay(10000)
    }
  }
}




