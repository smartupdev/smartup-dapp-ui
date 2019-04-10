import {
  SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, TABLE_HEADER_CLICK, SEARCH_MARKETS,
} from './actionTypes';

import { bookMarkMarket } from './market';

export function setExpandedRecords(recordData) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_EXPANDED_RECORDS,
      recordData: recordData,
    });
  }
}

export function setActiveTab(activeTab) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_TAB,
      networkStatus: 'loading',
      activeTab: activeTab
    });
    //notify markets refresh
    //getMarketList(params)(dispatch,getState);
  }
}

export function onTableHeaderClick(headerName) {
  return (dispatch, getState) => {
    dispatch({
      type: TABLE_HEADER_CLICK,
      headerName: headerName,
    });
    //notify markets refresh
    //getMarketList(params)(dispatch,getState);
  }
}

export function bookMarkClick(recordData) {
  return bookMarkMarket(recordData);
}

export function searchMarkets(keyword) {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_MARKETS,
      networkStatus: 'loading',
    });
    // Net('API_SEARCH_MARKETS', params, 'get').then((res) => {
    //     dispatch({
    //         type: SEARCH_MARKETS,
    //         networkStatus: 'loading',
    //         data: res
    //     });
    // }).catch((error) => {
    //     dispatch({
    //         type: SEARCH_MARKETS,
    //         networkStatus: 'error',
    //         errorInfo: error,
    //     });
    // });
  }
}
