import {
  HOME_PAGE_LOADED, SET_EXPANDED_RECORDS, SET_ACTIVE_TAB, TABLE_HEADER_CLICK,
} from '../actions/actionTypes';

export const initialState = {
  expandedRecords: [],
  activeTab: null,
  sortBy: 'last',
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
    case SET_ACTIVE_TAB: {
      return Object.assign({}, state, {
        activeTab: action.activeTab,
        expandedRecords: [],
        sortBy: '',
        orderBy: 'desc',
      });
    }
    default:
      return state;
  }
}