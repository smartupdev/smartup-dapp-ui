import {
  HOME_PAGE_LOADED, SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, TABLE_HEADER_CLICK, SEARCH_CONTENT_CHANGE
} from '../actions/actionTypes';

export const initialState = {
  expandedRecords: [],
  activeTabIndex: 0,
  sortBy: 'last',
  orderBy: 'desc',
  searchContent: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      }
    case SET_EXPANDED_RECORDS: {
      const { record: { id }, isExpanded } = action.payload;
      const tempExpandeds = isExpanded ?
        state.expandedRecords.filter(r => r !== id) : [...state.expandedRecords, id];
      return {
        ...state,
        expandedRecords: tempExpandeds
      }
    }
    case TABLE_HEADER_CLICK:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        orderBy: action.payload.orderBy,
      }
    case SEARCH_CONTENT_CHANGE:
      return {
        ...state,
        searchContent: action.payload,
      }
    case SET_ACTIVE_TAB: {
      return Object.assign({}, state, {
        activeTabIndex: action.payload,
        expandedRecords: [],
      });
    }
    default:
      return state;
  }
}