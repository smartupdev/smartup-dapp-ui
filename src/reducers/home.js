import {
  HOME_RESET,
  // HOME_PAGE_LOADED, 
  SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, HOME_SET_SORTING, SEARCH_CONTENT_CHANGE,

  USER_COLLECT_ADD_SUCCEEDED, USER_COLLECT_DEL_SUCCEEDED,

  GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
  // MARKET_SEARCH_REQUESTED, MARKET_SEARCH_SUCCEEDED, MARKET_SEARCH_FAILED,
  // MARKET_TOP_REQUESTED, MARKET_TOP_SUCCEEDED, MARKET_TOP_FAILED,MARKET_TOP_SORT,
} from '../actions/actionTypes';

import { marketMassage, updateLoadMore } from '../integrator/massager'
import { changeArrayById } from '../lib/util/reducerHelper'

export const initialState = {
  expandedRecords: [], // ids
  activeTabIndex: 0,
  sortBy: 'last',
  orderBy: 'desc',
  searchContent: '',

  markets: [],
  gettingMarketList: false,
  marketListError: null,
  totalResults: 0,
  pageSize: 20, // fixed
  pageNumb: 1,
  hasNextPage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_RESET: 
      return initialState
    // case HOME_PAGE_LOADED:
    //   return {
    //     ...state,
    //     tags: action.payload[0].tags
    //   }
    case USER_COLLECT_ADD_SUCCEEDED: 
      return {
        ...state,
        markets: changeArrayById(state.markets, action.payload.id, () => ({ following: true }))
      }
    case USER_COLLECT_DEL_SUCCEEDED: 
      return {
        ...state,
        markets: changeArrayById(state.markets, action.payload.id, () => ({ following: false }))
      }

    case SET_EXPANDED_RECORDS: {
      const { record: { id }, isExpanded } = action.payload;
      return {
        ...state,
        expandedRecords: isExpanded ?
          state.expandedRecords.filter(r => r !== id) 
        : [...state.expandedRecords, id]
      }
    }
    case HOME_SET_SORTING: {
      const orderBy =  state.sortBy === action.payload.sortBy && state.orderBy === initialState.orderBy  ? 'asc' : initialState.orderBy
      return {
        ...state,
        sortBy: action.payload.sortBy,
        orderBy,
        pageNumb: initialState.pageNumb
      }
    }
    case SEARCH_CONTENT_CHANGE:
      return {
        ...state,
        searchContent: action.payload,
      }
    case SET_ACTIVE_TAB: {
      if(state.activeTabIndex === action.payload) return state
      return {
        ...state,
        activeTabIndex: action.payload,
        ...action.payload ? 
          {
            sortBy: '',
            orderBy: ''
          }
        :
          {
            sortBy: initialState.sortBy,
            orderBy: initialState.orderBy
          },
        expandedRecords: [],
        searchContent: initialState.searchContent
      }
    } 
  
    case GET_MARKET_LIST_REQUESTED:
      return {
        ...state,
        gettingMarketList: true,
      };
    case GET_MARKET_LIST_SUCCEEDED: {
      const {list, pageNumb, hasNextPage, rowCount} = action.payload;
      return {
        ...state,
        gettingMarketList: false,
        marketListError: initialState.marketListError,
        markets: updateLoadMore(state.markets, list.map(marketMassage), action.meta && action.meta.isLoadMore),
        totalResults: rowCount || list.length,
        hasNextPage: hasNextPage || false,
        pageNumb: pageNumb || 1,
      };
    }
    case GET_MARKET_LIST_FAILED:
      return {
        ...state,
        gettingMarketList: false,
        marketListError: action.payload,
      };

    default:
      return state;
  }
}