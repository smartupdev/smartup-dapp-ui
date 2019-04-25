import {
    MARKET_PROPODAL_LIST_REQUESTED, MARKET_PROPODAL_LIST_SUCCEEDED, MARKET_PROPODAL_LIST_FAILED,
    MARKET_PROPODAL_ONE_REQUESTED, MARKET_PROPODAL_ONE_SUCCEEDED, MARKET_PROPODAL_ONE_FAILED,
    USER_PROPODAL_LIST_REQUESTED, USER_PROPODAL_LIST_SUCCEEDED, USER_PROPODAL_LIST_FAILED,
    USER_PROPODAL_SUGGEST_EDITING_REQUESTED, USER_PROPODAL_SUGGEST_EDITING_SUCCEEDED, USER_PROPODAL_SUGGEST_EDITING_FAILED,
    USER_PROPODAL_SUGGEST_SAVE_REQUESTED, USER_PROPODAL_SUGGEST_SAVE_SUCCEEDED, USER_PROPODAL_SUGGEST_SAVE_FAILED,
    USER_PROPODAL_SUT_EDITING_REQUESTED, USER_PROPODAL_SUT_EDITING_SUCCEEDED, USER_PROPODAL_SUT_EDITING_FAILED,
    USER_PROPODAL_SUT_SAVE_REQUESTED, USER_PROPODAL_SUT_SAVE_SUCCEEDED, USER_PROPODAL_SUT_SAVE_FAILED,
} from '../actions/actionTypes';
import fetch from '../lib/util/fetch';
import {
    API_MARKET_PROPOSAL_LIST, API_PROPOSAL_ONE, API_USER_PROPOSAL_LIST,
    API_USER_PROPOSAL_SUGGEST_EDITING, API_USER_PROPOSAL_SUGGEST_SAVE,
    API_USER_PROPOSAL_SUT_EDITING, API_USER_PROPOSAL_SUT_SAVE,
} from './api';
import { asyncFunction } from '../integrator'

//市场提案列表
export function getMarketProposalList() {
    return (dispatch, getState) => {
        const { market: { currentMarket: { address } } } = getState()
        dispatch(
            asyncFunction(
                fetch.post,
                MARKET_PROPODAL_LIST_REQUESTED, MARKET_PROPODAL_LIST_SUCCEEDED, MARKET_PROPODAL_LIST_FAILED,
                {
                    params: API_MARKET_PROPOSAL_LIST,
                    params2: {
                        marketAddress: address,
                    },
                    responsePayload: reps => reps.list
                }
            )
        )
    }
}

//提案详情
export function getMarketProposalDetail(proposalId) {
    return (dispatch, getState) => {
        dispatch(
            asyncFunction(
                fetch.post,
                MARKET_PROPODAL_ONE_REQUESTED, MARKET_PROPODAL_ONE_SUCCEEDED, MARKET_PROPODAL_ONE_FAILED,
                {
                    params: API_PROPOSAL_ONE,
                    params2: {
                        proposalId,
                    }
                }
            )
        )
    }
}

//用户提案列表
export function getUserProposalList() {
    return (dispatch, getState) => {
        dispatch(
            asyncFunction(
                fetch.post,
                USER_PROPODAL_LIST_REQUESTED, USER_PROPODAL_LIST_SUCCEEDED, USER_PROPODAL_LIST_FAILED,
                {
                    params: API_USER_PROPOSAL_LIST,
                    responsePayload: reps => reps.list
                }
            )
        )
    }
}

//用户当前编辑的suggest提案
export function getProposalSuggestEditting() {
    return (dispatch, getState) => {
        const { market: { currentMarket: { address } } } = getState()
        dispatch(
            asyncFunction(
                fetch.post,
                USER_PROPODAL_SUGGEST_EDITING_REQUESTED, USER_PROPODAL_SUGGEST_EDITING_SUCCEEDED, USER_PROPODAL_SUGGEST_EDITING_FAILED,
                {
                    params: API_USER_PROPOSAL_SUGGEST_EDITING,
                    params2: {
                        marketAddress: address,
                    }
                }
            )
        )
    }
}

//保存suggest提案
export function saveProposalSuggest() {
    return (dispatch, getState) => {
        const { market: { currentMarket: { address } } } = getState()
        const requestParams = {
            marketAddress: address,
            name,
            description,
            options
        }
        dispatch(
            asyncFunction(
                fetch.post,
                USER_PROPODAL_SUGGEST_SAVE_REQUESTED, USER_PROPODAL_SUGGEST_SAVE_SUCCEEDED, USER_PROPODAL_SUGGEST_SAVE_FAILED,
                {
                    params: API_USER_PROPOSAL_SUGGEST_SAVE,
                    params2: requestParams
                }
            )
        )
    }
}

//用户当前编辑的sut提案
export function getProposalSutEditting() {
    return (dispatch, getState) => {
        const { market: { currentMarket: { address } } } = getState()
        dispatch(
            asyncFunction(
                fetch.post,
                USER_PROPODAL_SUT_EDITING_REQUESTED, USER_PROPODAL_SUT_EDITING_SUCCEEDED, USER_PROPODAL_SUT_EDITING_FAILED,
                {
                    params: API_USER_PROPOSAL_SUT_EDITING,
                    params2: {
                        marketAddress: address,
                    }
                }
            )
        )
    }
}

//保存sut提案
export function saveProposalSut() {
    return (dispatch, getState) => {
        const { market: { currentMarket: { address } } } = getState()
        const requestParams = {
            marketAddress: address,
            name,
            description,
            sutAmount,
        }
        dispatch(
            asyncFunction(
                fetch.post,
                USER_PROPODAL_SUT_SAVE_REQUESTED, USER_PROPODAL_SUT_SAVE_SUCCEEDED, USER_PROPODAL_SUT_SAVE_FAILED,
                {
                    params: API_USER_PROPOSAL_SUT_SAVE,
                    params2: requestParams
                }
            )
        )
    }
}