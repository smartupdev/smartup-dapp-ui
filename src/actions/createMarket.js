import {
  CREATE_MARKET_SET_TAB, CREATE_MARKET_NAME_CHANGE, CREATE_MARKET_DESC_CHANGE, CREATE_MARKET_RESET,
  CREATE_MARKET_GET_REQUESTED, CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
  CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,
  CREATE_MARKET_SAVE_REQUESTED, CREATE_MARKET_SAVE_SUCCEEDED, CREATE_MARKET_SAVE_FAILED,
  CREATE_MARKET_LOCK_REQUESTED, CREATE_MARKET_LOCK_SUCCEEDED, CREATE_MARKET_LOCK_FAILED,
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
  CREATE_MARKET_AVATAR_CHANGE, CREATE_MARKET_COVER_CHANGE,
  CREATE_MARKET_PRICE, CREATE_MARKET_UNIT, CREATE_MARKET_RESERVE, CREATE_MARKET_SYMBOL_CHANGE,
  CREATE_MARKET_DETAIL_CHANGE, CREATE_MARKET_PERIOD_CHANGE
} from './actionTypes';
import { API_MARKET_CREATE_CHANGE_NAME, API_MARKET_CREATE_SAVE, API_MARKET_CREATE_LOCK } from './api'

import { marketDeposit } from '../config'

import { action } from './actionHelper'
import { fetch, dayAfter, hourAfter, log } from '../lib/util'
import { 
  asyncFunction, 
  callbackFunction, getAccount, createMarketData, smartupWeb3,
  apiGetSavedMarket,
  apiCreateMarketCheckInput1, apiCreateMarketCheckInput2,
  apiCreateMarket, 
  createMarketSign, apiGetNewMarketId,
  bnMul
 } from '../integrator'

export function get() {
  return asyncFunction(
    apiGetSavedMarket(),
    null, CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
  )
}

function period2Time(day) {
  return ~~( hourAfter(day === '1' ? 1 : 0, dayAfter(day))/1000 ) // add one hour for 1 day as buffer
}

export function check(changeNumber) {
  return (dispatch, getState) => {
    const {activeIndex, name, desc, avatarHash, coverHash, unit, unitPrice, reserveRatio, detail, symbol, period} = getState().createMarket
    if(activeIndex !== 0 && activeIndex !== 1 || changeNumber < activeIndex) return action(CREATE_MARKET_CHECK_SUCCEEDED)
    return dispatch(
      asyncFunction(
        activeIndex === 0 ? 
          apiCreateMarketCheckInput1({name, desc, avatarHash, coverHash, detail}) 
        : apiCreateMarketCheckInput2({unit, unitPrice, reserveRatio, symbol, closingTime: period2Time(period) }),
        CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,
        // { meta: {activeIndex, name, desc, avatarHash, coverHash, unit, unitPrice, reserveRatio, detail, symbol, period} }
      )
    )
  }
}

export function create() {
  return async (dispatch, getState) => {
    try {
      dispatch(action(CREATE_MARKET_SAVE_REQUESTED))
      const { name, desc: description, detail, avatarHash: photo, coverHash: cover, symbol, period, unit: ctCount, unitPrice: ctPrice, reserveRatio  } = getState().createMarket
      const marketId = await apiGetNewMarketId()()
      const closingTime = period2Time(period)
      const recyclePrice = ctPrice * reserveRatio + '' // bnMul(ctPrice, reserveRatio) TODO
      const hash = await createMarketSign(marketId, symbol, marketDeposit, ctCount, ctPrice, recyclePrice, closingTime, 1 )
      const res = await apiCreateMarket({
        marketId, name, description, detail, photo, cover, symbol, closingTime, ctCount, ctPrice, ctRecyclePrice: recyclePrice, gasPriceLevel: 1, hash
      })()
      dispatch(action(CREATE_MARKET_SAVE_SUCCEEDED, res))
    }
    catch(err) {
      log.error('err', err)
      dispatch(action(CREATE_MARKET_SAVE_FAILED, err))
    }
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
    await dispatch(check(changeNumber))
    dispatch(action(CREATE_MARKET_SET_TAB, changeNumber))
  }
}

export function onChangeName(text) { return action(CREATE_MARKET_NAME_CHANGE, text) }
export function onChangeDesc(text) { return action(CREATE_MARKET_DESC_CHANGE, text) }
export function onChangeDetail(richText) { return action(CREATE_MARKET_DETAIL_CHANGE, richText) }
export function onChangeAvatar(hash) { return action(CREATE_MARKET_AVATAR_CHANGE, hash) }
export function onChangeCover(hash) { return action(CREATE_MARKET_COVER_CHANGE, hash) }
export function onChangeSymbol(text) { return action(CREATE_MARKET_SYMBOL_CHANGE, text) } 
export function onChangePeriod(v) { return action(CREATE_MARKET_PERIOD_CHANGE, v) } 
export function onChangePrice(v) { return action(CREATE_MARKET_PRICE, v) }
export function onChangeUnit(v) { return action(CREATE_MARKET_UNIT, v) }
export function onChangeReserveRatio(v) { return action(CREATE_MARKET_RESERVE, v) }
export function reset() { return action(CREATE_MARKET_RESET) }