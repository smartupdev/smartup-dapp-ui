import { 
  CREATE_MARKET_SET_TAB, 
  CREATE_MARKET_NAME_CHANGE, 
  CREATE_MARKET_DESC_CHANGE, 
  // CREATE_MARKET_SMARTUP_SUCCEEDED,
  CREATE_MARKET_RESET,
  // CREATE_MARKET_GET_REQUESTED, 
  CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
  CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,

  CREATE_MARKET_SAVE_REQUESTED, CREATE_MARKET_SAVE_SUCCEEDED, CREATE_MARKET_SAVE_FAILED,
  // CREATE_MARKET_PAY_REQUESTED, 
  CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,

  CREATE_MARKET_AVATAR_CHANGE, 
  CREATE_MARKET_COVER_CHANGE, 
  CREATE_MARKET_PRICE, CREATE_MARKET_UNIT, CREATE_MARKET_RESERVE,
  CREATE_MARKET_DETAIL_CHANGE, CREATE_MARKET_SYMBOL_CHANGE, CREATE_MARKET_PERIOD_CHANGE
} from '../actions/actionTypes';

import { length } from '../lib/util'
import { getRawLang } from '../language'

export const initialState = {
  activeIndex: 0,
  isFetching: false,
  isReady: false,
  name: '',
  desc: '',
  detail: '',
  symbol: '',
  period: 90,
  avatarHash: '', 
  coverHash: '', 
  unit: '',
  unitPrice: '',
  reserveRatio: .5,
  marketId: '',
  error: {
    api: null,
    name: null,
    desc: null,
    detail: null,
    coverHash: null,
    avatarHash: null,
    symbol: null,
    period: null,
    unit: null,
    unitPrice: null,
    reserveRatio: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MARKET_COVER_CHANGE:
      return {
        ...state,
        coverHash: action.payload,
        error: { ...state.error, coverHash: initialState.error.coverHash }
      } 

    case CREATE_MARKET_AVATAR_CHANGE:
      return {
        ...state,
        avatarHash: action.payload,
        error: { ...state.error, avatarHash: initialState.error.avatarHash }
      }

    case CREATE_MARKET_SAVE_SUCCEEDED: 
    case CREATE_MARKET_GET_SUCCEEDED: {
    // "stage" : "creating"
    // status: "locked"
    // stage: "pending"
      let updates = initialState
      if(action.payload) {
        const { marketId, 
          symbol,
          description: desc, detail, name, status, photo: avatarHash, cover: coverHash, closingTime,
          ctCount: unit, ctPrice: unitPrice, ctRecyclePrice, } = action.payload
        updates = {
          marketId, 
          symbol,
          period: Math.round((new Date(closingTime).getTime() - Date.now())/(1000 * 60 * 60 * 24)),
          desc, name, detail, 
          avatarHash, coverHash,
          unit, unitPrice, reserveRatio: ctRecyclePrice/unitPrice,
          activeIndex: status === 'locked' ? -1 : 2
        }
      }
      return {
        ...state,
        ...updates,
        error: initialState.error,
        isReady: true,
      }
    } 
    case CREATE_MARKET_GET_FAILED: 
      return {
        ...state,
        isReady: true
      }
      
    case CREATE_MARKET_CHECK_REQUESTED: 
      return {
        ...state,
        isFetching: true,
        // error: initialState.error,
      }
    case CREATE_MARKET_CHECK_SUCCEEDED: 
      return {
        ...state,
        isFetching: false,
        error: initialState.error,
      }
    case CREATE_MARKET_CHECK_FAILED: 
      return {
        ...state,
        isFetching: false,
        error: {
          ...state.error,
          ...action.payload.message ? { api: action.payload.message } : {
            name: action.payload.name,
            desc: action.payload.description,
            detail: action.payload.detail,
            symbol: action.payload.symbol,
            period: action.payload.closingTime,
            avatarHash: action.payload.photo,
            coverHash: action.payload.cover,
            unit: action.payload.ctCount,
            unitPrice: action.payload.ctPrice,
            reserveRatio: action.payload.ctRecyclePrice, 
          }
        }
      }  

    case CREATE_MARKET_SAVE_REQUESTED: 
      return {
        ...state,
        isFetching: true
      }
    case CREATE_MARKET_PAY_SUCCEEDED: 
      return {
        ...state,
        isFetching: false,
        activeIndex: -1,
      }
    case CREATE_MARKET_SAVE_FAILED: 
    case CREATE_MARKET_PAY_FAILED: 
      return {
        ...state,
        isFetching: false,
        error: {
          ...state.error,
          api: action.payload.message
        }
      }

    case CREATE_MARKET_NAME_CHANGE: {
      const error = length(action.payload) < 3 || length(action.payload) > 40 ? getRawLang().createMarket.nameDes : initialState.error.name
      return {
        ...state,
        name: action.payload,
        error: {
          ...state.error,
          name: error
        }
      }
    }
    case CREATE_MARKET_SYMBOL_CHANGE: {
      const symbol = action.payload.toUpperCase()
      return {
        ...state,
        symbol,
        error: {
          ...state.error,
          symbol: /^[0-9A-HJ-NPR-Z]{3,6}$/.test(symbol) ? initialState.error.symbol : getRawLang().createMarket.symbolError
        }
      }
    }
    case CREATE_MARKET_PERIOD_CHANGE: {
      const periodNum = +action.payload
      return {
        ...state,
        period: action.payload,
        error: {
          ...state.error,
          period: periodNum < 1 || periodNum > 90 ? getRawLang().createMarket.periodError : initialState.error.period
        }
      }
    }
    case CREATE_MARKET_DESC_CHANGE: {
      const error = length(action.payload) < 1 || length(action.payload) > 2000 ? getRawLang().createMarket.overviewDes : initialState.error.desc
      return {
        ...state,
        desc: action.payload,
        error: {
          ...state.error,
          desc: error
        }
      }
    }
    case CREATE_MARKET_DETAIL_CHANGE: 
      return {
        ...state,
        detail: action.payload,
        error: {
          ...state.error,
          detail: initialState.error.detail
        }
      }
    case CREATE_MARKET_PRICE: 
      return {
        ...state,
        unitPrice: action.payload,
        error: {
          ...state.error,
          unitPrice: !+action.payload ? getRawLang().createMarket.issuePriceError : initialState.error.unitPrice
        }

      }
    case CREATE_MARKET_UNIT: 
      return {
        ...state,
        unit: action.payload,
        error: {
          ...state.error,
          unit: !+action.payload ? getRawLang().createMarket.issueUnitError : initialState.error.unit
        }
      }
    case CREATE_MARKET_RESERVE: 
      return {
        ...state,
        reserveRatio: action.payload,
        error: {
          ...state.error,
          reserveRatio: +action.payload > 1 || +action.payload < 0 ? getRawLang().createMarket.reserveRatioError : initialState.error.reserveRatio
        }
      }

    case CREATE_MARKET_SET_TAB: {
      const blockPage0 = state.error.name || state.error.desc || state.error.detail || state.error.avatarHash || state.error.coverHash ||
                         !state.name || !state.desc || !state.detail || !state.avatarHash || !state.coverHash
      const blockPage1 = state.error.symbol || state.error.period || state.error.unit || state.error.unitPrice || state.error.reserveRatio || 
                         !state.symbol || !state.period || !state.unit || !state.unitPrice || !state.reserveRatio
       const blockChangeTab = 
          action.payload > state.activeIndex ?
            action.payload === 1 && blockPage0 ||
            action.payload === 2 && (blockPage0 || blockPage1) 
          : null
      return {
        ...state,
        activeIndex: blockChangeTab ? state.activeIndex : action.payload
      }
    }

    case CREATE_MARKET_RESET: 
      return initialState

    default:
      return state;
  }
}