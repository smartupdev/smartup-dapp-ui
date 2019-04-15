import {
    TRADE_BID_CT_REQUESTED, TRADE_BID_CT_SUCCEEDED, TRADE_BID_CT_FAILED,
    TRADE_ASK_CT_REQUESTED, TRADE_ASK_CT_SUCCEEDED, TRADE_ASK_CT_FAILED,
} from '../actions/actionTypes';

export const initialState = {

    bidCtHash: null,
    bidingCt: false,
    bidCtError: null,

    askCtHash: null,
    askingCt: false,
    askCtError: null,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case TRADE_BID_CT_REQUESTED:
            return {
                ...state,
                bidingCt: true,
            };
        case TRADE_BID_CT_SUCCEEDED:
            return {
                ...state,
                bidCtHash: action.payload,
                bidingCt: false,
                bidCtError: initialState.bidCtError
            };
        case TRADE_BID_CT_FAILED:
            return {
                ...state,
                bidingCt: false,
                bidCtError: action.payload,
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