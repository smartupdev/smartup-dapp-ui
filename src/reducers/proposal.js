import {
  PROPOSAL_CHANGE_STATE,
  PROPOSAL_GET_LIST_REQUESTED, PROPOSAL_GET_LIST_SUCCEEDED, PROPOSAL_GET_LIST_FAILED
} from '../actions/actionTypes'
import { updateLoadMore } from '../integrator/massager'
import { PROPOSAL_STATE, PROPOSAL_SORT } from 'integrator'

export const initialState = {
  filterState: PROPOSAL_STATE.all,
  sortBy: PROPOSAL_SORT.createdTime,
  proposals: [],
  getting: false,
  error: null,
  pageSize: 10,
  pageNumb: 1,
  hasNextPage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROPOSAL_CHANGE_STATE: 
      return {
        ...state,
        filterState: action.payload
      }
    case PROPOSAL_GET_LIST_REQUESTED: 
      return {
        ...state,
        getting: true,
        error: initialState.error
      }
    case PROPOSAL_GET_LIST_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload
      return {
        ...state,
        proposals: updateLoadMore(state.proposals, list, action.meta.isLoadMore),
        getting: false,
        pageNumb,
        hasNextPage,
      }
    }
    case PROPOSAL_GET_LIST_FAILED: 
      return {
        ...state,
        getting: false,
        error: action.payload
      }
    default:
      return state
  }
}
