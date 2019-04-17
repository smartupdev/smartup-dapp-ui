import {
  TOGGLE_IS_SELL,
  TRADE_CHANGE_CT, TRADE_CHANGE_SUT,
  TRADE_GET_CT_REQUESTED, TRADE_GET_CT_SUCCEEDED, TRADE_GET_CT_FAILED,
  TRADE_GET_SUT_REQUESTED, TRADE_GET_SUT_SUCCEEDED, TRADE_GET_SUT_FAILED,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED,

} from '../actions/actionTypes';

export const initialState = {
  isSell: false,
  ctInputAmount: null,

  sut: '',
  gettingSUT: false,
  sutError: null,

  ct: '',
  gettingCT: false,
  ctError: null,

  isTrading: false,
  tradingError: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRADE_CHANGE_SUT: 
      return {
        ...state,
        sut: action.payload
      }
    case TRADE_GET_CT_REQUESTED: 
      return {
        ...state,
        gettingCT: true
      }
    case TRADE_GET_CT_SUCCEEDED: 
      return {
        ...state,
        gettingCT: false,
        ct: action.payload,
        ctError: initialState.ctError
      }
    case TRADE_GET_CT_FAILED: 
      return {
        ...state,
        gettingCT: false,
        ctError: action.payload
      }

    case TRADE_CHANGE_CT: 
      return {
        ...state,
        ct: action.payload
      }
    case TRADE_GET_SUT_REQUESTED: 
      return {
        ...state,
        gettingSUT: true
      }
    case TRADE_GET_SUT_SUCCEEDED: 
      return {
        ...state,
        gettingSUT: false,
        sut: action.payload,
        sutError: initialState.sutError
      }
    case TRADE_GET_SUT_FAILED: 
      return {
        ...state,
        gettingSUT: false,
        sutError: action.payload
      }

    case TRADE_REQUESTED: 
      return {
        ...state,
        isTrading: true
      }
    case TRADE_SUCCEEDED: {
      const { ct, sut, tradingError, isTrading } = initialState
      return {
        ...state, ct, sut, tradingError, isTrading,
      }
    }
    case TRADE_FAILED: 
      return {
        ...state,
        isTrading: false
      }

    case TOGGLE_IS_SELL: {
      return {
        ...state,
        isSell: !state.isSell,
      }
    }

    default:
      return state;
  }
}