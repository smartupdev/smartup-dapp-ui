import {
    MARKET_PROPODAL_LIST_REQUESTED, MARKET_PROPODAL_LIST_SUCCEEDED, MARKET_PROPODAL_LIST_FAILED,
    MARKET_PROPODAL_ONE_REQUESTED, MARKET_PROPODAL_ONE_SUCCEEDED, MARKET_PROPODAL_ONE_FAILED,
    USER_PROPODAL_LIST_REQUESTED, USER_PROPODAL_LIST_SUCCEEDED, USER_PROPODAL_LIST_FAILED,
    USER_PROPODAL_SUGGEST_EDITING_REQUESTED, USER_PROPODAL_SUGGEST_EDITING_SUCCEEDED, USER_PROPODAL_SUGGEST_EDITING_FAILED,
    USER_PROPODAL_SUGGEST_SAVE_REQUESTED, USER_PROPODAL_SUGGEST_SAVE_SUCCEEDED, USER_PROPODAL_SUGGEST_SAVE_FAILED,
    USER_PROPODAL_SUT_EDITING_REQUESTED, USER_PROPODAL_SUT_EDITING_SUCCEEDED, USER_PROPODAL_SUT_EDITING_FAILED,
    USER_PROPODAL_SUT_SAVE_REQUESTED, USER_PROPODAL_SUT_SAVE_SUCCEEDED, USER_PROPODAL_SUT_SAVE_FAILED,
} from '../actions/actionTypes';

export const initialState = {
    marketProposals: [],
    gettingMarketProposal: false,
    merketProposalError: null,

    proposalDetail: {},
    gettingProposalDetail: false,
    proposalDetailError: null,

    userProposals: [],
    gettingUserProposal: false,
    userProposalError: null,

    editSuggest: {},
    edittingSuggest: false,
    edittingSuggestError: null,

    savingSuggest: false,
    saveSuggestError: null,

    editSut: {},
    edittingSut: false,
    edittingSutError: null,

    savingSut: false,
    saveSutError: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case MARKET_PROPODAL_LIST_REQUESTED:
            return {
                ...state,
                gettingMarketProposal: true,
            };
        case MARKET_PROPODAL_LIST_SUCCEEDED:
            return {
                ...state,
                marketProposals: action.payload,
                gettingMarketProposal: false,
                merketProposalError: initialState.merketProposalError,
            };
        case MARKET_PROPODAL_LIST_FAILED:
            return {
                ...state,
                gettingMarketProposal: false,
                merketProposalError: action.payload,
            };
        case MARKET_PROPODAL_ONE_REQUESTED:
            return {
                ...state,
                gettingProposalDetail: true,
            };
        case MARKET_PROPODAL_ONE_SUCCEEDED:
            return {
                ...state,
                proposalDetail: action.payload,
                gettingProposalDetail: false,
                proposalDetailError: initialState.proposalDetailError,
            };
        case MARKET_PROPODAL_ONE_FAILED:
            return {
                ...state,
                gettingProposalDetail: false,
                proposalDetailError: action.payload,
            };
        case USER_PROPODAL_LIST_REQUESTED:
            return {
                ...state,
                gettingUserProposal: true,
            };
        case USER_PROPODAL_LIST_SUCCEEDED:
            return {
                ...state,
                userProposals: action.payload,
                gettingUserProposal: false,
                userProposalError: initialState.userProposalError,
            };
        case USER_PROPODAL_LIST_FAILED:
            return {
                ...state,
                gettingUserProposal: false,
                userProposalError: action.payload,
            };
        case USER_PROPODAL_SUGGEST_EDITING_REQUESTED:
            return {
                ...state,
                edittingSuggest: true,
            };
        case USER_PROPODAL_SUGGEST_EDITING_SUCCEEDED:
            return {
                ...state,
                editSuggest: action.payload,
                edittingSuggest: false,
                edittingSuggestError: initialState.edittingSuggestError,
            };
        case USER_PROPODAL_SUGGEST_EDITING_FAILED:
            return {
                ...state,
                edittingSuggest: false,
                edittingSuggestError: action.payload,
            };
        case USER_PROPODAL_SUGGEST_SAVE_REQUESTED:
            return {
                ...state,
                savingSuggest: true,
            };
        case USER_PROPODAL_SUGGEST_SAVE_SUCCEEDED:
            return {
                ...state,
                savingSuggest: false,
                saveSuggestError: initialState.saveSuggestError,
            };
        case USER_PROPODAL_SUGGEST_SAVE_FAILED:
            return {
                ...state,
                savingSuggest: false,
                saveSuggestError: action.payload,
            };
        case USER_PROPODAL_SUT_EDITING_REQUESTED:
            return {
                ...state,
                edittingSut: true,
            };
        case USER_PROPODAL_SUT_EDITING_SUCCEEDED:
            return {
                ...state,
                editSut: action.payload,
                edittingSut: false,
                edittingSutError: initialState.edittingSutError,
            };
        case USER_PROPODAL_SUT_EDITING_FAILED:
            return {
                ...state,
                edittingSut: false,
                edittingSutError: action.payload,
            };
        case USER_PROPODAL_SUT_SAVE_REQUESTED:
            return {
                ...state,
                savingSut: true,
            };
        case USER_PROPODAL_SUT_SAVE_SUCCEEDED:
            return {
                ...state,
                savingSut: false,
                saveSutError: initialState.saveSutError,
            };
        case USER_PROPODAL_SUT_SAVE_FAILED:
            return {
                ...state,
                savingSut: false,
                saveSutError: action.payload,
            };

        default:
            return state;
    }
};