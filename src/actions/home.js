import {
  SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, HOME_SET_SORTING, SEARCH_CONTENT_CHANGE, // MARKET_TOP_SORT,
  HOME_RESET,
} from './actionTypes';

import {  getList } from '../actions/market';

export function reset() {
  return {
    type: HOME_RESET
  }
}

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
    dispatch({
      type: HOME_SET_SORTING,
      payload: { sortBy: headerName },
    });
    dispatch(getList());
  }
}

export function setActiveTab(activeTabIndex) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_TAB,
      payload: activeTabIndex
    });
    dispatch(getList());
  }
}

export function onSearchChange(content) {
  return {
    type: SEARCH_CONTENT_CHANGE,
    payload: content,
  }
}

// export function moreMarketClick() {
//   return (dispatch, getState) => {
//   //   let sortBy = getState().home.sortBy;
//   //   let orderBy = getState().home.orderBy;
//   //   orderBy = orderBy === 'desc' ? 'asc' : 'desc';
//   //   let name = getState().home.searchContent;
//   //   let activeTabIndex = getState().home.activeTabIndex;

//   //   let pageNumb = getState().market.pageNumb + 1;
//   //   let pageSize = getState().market.pageSize;

//   //   const requestParams = {
//   //     orderBy: sortBy,
//   //     asc: orderBy === 'asc',
//   //     pageNumb,
//   //     pageSize,
//   //   }

//   //   if (activeTabIndex === 0) {
//   //     if (!!name) {
//   //       requestParams.name = name;
//   //       // dispatch(markerSearch(requestParams));
//   //     } else {
//   //       // dispatch(getMarketList(requestParams));
//   //     }
//   //   } else {
//   //     dispatch({
//   //       type: MARKET_TOP_SORT,
//   //       payload: {
//   //         sortBy,
//   //         orderBy
//   //       }
//   //     });
//   //   }
//   }
// }


