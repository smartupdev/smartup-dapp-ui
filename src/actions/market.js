import {
  MARKET_DETAIL_RESET,
  MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED, MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED, MARKET_GET_TRADED_MARKET_WITH_CT_FAILED,

  MARKET_ADD_SAVED_MARKET, MARKET_DEL_SAVED_MARKET,

  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
  MARKET_DETAIL_GET_CT_REQUESTED, MARKET_DETAIL_GET_CT_SUCCEEDED, MARKET_DETAIL_GET_CT_FAILED,
} from './actionTypes'
import { action } from './actionHelper'
import { apiGetTradedMarketCt, asyncFunction, callbackFunction, getBalance, getAccount, getMarketCt, smartupWeb3, decodeResult, apiGetMarket, getMarketStatus } from '../integrator'
import { addCollect, delCollect } from './bookmark'

export function resetDetail() {
  return {
    type: MARKET_DETAIL_RESET
  }
}

export function getCtBalance(marketAddress) {
  return (dispatch, getState) => dispatch(
    asyncFunction(
      () => getMarketCt(marketAddress || getState().market.address),
      MARKET_DETAIL_GET_CT_REQUESTED, MARKET_DETAIL_GET_CT_SUCCEEDED, MARKET_DETAIL_GET_CT_FAILED
    )
  )
}

export function get(marketId) {
  return async (dispatch, getState) => {
    try {
      const meta = { marketId }
      dispatch(action(GET_MARKET_DETAIL_REQUESTED, null, meta))
      const market = await apiGetMarket(marketId)()
      // dispatch(getCtBalance(market.marketAddress))
      // const stage = await getMarketStatus(market.marketAddress)
      dispatch(action(GET_MARKET_DETAIL_SUCCEEDED, { ...market, stage: market.stage === 'second' ? 2 : 1 }, meta))
    }
    catch (error) {
      dispatch(action(GET_MARKET_DETAIL_FAILED, error))
    }
  }
}

// DONE
export function getMarketWallet(isLoadMore) {
  return (dispatch, getState) => {
    const { pageSize, pageNumb } = getState().userMarketWallet;
    dispatch(
      asyncFunction(
        apiGetTradedMarketCt({ pageSize, pageNumb, isLoadMore }),
        MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED, MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED, MARKET_GET_TRADED_MARKET_WITH_CT_FAILED,
        {
          meta: { isLoadMore }
        }
      )
    )
  }
}

export function toggleSavedMarket(market) {
  return market.following ? delSavedMarket(market) : addSavedMarket(market)
}

export function addSavedMarket(market) {
  return dispatch => {
    dispatch({
      type: MARKET_ADD_SAVED_MARKET,
      payload: market
    })
    return dispatch(addCollect('market', market.id))
  }
}
export function delSavedMarket(market) {
  return dispatch => {
    dispatch({
      type: MARKET_DEL_SAVED_MARKET,
      payload: market
    })
    return dispatch(delCollect('market', market.id))
  }
}