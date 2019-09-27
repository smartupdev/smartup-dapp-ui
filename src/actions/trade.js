import {
  TRADE_RESET,
  TRADE_TOGGLE_AGREE_TNC,
  TRADE_CHANGE_BUY_UNIT,
  TRADE_CHANGE_BUY_PRICE,
  TRADE_CHANGE_SELL_PRICE,
  TRADE_SIGN_ORDER,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED, 
  TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
  TRADE_HIGH_LOW_REQUESTED, TRADE_HIGH_LOW_SUCCEEDED, TRADE_HIGH_LOW_FAILED,
  TRADE_GET_GAS_FEE_SUCCEEDED,
} from './actionTypes'
import { action } from './actionHelper'

import { getRawLang } from '../language'
import { 
  apiGetKline, apiGetGasFee, apiBuyCtStage1, apiBuyCtStage2, 
  butCtStage1Sign, makeSign, takeSign,
  asyncFunction,
} from '../integrator'

export function reset() { return action(TRADE_RESET) }
export function toggleTnc() { return action(TRADE_TOGGLE_AGREE_TNC) }
function getGasFee() {
  return async (dispatch, getState) => {
    const { trade: {buyUnit, buyPrice}, market: { id: marketId } } = getState()
    const gasFee = await apiGetGasFee(marketId, buyPrice, buyUnit)()
    return dispatch(action(TRADE_GET_GAS_FEE_SUCCEEDED, gasFee))
  }
}
export function onChangeBuyUnit(v) { 
  return (dispatch, getState) => {
    const { ctRest, ctCount, stage } = getState().market
    if(stage === 1 && v > ctRest) v = ctRest
    else if(stage === 2 && v > ctCount) v = ctCount
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
      const { trade: {buyUnit, buyPrice, sellPrice, agreeTnc, estMatchedOrder}, market: {address, stage, id: marketId}, user: {loggedIn} } = getState()
      if(!agreeTnc) throw new Error('Click TNC')
      if(!loggedIn) throw new Error(rawLang.error.notLogin)
      if(!address) throw new Error(rawLang.trading.preview)
      if(!buyUnit || !sellPrice || stage === 2 && !buyPrice) throw new Error(rawLang.trading.invalidTransaction) // TODO: Change message
      let response
      if(stage === 1) {
        const now = Date.now()
        const total = 2
        dispatch(action(TRADE_SIGN_ORDER, { make: true, buy: true, total, current: 1 }))
        const hash = await butCtStage1Sign(address, buyUnit, 1, now)
        dispatch(action(TRADE_SIGN_ORDER, { make: true, sell: true, total, current: 2 }))
        const sellSign = await makeSign('sell', address, sellPrice, buyUnit, now)
        dispatch(action(TRADE_SIGN_ORDER, null))
        response = await apiBuyCtStage1({ marketId, ctCount: buyUnit, timestamp: now, sign: hash, gasPriceLevel: 1, sellPrice, sellSign })()
      } else {
        const now = Date.now()
        const total = estMatchedOrder ? 3 : 2
        dispatch(action(TRADE_SIGN_ORDER, { make: true, buy: true, total, current: 1 }))
        const makeOrderSign = await makeSign('buy', address, sellPrice, buyUnit, now)
        let takeOrderSign = null
        if(estMatchedOrder) {
          dispatch(action(TRADE_SIGN_ORDER, { take: true, sell: true, total, current: 2 }))
          takeOrderSign = await takeSign('sell', address, sellPrice, buyUnit, now)
        }
        dispatch(action(TRADE_SIGN_ORDER, { make: true, sell: true, total, current: 3 }))
        const sellOrderSign = await makeSign('sell', address, sellPrice, buyUnit, now)
        dispatch(action(TRADE_SIGN_ORDER, null))
        response = await apiBuyCtStage2({ marketId, buyPrice, sellPrice, unit: buyUnit, times: estMatchedOrder, timestamp: now, makeSign: makeOrderSign, takeSign: takeOrderSign, sellSign: sellOrderSign })()
        // response = await apiBuyCtState2({ marketId, buyPrice, sellPrice, unit: buyUnit, times })()
        // entrustPrice: 4
        // entrustVolume: 10
        // orderId: "fz7ddnyrxfk"
        // times: 0
        // type: "Buy"
        // unfilledVolume: 10
        // userAddress: 
      }
      dispatch(action(TRADE_SUCCEEDED, response, {stage, address, marketId}))
    }
    catch(error) {
      dispatch(action(TRADE_FAILED, error))
    }
  }
}

// get kline list
export function getKlineList(segmentIndex){
  return (dispatch, getState) => {
    const { address } = getState().market
    return dispatch(asyncFunction(
      apiGetKline(address, segmentIndex),
      TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
    ))
  }
}

export function getTradingInfo(){
  return (dispatch, getState) => {
    const { address } = getState().market
    return dispatch(asyncFunction(
      apiGetKline(address, 1),
      TRADE_HIGH_LOW_REQUESTED, TRADE_HIGH_LOW_SUCCEEDED, TRADE_HIGH_LOW_FAILED,
    ))
  }
}