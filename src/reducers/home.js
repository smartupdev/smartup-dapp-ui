import {
  MARKET_ADD_SAVED_MARKET, MARKET_DEL_SAVED_MARKET,
  HOME_RESET,
  HOME_SET_MARKET_STAGE, HOME_SET_MARKET_FILTER,
  // SET_ACTIVE_TAB, 
  HOME_SET_EXPANDED_RECORDS, 
  HOME_SEARCH_CONTENT_CHANGE,
  HOME_SET_SORTING, 
  HOME_GET_MARKET_LIST_REQUESTED, HOME_GET_MARKET_LIST_SUCCEEDED, HOME_GET_MARKET_LIST_FAILED
} from '../actions/actionTypes';

import { marketMassage, updateLoadMore } from '../integrator/massager'
import { changeArrayById } from '../lib/util/reducerHelper'
import { MARKET_FILTER_TYPE, MARKET_STAGE } from '../integrator'
import { ORDER_BY } from '../components/Table'

export const initialState = {
  expandedRecords: [], // ids
  filterType: MARKET_FILTER_TYPE.all,
  marketStage: MARKET_STAGE.offering,

  sortBy: 'last',
  orderBy: ORDER_BY.desc,
  searchContent: '',

  markets: [],
  getting: false,
  getError: null,
  count: 0,
  pageSize: 20, // fixed
  pageNumb: 1,
  hasNextPage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_RESET: 
      return initialState
    case MARKET_ADD_SAVED_MARKET: 
      return {
        ...state,
        markets: changeArrayById(state.markets, action.payload.id, () => ({ following: true }))
      }
    case MARKET_DEL_SAVED_MARKET: 
      return {
        ...state,
        markets: changeArrayById(state.markets, action.payload.id, () => ({ following: false }))
      }

    case HOME_SET_EXPANDED_RECORDS: {
      return {
        ...state,
        expandedRecords: action.payload.isExpanded ?
          state.expandedRecords.filter(r => r !== action.payload.id) 
        : [...state.expandedRecords, action.payload.id]
      }
    }
    case HOME_SET_SORTING: {
      const orderBy =  state.sortBy === action.payload && state.orderBy === initialState.orderBy  ? 'asc' : initialState.orderBy
      return {
        ...state,
        sortBy: action.payload,
        orderBy,
        pageNumb: initialState.pageNumb
      }
    }
    case HOME_SEARCH_CONTENT_CHANGE:
      return {
        ...state,
        searchContent: action.payload,
      }
    case HOME_SET_MARKET_STAGE:
      if(state.marketStage === action.payload.value) return state
      return {
        ...initialState,
        marketStage: action.payload.value
      }
    case HOME_SET_MARKET_FILTER: 
      if(state.filterType === action.payload.value) return state
      return {
        ...initialState,
        marketStage: state.marketStage,
        filterType: action.payload.value,
        sortBy: !action.payload.index && initialState.sortBy,
        orderBy: !action.payload.index && initialState.orderBy,
      }
  
    case HOME_GET_MARKET_LIST_REQUESTED:
      return {
        ...state,
        getting: true,
      }
    case HOME_GET_MARKET_LIST_SUCCEEDED: {
      const {list, pageNumb, hasNextPage, rowCount: count} = action.payload;
      return {
        ...state,
        getting: false,
        getError: initialState.getError,
        markets: updateLoadMore(state.markets, list.map(marketMassage), action.meta.isLoadMore),
        count, hasNextPage, pageNumb,
      }
    }
    case HOME_GET_MARKET_LIST_FAILED:
      return {
        ...state,
        getting: false,
        getError: action.payload,
      }

    default:
      return state
  }
}