import {
  PROPOSAL_RESET,
  PROPOSAL_CHANGE_STATE,
  PROPOSAL_GET_LIST_REQUESTED, PROPOSAL_GET_LIST_SUCCEEDED, PROPOSAL_GET_LIST_FAILED,
  PROPOSAL_GET_DETAIL_REQUESTED, PROPOSAL_GET_DETAIL_SUCCEEDED, PROPOSAL_GET_DETAIL_FAILED,

  // PROPOSAL_SAVE_REQUESTED, PROPOSAL_SAVE_SUCCEEDED, PROPOSAL_SAVE_FAILED, 
  // PROPOSAL_PUBLISH_REQUESTED, PROPOSAL_PUBLISH_SUCCEEDED, PROPOSAL_PUBLISH_FAILED, 
  // PROPOSAL_SUBMIT_REQUESTED, PROPOSAL_SUBMIT_SUCCEEDED, PROPOSAL_SUBMIT_FAILED, 
  // PROPOSAL_VOTE_ADMIN_REQUESTED, PROPOSAL_VOTE_ADMIN_SUCCEEDED, PROPOSAL_VOTE_ADMIN_FAILED, 
  // PROPOSAL_VOTE_MEMBER_REQUESTED, PROPOSAL_VOTE_MEMBER_SUCCEEDED, PROPOSAL_VOTE_MEMBER_FAILED
} from '../actions/actionTypes'
import { action } from './actionHelper'
import { asyncFunction, apiGetProposalList, apiGetProposalDetails } from '../integrator'

export function reset() { return action(PROPOSAL_RESET) }

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

export function getProposalDetails(marketId, proposalId) {
  return asyncFunction(
    apiGetProposalDetails({marketId, proposalId}),
    PROPOSAL_GET_DETAIL_REQUESTED, PROPOSAL_GET_DETAIL_SUCCEEDED, PROPOSAL_GET_DETAIL_FAILED
  )
}