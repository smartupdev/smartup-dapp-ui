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
  avatarHash: '',
  avatarUploading: false,
  coverHash: '',
  coverUploading: false,
  unit: '',
  unitPrice: '',
  reserveRatio: '',
  marketId: '',
  error: {
    apiError: null,
    name: null,
    desc: null,
    cover: null,
    avatar: null
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
        error: { ...state.error, cover: initialState.error.cover }
      } 
    case CREATE_MARKET_COVER_CHANGE_FAILED:
      return {
        ...state,
        coverUploading: false,
        error: { ...state.error, cover: action.payload }
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
        error: { ...state.error, avatar: initialState.error.avatar }
      }
    case CREATE_MARKET_AVATAR_CHANGE_FAILED:
      return {
        ...state,
        avatarUploading: false,
        error: { ...state.error, avatar: action.payload }
      }


    // case CREATE_MARKET_GET_REQUESTED: 
    //   return {
    //     ...state,
    //     isFetching: true
    //   }
    case CREATE_MARKET_SAVE_SUCCEEDED: 
    case CREATE_MARKET_GET_SUCCEEDED: {
    // "stage" : "creating"
    // status: "locked"
    // stage: "pending"
      let updates = initialState
      if(action.payload) {
        const { marketId, description: desc, name, status, photo, cover } = action.payload
        updates = {
          marketId, 
          desc, name, 
          avatarHash: photo,
          coverHash: cover,
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
          api: initialState.error.api
        },
      }
    case CREATE_MARKET_CHECK_SUCCEEDED: 
      return {
        ...state,
        isFetching: false
      }
    case CREATE_MARKET_CHECK_FAILED: 
      return {
        ...state,
        isFetching: false,
        error: {
          ...state.error,
          api: action.payload.message
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
      const error = length(action.payload) < 3 || length(action.payload) > 40 
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
      const error = length(action.payload) < 1 || length(action.payload) > 2000 
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
        price: action.payload,
        error: {
          ...state.error,
          price: !+action.payload
        }

      }
    case CREATE_MARKET_UNIT: 
      return {
        ...state,
        unit: action.payload,
        error: {
          ...state.error,
          unit: !+action.payload
        }
      }
    case CREATE_MARKET_RESERVE: 
      return {
        ...state,
        reserveRatio: action.payload,
        error: {
          ...state.error,
          reserveRatio: !+action.payload
        }
      }

    case CREATE_MARKET_SET_TAB: {
      const lang = getRawLang()
      const error = {...state.error}
      if(!state.avatarHash) error.avatar = new Error(lang.error.requiredPhoto)
      if(!state.coverHash) error.cover =  new Error(lang.error.requiredPhoto)
      const block = error.name || error.desc || error.avatar || error.cover
      return {
        ...state,
        activeIndex: block ? state.activeIndex : action.payload,
        error
      }
    }

    case CREATE_MARKET_RESET: 
      return initialState

    default:
      return state;
  }
}