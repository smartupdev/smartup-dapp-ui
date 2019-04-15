import { 
  SET_ACTIVE_INDEX, 
  MARKET_NAME_CHANGE, 
  MARKET_DESC_CHANGE, 
  CREATE_MARKET_SMARTUP_SUCCEEDED,
  MARKET_RESET } from '../actions/actionTypes';

export const initialState = {
  activeIndex: 0,
  name: '',
  desc: '',
  error: {
    name: '',
    desc: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_NAME_CHANGE: {
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
    case MARKET_DESC_CHANGE: {
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

    case SET_ACTIVE_INDEX: {
      const block = state.error.name || state.error.desc
      return {
        ...state,
        activeIndex: block ? state.activeIndex : action.payload
      }
    }

    case CREATE_MARKET_SMARTUP_SUCCEEDED: {
      return {
        ...state,
        activeIndex: -1,
      }
    }

    case MARKET_RESET: 
      return initialState

    default:
      return state;
  }
}