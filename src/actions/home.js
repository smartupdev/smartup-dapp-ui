import {
    SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, GET_TOTAL_RESULT,
    TABLE_HEADER_CLICK, SEARCH_MARKETS,BOOKMARK_CLICK,
} from './actionTypes';

import { API_GET_MARKETS, API_SEARCH_MARKETS } from './api';
import { Net } from '../lib/util/request';

export function setExpandedRecords(recordData) {
    return (dispatch, getState) => {
        const { record: { id }, isExpanded } = recordData;
        const currentExpandeds = getState().home.expandedRecords;
        const tempExpandeds = isExpanded ?
            currentExpandeds.filter(r => r !== id) : [...currentExpandeds, id];
        dispatch({
            type: SET_EXPANDED_RECORDS,
            expandedRecords: tempExpandeds,
        });
    }
}

export function setActiveTab(activeTab) {
    const { value, index } = activeTab;
    let params = {
        type: value
    };

    return (dispatch,getState)=>{
        dispatch({
            type: SET_ACTIVE_TAB,
            networkStatus: 'loading',
            activeTab: activeTab
        });
    }

    // return (dispatch, getState) => {
    //     dispatch({
    //         type: SET_ACTIVE_TAB,
    //         networkStatus: 'loading',
    //     });
    //     Net(API_GET_MARKETS, params, 'get').then((res) => {
    //         dispatch({
    //             type: SET_ACTIVE_TAB,
    //             networkStatus: 'loading',
    //             data: res
    //         });
    //     }).catch((error) => {
    //         dispatch({
    //             type: SET_ACTIVE_TAB,
    //             networkStatus: 'error',
    //             errorInfo: error,
    //         });
    //     });
    // }
}

export function searchMarkets(keyword) {
    let params = {
        keyword: keyword
    };

    return (dispatch, getState) => {
        dispatch({
            type: SEARCH_MARKETS,
            networkStatus: 'loading',
        });
        Net(API_SEARCH_MARKETS, params, 'get').then((res) => {
            dispatch({
                type: SEARCH_MARKETS,
                networkStatus: 'loading',
                data: res
            });
        }).catch((error) => {
            dispatch({
                type: SEARCH_MARKETS,
                networkStatus: 'error',
                errorInfo: error,
            });
        });
    }
}

export function bookMarkClick(recordData) {
    const { id,following } = recordData;
    let params = {
        id: id,
        following: !following
    };
    return (dispatch, getState) => {
        const currentMarkets = getState().home.markets;
        let market = currentMarkets.find(r => r.id === id);
        market.following = !following;
        console.log('------------111',market);
        console.log('------------222',currentMarkets);
        dispatch({
            type: BOOKMARK_CLICK,
            markets: currentMarkets,
        });
    }
    // return (dispatch, getState) =>{
    //     dispatch({
    //         type: BOOKMARK_CLICK,
    //         networkStatus: 'loading',
    //     });
    //     Net(API_SEARCH_MARKETS, params, 'get').then((res) => {
    //         dispatch({
    //             type: BOOKMARK_CLICK,
    //             networkStatus: 'success',
    //             data: res
    //         });
    //     }).catch((error) => {
    //         dispatch({
    //             type: BOOKMARK_CLICK,
    //             networkStatus: 'error',
    //             errorInfo: error,
    //         });
    //     });
    // }
}

export function onTableHeaderClick(headerName) {
    return {
        type: TABLE_HEADER_CLICK,
        headerName: headerName,
    }
}

function getToatalResult(totalResults) {
    //(value,index)
    return {
        type: GET_TOTAL_RESULT,
        totalResults: totalResults,
    }
}

