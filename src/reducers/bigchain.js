import {
  BIGCHAIN_GET, BIGCHAIN_SEARCH, BIGCHAIN_OWNER_SEARCH,
} from '../actions/actionTypes';
export const initialState = {
  getResult: null,
  searchResult: null,
  searchOwnerResult: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BIGCHAIN_GET:
      return Object.assign({}, state, { getResult: action.getResult });
    case BIGCHAIN_SEARCH:
      return Object.assign({}, state, { searchResult: action.searchResult });
    case BIGCHAIN_OWNER_SEARCH:
      return Object.assign({}, state, { searchOwnerResult: action.searchOwnerResult });
    default:
      return state;
  }
};