import {
  TRADE_BID_CT_REQUESTED, TRADE_BID_CT_SUCCEEDED, TRADE_BID_CT_FAILED,
  TRADE_BID_QUOTE_REQUESTED, TRADE_BID_QUOTE_SUCCEEDED, TRADE_BID_QUOTE_FAILED,
  TRADE_ASK_CT_REQUESTED, TRADE_ASK_CT_SUCCEEDED, TRADE_ASK_CT_FAILED,
  TRADE_ASK_QUOTE_REQUESTED, TRADE_ASK_QUOTE_SUCCEEDED, TRADE_ASK_QUOTE_FAILED,
  TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
  TOGGLE_IS_SELL, TRADE_CHANGE_CT_AMOUNT,
} from '../actions/actionTypes';



export const initialState = {
  isSell: false,
  ctInputAmount: null,

  trades:[], 
  /*
  [
      {
        "txHash": "0x82f02b76b9324524a8c9fafa0a795b71b1e223d9601b26d94decceb931dc423d",
        "stage": "success",
        "userAddress": "0x8028012ef4b5aceba7778afbdf1757018af1eee8",
        "marketAddress": "0xf6f7c3cdba6ef2e9fff12b1702481f99ca6cd38c",
        "type": "buy",
        "sutOffer": 0.8893047281869846,
        "sutAmount": 0.8893047281869846,
        "ctAmount": 1000,
        "createTime": "2019-04-16 23:18:18",
        "blockTime": "2019-04-16 23:18:10"
      }
    ]
  */
  gettingTrades: false,
  getTradesError: null,

  bidQuoteAmount: null,
  bidingQuote: false,
  bidQuoteError: null,

  askQuoteAmount: null,
  askingQuote: false,
  askQuoteError: null,

  bidCtHash: null,
  bidingCt: false,
  bidCtError: null,

  askCtHash: null,
  askingCt: false,
  askCtError: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRADE_CHANGE_CT_AMOUNT:
      return {
        ...state,
        ctInputAmount: action.payload,
      };
    case TOGGLE_IS_SELL: {
      return {
        ...state,
        isSell: !state.isSell,
      }
    }

  case TRADE_LIST_REQUESTED:
    return {
      ...state,
      gettingTrades: true,
    };
  case TRADE_LIST_SUCCEEDED:
    return {
      ...state,
      trades: action.payload,
      gettingTrades: false,
      getTradesError: initialState.getTradesError
    };
  case TRADE_LIST_FAILED:
    return {
      ...state,
      gettingTrades: false,
      getTradesError: action.payload,
    };
    case TRADE_BID_QUOTE_REQUESTED:
      return {
        ...state,
        bidingQuote: true,
      };
    case TRADE_BID_QUOTE_SUCCEEDED:
      return {
        ...state,
        bidQuoteAmount: action.payload,
        bidingQuote: false,
        bidQuoteError: initialState.bidQuoteError
      };
    case TRADE_BID_QUOTE_FAILED:
      return {
        ...state,
        bidingQuote: false,
        bidQuoteError: action.payload,
      };
    case TRADE_BID_CT_REQUESTED:
      return {
        ...state,
        bidingCt: true,
      };
    case TRADE_BID_CT_SUCCEEDED:
      return {
        ...state,
        bidCtHash: action.payload.hash,
        bidingCt: false,
        bidCtError: initialState.bidCtError
      };
    case TRADE_BID_CT_FAILED:
      return {
        ...state,
        bidingCt: false,
        bidCtError: action.payload,
      };
    case TRADE_ASK_QUOTE_REQUESTED:
      return {
        ...state,
        askingQuote: true,
      };
    case TRADE_ASK_QUOTE_SUCCEEDED:
      return {
        ...state,
        askQuoteAmount: action.payload,
        askingQuote: false,
        askQuoteError: initialState.askQuoteError
      };
    case TRADE_ASK_QUOTE_FAILED:
      return {
        ...state,
        askingQuote: false,
        askQuoteError: action.payload,
      };
    case TRADE_ASK_CT_REQUESTED:
      return {
        ...state,
        askingCt: true,
      };
    case TRADE_ASK_CT_SUCCEEDED:
      return {
        ...state,
        askCtHash: action.payload,
        askingCt: false,
        askCtError: initialState.askCtError
      };
    case TRADE_ASK_CT_FAILED:
      return {
        ...state,
        askingCt: false,
        askCtError: action.payload,
      };
    default:
      return state;
  }
}