import {
  HOME_PAGE_LOADED, SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, TABLE_HEADER_CLICK,
} from '../actions/actionTypes';

export const initialState = {
  expandedRecords: [],
  activeTab: null,
  sortBy: 'price',
  orderBy: 'desc',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      }
    case SET_EXPANDED_RECORDS: {
      const { record: { id }, isExpanded } = action.recordData;
      const tempExpandeds = isExpanded ?
        state.expandedRecords.filter(r => r !== id) : [...state.expandedRecords, id];
      return Object.assign({}, state, { expandedRecords: tempExpandeds });
    }
    case SET_ACTIVE_TAB: {
      return Object.assign({}, state, {
        activeTab: action.activeTab,
        expandedRecords: [],
        sortBy: '',
        orderBy: 'desc',
      });
    }
    case TABLE_HEADER_CLICK: {
      if (state.sortBy !== action.headerName) {
        return Object.assign({}, state, {
          sortBy: action.headerName,
          orderBy: 'desc',
        });
      } else {
        return Object.assign({}, state, {
          orderBy: state.orderBy === 'desc' ? 'asc' : 'desc',
        });
      }
    }
    default:
      return state;
  }
}