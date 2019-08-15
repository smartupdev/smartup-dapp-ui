import {
  GET_MARKET_DETAIL_SUCCEEDED,

  TRADE_RESET,
  TRADE_TOGGLE_AGREE_TNC,
  TRADE_CHANGE_BUY_UNIT,
  TRADE_CHANGE_BUY_PRICE,
  TRADE_CHANGE_SELL_PRICE,
  TRADE_GET_GAS_FEE_SUCCEEDED,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED,
} from '../actions/actionTypes'

export const initialState = {
  agreeTnc: false,

  buyUnit: '',
  buyPrice: '',
  sellPrice: '',

  estGasFee: null,
  estMatchedOrder: 0,

  isTrading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRADE_RESET:
      return initialState

    case GET_MARKET_DETAIL_SUCCEEDED:
      return {
        ...state,
        buyPrice: action.payload.ctPrice
      }

    case TRADE_TOGGLE_AGREE_TNC:
      return {
        ...state,
        agreeTnc: !state.agreeTnc,
      }  
    case TRADE_CHANGE_BUY_UNIT:
      return {
        ...state,
        buyUnit: action.payload
      }
    case TRADE_CHANGE_BUY_PRICE:
      return {
        ...state,
        buyPrice: action.payload
      }    
  
    case TRADE_CHANGE_SELL_PRICE:
      return {
        ...state,
        sellPrice: action.payload
      }    

    case TRADE_GET_GAS_FEE_SUCCEEDED:
      const { gasFee: estGasFee = state.estGasFee, matchedOrder: estMatchedOrder = state.estMatchedOrder } = (action.payload || {})
      return {
        ...state,
        estGasFee,
        estMatchedOrder
      }

    case TRADE_REQUESTED:
      return {
        ...state,
        isTrading: true
      }
    case TRADE_SUCCEEDED: 
      return initialState
    case TRADE_FAILED:
      return {
        ...state,
        isTrading: false,
        error: action.payload
      }

    default:
      return state;
  }
}