import {
  SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, TABLE_HEADER_CLICK, SEARCH_CONTENT_CHANGE, MARKET_TOP_SORT
} from './actionTypes';

import { getMarketList, markerSearch, markerTop, getDefaultMarketList } from '../actions/market';

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
    let activeTabIndex = getState().home.activeTabIndex;
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
      asc: orderBy === 'asc',
      pageNumb: 1,
      pageSize : 10,
    }
    dispatch({
      type: TABLE_HEADER_CLICK,
      payload: { sortBy, orderBy },
    });
    if (activeTabIndex === 0) {
      if (!!name) {
        requestParams.name = name;
        dispatch(markerSearch(requestParams));
      } else {
        dispatch(getMarketList(requestParams));
      }
    } else {
      dispatch({
        type: MARKET_TOP_SORT,
        payload: {
          sortBy,
          orderBy
        }
      });
    }

  }
}

export function setActiveTab(activeTabIndex) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_TAB,
      payload: activeTabIndex
    });
    if (activeTabIndex > 0) {
      dispatch({
        type: SEARCH_CONTENT_CHANGE,
        payload: '',
      });
      dispatch(markerTop(activeTabIndex));
    } else {
      dispatch(getDefaultMarketList());
    }
  }
}

export function onSearchChange(content) {
  return {
    type: SEARCH_CONTENT_CHANGE,
    payload: content,
  }
}

export function searchMarketClick() {
  return (dispatch, getState) => {
    let sortBy = getState().home.sortBy;
    let orderBy = getState().home.orderBy;
    let name = getState().home.searchContent;

    const requestParams = {
      orderBy: sortBy,
      asc: orderBy === 'asc',
      name,
      pageNumb: 1,
      pageSize : 10,
    }

    dispatch({
      type: TABLE_HEADER_CLICK,
      payload: { sortBy, orderBy },
    });
    dispatch({
      type: SET_ACTIVE_TAB,
      payload: 0
    });
    dispatch(markerSearch(requestParams));

  }
}

export function moreMarketClick() {
  return (dispatch, getState) => {
    let sortBy = getState().home.sortBy;
    let orderBy = getState().home.orderBy;
    orderBy = orderBy === 'desc' ? 'asc' : 'desc';
    let name = getState().home.searchContent;
    let activeTabIndex = getState().home.activeTabIndex;

    let pageNumb = getState().market.pageNumb + 1;
    let pageSize = getState().market.pageSize;

    const requestParams = {
      orderBy: sortBy,
      asc: orderBy === 'asc',
      pageNumb,
      pageSize,
    }

    if (activeTabIndex === 0) {
      if (!!name) {
        requestParams.name = name;
        dispatch(markerSearch(requestParams));
      } else {
        dispatch(getMarketList(requestParams));
      }
    } else {
      dispatch({
        type: MARKET_TOP_SORT,
        payload: {
          sortBy,
          orderBy
        }
      });
    }
  }



}


