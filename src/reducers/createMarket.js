import { 
  CREATE_MARKET_SET_TAB, 
  CREATE_MARKET_NAME_CHANGE, 
  CREATE_MARKET_DESC_CHANGE, 
  CREATE_MARKET_SMARTUP_SUCCEEDED,
  CREATE_MARKET_RESET,
  CREATE_MARKET_GET_REQUESTED, CREATE_MARKET_GET_SUCCEEDED, CREATE_MARKET_GET_FAILED,
  CREATE_MARKET_CHECK_REQUESTED, CREATE_MARKET_CHECK_SUCCEEDED, CREATE_MARKET_CHECK_FAILED,

  CREATE_MARKET_SAVE_REQUESTED, CREATE_MARKET_SAVE_SUCCEEDED, CREATE_MARKET_SAVE_FAILED,
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,

  CREATE_MARKET_AVATAR_CHANGE_REQUESTED, CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED, CREATE_MARKET_AVATAR_CHANGE_FAILED,
  CREATE_MARKET_COVER_CHANGE_REQUESTED, CREATE_MARKET_COVER_CHANGE_SUCCEEDED, CREATE_MARKET_COVER_CHANGE_FAILED,
} from '../actions/actionTypes';

import { ipfsHost } from '../actions/ipfs'

export const initialState = {
  activeIndex: 0,
  isFetching: false,
  isReady: false,
  name: '',
  desc: '',
  avatarUrl: null,
  avatarHash: '',
  avatarUploading: false,
  coverUrl: null,
  coverHash: '',
  coverUploading: false,
  marketId: '',
  error: {
    name: null,
    desc: null
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
        coverUrl: action.payload ? ipfsHost + action.payload : initialState.coverUrl
      } 
    case CREATE_MARKET_COVER_CHANGE_FAILED:
      return {
        ...state,
        coverUploading: false,
      }

    case CREATE_MARKET_AVATAR_CHANGE_REQUESTED:
      return {
        ...state,
        avatarUploading: true
      }
    case CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED:
      return {
        ...state,
        avatarUploading: false,
        avatarHash: action.payload,
        avatarUrl: action.payload ? ipfsHost + action.payload : initialState.avatarUrl
      }
    case CREATE_MARKET_AVATAR_CHANGE_FAILED:
      return {
        ...state,
        avatarUploading: false
      }


    case CREATE_MARKET_GET_REQUESTED: 
      return {
        ...state,
        isFetching: true
      }
    case CREATE_MARKET_SAVE_SUCCEEDED: 
    case CREATE_MARKET_GET_SUCCEEDED: {
    // "stage" : "creating"
    // status: "locked"
    // stage: "pending"
      const { marketId, description: desc, name, status } = action.payload
      return {
        ...state,
        isFetching: false,
        isReady: true,
        ...marketId && {
          marketId, desc, name, activeIndex: status === 'locked' ? -1 : 2
        }
      }
    } 
    case CREATE_MARKET_GET_FAILED: 
      return {
        ...state,
        isFetching: false,
        isReady: true
      }
      
    case CREATE_MARKET_CHECK_REQUESTED: 
      return {
        ...state,
        isFetching: true
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
          name: action.payload.message
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
      const error = action.payload.length < 3 || action.payload.length > 20 
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
      const error = action.payload.length < 1 || action.payload.length > 150 
      return {
        ...state,
        desc: action.payload,
        error: {
          ...state.error,
          desc: error
        }
      }
    }

    case CREATE_MARKET_SET_TAB: {
      const block = state.error.name || state.error.desc
      return {
        ...state,
        activeIndex: block ? state.activeIndex : action.payload
      }
    }

    case CREATE_MARKET_RESET: 
      return initialState

    default:
      return state;
  }
}