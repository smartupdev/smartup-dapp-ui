import {
    LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
    METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
    METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
    METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
} from '../actions/actionTypes';

export const initialState = {
    account: null,
    ethBalance: null,
    sutBalance: null,
    nttBalance: null,

    isLogining: false,
    loggedIn: false,
    loginError: false,
    loginErrorMsg: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_METAMASK_REQUESTED:
            return {
                ...state,
                isLogining: true,
            };
        case LOGIN_METAMASK_SUCCEEDED:
            return {
                ...state,
                account: action.payload.account,
                isLogining: false,
                loggedIn: true,
            };
        case LOGIN_METAMASK_FAILED:
            return {
                ...state,
                isLogining: false,
                loggedIn: false,
                loginError: true,
                loginErrorMsg: action.payload.msg,
            };
        case METAMASK_ETH_BALANCE_SUCCEEDED:
            return {
                ...state,
                ethBalance: action.payload.ethBalance,
            };
        case METAMASK_ETH_BALANCE_FAILED:
            return {
                ...state,
                ethBalance: null,
            };
        case METAMASK_SUT_BALANCE_SUCCEEDED:
            return {
                ...state,
                sutBalance: action.payload.sutBalance,
            };
        case METAMASK_SUT_BALANCE_FAILED:
            return {
                ...state,
                sutBalance: null,
            };
        case METAMASK_SUT_BALANCE_SUCCEEDED:
            return {
                ...state,
                sutBalance: action.payload.sutBalance,
            };
        case METAMASK_SUT_BALANCE_FAILED:
            return {
                ...state,
                sutBalance: null,
            };
        case METAMASK_SUT_BALANCE_FAILED:
            return {
                ...state,
                sutBalance: null,
            };
        case METAMASK_NTT_BALANCE_SUCCEEDED:
            return {
                ...state,
                nttBalance: action.payload.nttBalance,
            };
        case METAMASK_NTT_BALANCE_FAILED:
            return {
                ...state,
                nttBalance: null,
            };
        default:
            return state;
    }
};