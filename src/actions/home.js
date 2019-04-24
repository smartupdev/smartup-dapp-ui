import {
  SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, TABLE_HEADER_CLICK,SEARCH_CONTENT_CHANGE
} from './actionTypes';

import { getMarketList,markerSearch } from '../actions/market';

export function setExpandedRecords(recordData) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_EXPANDED_RECORDS,
      payload: recordData,
    });
  }
}

export function onTableHeaderClick(headerName) {
  return (dispatch, getState) => {
    let sortBy = getState().home.sortBy;
    let orderBy = getState().home.orderBy;
    let name = getState().home.searchContent;
    if (!!headerName) {
      if (sortBy !== headerName) {
        sortBy = headerName;
        orderBy = 'desc';
      } else {
        orderBy = orderBy === 'desc' ? 'asc' : 'desc';
      }
    }

    const requestParams = {
      orderBy: sortBy,
      asc: orderBy === 'asc'
    }
    dispatch({
      type: TABLE_HEADER_CLICK,
      payload: { sortBy, orderBy },
    });
    if(!!name){
      requestParams.name = name;
      dispatch(markerSearch(requestParams));
    }else{
      dispatch(getMarketList(requestParams));
    }
  }
}

export function setActiveTab(activeTab) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_TAB,
      networkStatus: 'loading',
      activeTab: activeTab
    });
  }
}

export function onSearchChange(content){
  return {
    type:SEARCH_CONTENT_CHANGE,
    payload: content,
  }
}

export function searchMarketClick(){
  return (dispatch, getState) => {
    let sortBy = getState().home.sortBy;
    let orderBy = getState().home.orderBy;
    let name = getState().home.searchContent;

    const requestParams = {
      orderBy: sortBy,
      asc: orderBy === 'asc',
      name,
    }

    dispatch({
      type: TABLE_HEADER_CLICK,
      payload: { sortBy, orderBy },
    });
    dispatch(markerSearch(requestParams));

  }
}


