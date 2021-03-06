import {
  GET_MARKET_DETAIL_SUCCEEDED,
  MARKET_DETAIL_RESET,

  TRADE_RESET,
  TRADE_SIGN_ORDER,
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
  signing: null, // { make<boolean>, take<boolean>, buy<boolean>, sell<boolean> }
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_DETAIL_RESET: 
      return initialState
    // case TRADE_RESET:
    //   return {...initialState, buyPrice: state.buyPrice}
    case GET_MARKET_DETAIL_SUCCEEDED:
      return {
        ...state,
        buyPrice: action.payload.stage === 1 ? action.payload.ctPrice : state.buyPrice
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
      const { gasFee: estGasFee = state.estGasFee, times: estMatchedOrder = state.estMatchedOrder } = (action.payload || {})
      return {
        ...state,
        estGasFee,
        estMatchedOrder
      }

    case TRADE_SIGN_ORDER:
      return {
        ...state,
        signing: action.payload
      }

    case TRADE_REQUESTED:
      return {
        ...state,
        isTrading: true,
        error: initialState.error
      }
    case TRADE_SUCCEEDED: 
      return initialState
    case TRADE_FAILED:
      return {
        ...state,
        isTrading: false,
        signing: initialState.signing,
        error: action.payload
      }

    default:
      return state;
  }
}