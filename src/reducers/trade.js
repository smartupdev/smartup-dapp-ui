import {
    TRADE_BID_CT_REQUESTED, TRADE_BID_CT_SUCCEEDED, TRADE_BID_CT_FAILED,
    TRADE_BID_QUOTE_REQUESTED, TRADE_BID_QUOTE_SUCCEEDED, TRADE_BID_QUOTE_FAILED,
    TRADE_ASK_CT_REQUESTED, TRADE_ASK_CT_SUCCEEDED, TRADE_ASK_CT_FAILED,
    TRADE_ASK_QUOTE_REQUESTED, TRADE_ASK_QUOTE_SUCCEEDED, TRADE_ASK_QUOTE_FAILED,
} from '../actions/actionTypes';

export const initialState = {

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