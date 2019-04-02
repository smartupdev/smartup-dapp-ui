import {
    SET_EXPANDED_RECORDS,SET_ACTIVE_TAB,GET_TOTAL_RESULT,
    TABLE_HEADER_CLICK
} from './actionTypes';
import {GET_MARKETS,SEARCH_MARKETS} from './api';

export function setExpandedRecords(recordData) {
    return {
        type: SET_EXPANDED_RECORDS,
        recordData: recordData,
    }
}

export function setActiveTab(activeTab) {
    //(value,index)
    return {
        type: SET_ACTIVE_TAB,
        activeTab: activeTab,
    }
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

