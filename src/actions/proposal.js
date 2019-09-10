import {
  PROPOSAL_CHANGE_STATE,
  PROPOSAL_GET_LIST_REQUESTED, PROPOSAL_GET_LIST_SUCCEEDED, PROPOSAL_GET_LIST_FAILED
} from '../actions/actionTypes'
import { action } from './actionHelper'
import { asyncFunction, apiGetProposalList } from '../integrator'

export function getProposalList(isLoadMore) {
  return (dispatch, getState) => {
    const { market: { id: marketId }, proposal: { filterState, sortBy, pageSize, pageNumb } } = getState()
    dispatch(
      asyncFunction( 
        apiGetProposalList({marketId, state: filterState, sortBy, pageNumb, pageSize, isLoadMore}),
        PROPOSAL_GET_LIST_REQUESTED, PROPOSAL_GET_LIST_SUCCEEDED, PROPOSAL_GET_LIST_FAILED,
        { meta: {isLoadMore} }
      )
    )
  }
}

export function onChangeState(state) { return action(PROPOSAL_CHANGE_STATE, state) }