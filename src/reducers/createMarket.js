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

  CREATE_MARKET_AVATAR_CHANGE_REQUESTED, CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED, CREATE_MARKET_AVATAR_CHANGE_FAILED,
  CREATE_MARKET_COVER_CHANGE_REQUESTED, CREATE_MARKET_COVER_CHANGE_SUCCEEDED, CREATE_MARKET_COVER_CHANGE_FAILED,
  CREATE_MARKET_PRICE, CREATE_MARKET_UNIT, CREATE_MARKET_RESERVE
} from '../actions/actionTypes';

import { length } from '../lib/util'
import { getRawLang } from '../language'

export const initialState = {
  activeIndex: 0,
  isFetching: false,
  isReady: false,
  name: '',
  desc: '',
  avatarHash: '', avatarUploading: false,
  coverHash: '', coverUploading: false,
  unit: '',
  unitPrice: '',
  reserveRatio: '',
  marketId: '',
  error: {
    apiError: null,
    name: null,
    desc: null,
    coverHash: null,
    avatarHash: null,
    unit: null,
    unitPrice: null,
    reserveRatio: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MARKET_COVER_CHANGE_REQUESTED:
      return {
        ...state,
        coverUploading: true,
      } 
    case CREATE_MARKET_COVER_CHANGE_SUCCEEDED:
      return {
        ...state,
        coverUploading: false,
        coverHash: action.payload,
        error: { ...state.error, coverHash: initialState.error.coverHash }
      } 
    case CREATE_MARKET_COVER_CHANGE_FAILED:
      return {
        ...state,
        coverUploading: false,
        error: { ...state.error, coverHash: action.payload }
      }

    case CREATE_MARKET_AVATAR_CHANGE_REQUESTED:
      return {
        ...state,
        avatarUploading: true,
      }
    case CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED:
      return {
        ...state,
        avatarUploading: false,
        avatarHash: action.payload,
        error: { ...state.error, avatarHash: initialState.error.avatarHash }
      }
    case CREATE_MARKET_AVATAR_CHANGE_FAILED:
      return {
        ...state,
        avatarUploading: false,
        error: { ...state.error, avatarHash: action.payload }
      }

    case CREATE_MARKET_SAVE_SUCCEEDED: 
    case CREATE_MARKET_GET_SUCCEEDED: {
    // "stage" : "creating"
    // status: "locked"
    // stage: "pending"
      let updates = initialState
      if(action.payload) {
        const { marketId, 
          description: desc, name, status, photo: avatarHash, cover: coverHash, 
          ctCount: unit, ctPrice: unitPrice, ctRecyclePrice: reserveRatio, } = action.payload
        updates = {
          marketId, 
          desc, name, 
          avatarHash, coverHash,
          unit, unitPrice, reserveRatio,
          activeIndex: status === 'locked' ? -1 : 2
        }
      }
      return {
        ...state,
        ...updates,
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
        error: {
          ...state.error,
          api: initialState.error.api,
          ...action.meta && Object.keys(action.meta).reduce( (p, c) => ({
            ...p, [c]: initialState.error[c]
          }), {})
        },
      }
    case CREATE_MARKET_CHECK_SUCCEEDED: 
      return {
        ...state,
        isFetching: false,
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
      return {
        ...state,
        activeIndex: Object.keys(state.error).some((key) => state.error[key]) ? state.activeIndex : action.payload
      }
    }

    case CREATE_MARKET_RESET: 
      return initialState

    default:
      return state;
  }
}