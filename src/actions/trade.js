import {
  TRADE_BID_QUOTE_REQUESTED, TRADE_BID_QUOTE_SUCCEEDED, TRADE_BID_QUOTE_FAILED,
  TRADE_BID_CT_REQUESTED, TRADE_BID_CT_SUCCEEDED, TRADE_BID_CT_FAILED,
  TRADE_ASK_QUOTE_REQUESTED, TRADE_ASK_QUOTE_SUCCEEDED, TRADE_ASK_QUOTE_FAILED,
  TRADE_ASK_CT_REQUESTED, TRADE_ASK_CT_SUCCEEDED, TRADE_ASK_CT_FAILED,
  TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
  TRADE_DETAIL_REQUESTED, TRADE_DETAIL_SUCCEEDED, TRADE_DETAIL_FAILED,
  TRADE_SELL_REQUESTED, TRADE_SELL_SUCCEEDED, TRADE_SELL_FAILED,
  TRADE_BUY_REQUESTED, TRADE_BUY_SUCCEEDED, TRADE_BUY_FAILED
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

function fakeFetch() {
  return () => new Promise((resolve, reject) => setTimeout(resolve, 1000))
}

export function onSell(marketId, numberOfct) {
  return (dispatch, getState) => dispatch(
    asyncFunction(
      fakeFetch,
      TRADE_SELL_REQUESTED, TRADE_SELL_SUCCEEDED, TRADE_SELL_FAILED,
      {
        responsePayload: r => ({
          id: marketId, username: getState().user.userName, time: Date.now(), avg: 10, ct: numberOfct
        })
      }
    )
  )
}

export function onTrade() {
  return (dispatch, getState) => {
    let isSell = getState().marketDetail.isSell;
    if (!!isSell) {
      dispatch(askCt());
    } else {
      dispatch(bidCt());
    }
  }
}

//买入CT-先查询买入价格
export function getBidQuote(ctInputAmount) {
  return (dispatch, getState) => {
    //let marketAddress = getState().marketDetail.currentMarket;
    let ctAmount = toWei(ctInputAmount);
    let encodeCtAmount = encodeParam(ctAmount);
    dispatch(asyncFunction(
      smartupWeb3.eth.call,
      TRADE_BID_QUOTE_REQUESTED, TRADE_BID_QUOTE_SUCCEEDED, TRADE_BID_QUOTE_FAILED,
      {
        isWeb3: true,
        params: {
          to: marketAddress,
          data: createBidQuoteData(encodeCtAmount),
        },
        responsePayload: decodeResult
      }
    ));
  }
}

//根据查询到的价格(sut数量)买入ct
function bidCt() {
  return (dispatch, getState) => {
    //let marketAddress = getState().marketDetail.currentMarket;
    let encodeCtPrice = toWei(getState().trade.bidQuoteAmount);
    let ctAmount = toWei(getState().marketDetail.ctInputAmount);
    let encodeCtAmount = encodeParam(ctAmount);
    dispatch(callbackFunction(
      smartupWeb3.eth.sendTransaction,
      TRADE_BID_CT_REQUESTED, TRADE_BID_CT_SUCCEEDED, TRADE_BID_CT_FAILED,
      {
        isWeb3: true,
        params: {
          from: getAccount(),
          to: sutContractAddress,
          value: '0x0',
          data: createBidCtData({ marketAddress, encodeCtPrice, encodeCtAmount })
        }
      }
    ));
  }
}

//卖出CT-先查询卖出价格
export function getAskQuote(ctInputAmount) {
  return (dispatch, getState) => {
    //let marketAddress = getState().marketDetail.currentMarket;
    let ctAmount = toWei(ctInputAmount);
    let encodeCtAmount = encodeParam(ctAmount);
    dispatch(callbackFunction(
      smartupWeb3.eth.call,
      TRADE_ASK_QUOTE_REQUESTED, TRADE_ASK_QUOTE_SUCCEEDED, TRADE_ASK_QUOTE_FAILED,
      {
        isWeb3: true,
        params: {
          to: marketAddress,
          data: createAskQuoteData(encodeCtAmount),
        },
        responsePayload: decodeResult
      }
    ));
  }
}

export function askCt() {
  return (dispatch, getState) => {
    //let marketAddress = getState().marketDetail.currentMarket;
    let ctAmount = toWei(getState().marketDetail.ctInputAmount);
    let encodeCtAmount = encodeParam(ctAmount);
    dispatch(asyncFunction(
      smartupWeb3.eth.sendTransaction,
      TRADE_ASK_CT_REQUESTED, TRADE_ASK_CT_SUCCEEDED, TRADE_ASK_CT_FAILED,
      {
        isWeb3: true,
        params: {
          from: getAccount(),
          to: marketAddress,
          value: '0x0',
          data: createAskCtData(encodeCtAmount)
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




