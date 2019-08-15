import {
  TRADE_RESET,
  TRADE_TOGGLE_AGREE_TNC,
  TRADE_CHANGE_BUY_UNIT,
  TRADE_CHANGE_BUY_PRICE,
  TRADE_CHANGE_SELL_PRICE,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED, 
  TRADE_GET_GAS_FEE_SUCCEEDED,
} from '../actions/actionTypes'
import { action } from './actionHelper'

import { getRawLang } from '../language'
import { apiGetGasFee, apiBuyCtState1, butCtStage1Sign } from '../integrator'

import { getYear, getMonth, getDate, getHour, DAY, MONTH, YEAR } from '../lib/util'

export function reset() { return action(TRADE_RESET) }
export function toggleTnc() { return action(TRADE_TOGGLE_AGREE_TNC) }
function getGasFee() {
  return async (dispatch, getState) => {
    const { buyUnit, buyPrice, estGasFee, estMatchedOrder } = getState().trade
    const gasFee = await apiGetGasFee(buyPrice, buyUnit, {estGasFee, estMatchedOrder})()
    return dispatch(action(TRADE_GET_GAS_FEE_SUCCEEDED, gasFee))
  }
}
export function onChangeBuyUnit(v) { 
  return dispatch => {
    dispatch(action(TRADE_CHANGE_BUY_UNIT, v)) 
    dispatch(getGasFee())
  }
}
export function onChangeBuyPrice(v) { 
  return dispatch => {
    dispatch(action(TRADE_CHANGE_BUY_PRICE, v))
    dispatch(getGasFee())
  }
}
export function onChangeSellPrice(v) { return action(TRADE_CHANGE_SELL_PRICE, v) }

export function onTrade() {
  return async (dispatch, getState) => {
    try {
      dispatch(action(TRADE_REQUESTED))
      const rawLang = getRawLang()
      const { trade: {buyUnit, buyPrice, sellPrice, agreeTnc}, market: {address}, user: {loggedIn} } = getState()
      if(!agreeTnc) throw new Error('Click TNC')
      if(!loggedIn) throw new Error(rawLang.error.notLogin)
      if(!address) throw new Error(rawLang.trading.preview)
      if(!buyUnit || !sellPrice) throw new Error(rawLang.trading.invalidTransaction) // TODO: Change message
      const now = Date.now()
      const hash = await butCtStage1Sign(address, buyUnit, 1, now)
      const response = await apiBuyCtState1({ marketAddress: address, ctCount: buyUnit, timestamp: now, sign: hash, gasPriceLevel: 1 })()
      dispatch(action(TRADE_SUCCEEDED, response))
    }
    catch(error) {
      dispatch(action(TRADE_FAILED, error))
    }
  }
}

//Market Trade List
// export function getTradeList(isLoadMore) {
//   return (dispatch, getState) => {
//     const { trade: {pageSize, pageNumb}, market: {currentMarket: {address}} } = getState()
//     dispatch(asyncFunction(
//       fetch.post,
//       TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
//       {
//         isWeb3: true,
//         params: API_MARKET_TRADE_LIST, 
//         params2: {marketAddress: address, pageSize, pageNumb: isLoadMore ? pageNumb + 1 : 1, asc: false},
//         meta: { isLoadMore }
//       }
//     ));
//   }
// }

// export function setTab(index) {
//   return (dispatch, getState) => {
//     const { trade: { tabIndex } } = getState()
//     if(index !== tabIndex) {
//       dispatch({ type: TRADE_SET_TAB, payload: {index} })
//       dispatch(getKlineList())
//     }
//   }  
// }

// get kline list
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

// export function getKlineList(){
//   return (dispatch, getState) => {
//     const { 
//       market: { currentMarket: {address: marketAddress} },
//       trade: { tabIndex }
//     } = getState()
//     let requestParams = {
//       marketAddress,
//       ...getDateRange(tabIndex)
//       // start:'2019_04_16',
//       // end:'2019_04_24',
//       // segment:'1day'
//     }
//     dispatch(asyncFunction(
//       fetch.post,
//       TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
//       {
//         isWeb3: true,
//         params: API_KLINE_DATA,
//         params2:requestParams,
//       }
//     ));
//   }
// }

// export function getHighLowList(){
//   return (dispatch, getState) => {
//     const { 
//       market: { currentMarket: {address: marketAddress} },
//       // trade: { tabIndex }
//     } = getState()
//     let requestParams = {
//       marketAddress,
//       ...getDateRange(1)
//     }
//     dispatch(asyncFunction(
//       fetch.post,
//       TRADE_HIGH_LOW_REQUESTED,TRADE_HIGH_LOW_SUCCEEDED,TRADE_HIGH_LOW_FAILED,
//       {
//         isWeb3: true,
//         params: API_KLINE_DATA,
//         params2:requestParams,
//       }
//     ));
//   }
// }

// TODO: don't loop if not in trading
// export function watchKline() {
//   return async (dispatch, getState) => {
//     while(true) {
//       const { market: {currentMarket}} = getState()
//       if(!currentMarket) break;
//       await Promise.all([
//         dispatch(getKlineList()),
//         dispatch(getHighLowList())
//       ]);
//       await delay(10000)
//     }
//   }
// }
