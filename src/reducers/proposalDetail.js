import {
  PROPOSAL_GET_DETAIL_REQUESTED, PROPOSAL_GET_DETAIL_SUCCEEDED, PROPOSAL_GET_DETAIL_FAILED, 
  PROPOSAL_SAVE_REQUESTED, PROPOSAL_SAVE_SUCCEEDED, PROPOSAL_SAVE_FAILED, 
  PROPOSAL_PUBLISH_REQUESTED, PROPOSAL_PUBLISH_SUCCEEDED, PROPOSAL_PUBLISH_FAILED,
  PROPOSAL_SUBMIT_REQUESTED, PROPOSAL_SUBMIT_SUCCEEDED, PROPOSAL_SUBMIT_FAILED, 
  PROPOSAL_VOTE_ADMIN_REQUESTED, PROPOSAL_VOTE_ADMIN_SUCCEEDED, PROPOSAL_VOTE_ADMIN_FAILED, 
  PROPOSAL_VOTE_MEMBER_REQUESTED, PROPOSAL_VOTE_MEMBER_SUCCEEDED, PROPOSAL_VOTE_MEMBER_FAILED, 
} from '../actions/actionTypes'

export const initialState = {
  getting: false,
  getError: null,
  updating: false,
  updateError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROPOSAL_GET_DETAIL_REQUESTED: 
      return {
        ...state,
        getting: true,
        getError: state.initialState.getError
      }
    case PROPOSAL_GET_DETAIL_SUCCEEDED: 
      return {
        ...state,
        getting: false,
        ...action.payload
      }
    case PROPOSAL_GET_DETAIL_FAILED: 
      return {
        ...state,
        getting: false,
        getError: action.payload
      }
    case PROPOSAL_SAVE_REQUESTED: 
    case PROPOSAL_PUBLISH_REQUESTED: 
    case PROPOSAL_SUBMIT_REQUESTED: 
    case PROPOSAL_VOTE_ADMIN_REQUESTED: 
    case PROPOSAL_VOTE_MEMBER_REQUESTED: 
      return {
        ...state,
        updating: true,
        updateError: state.initialState.updateError
      }
    case PROPOSAL_PUBLISH_SUCCEEDED: 
    case PROPOSAL_SAVE_SUCCEEDED: 
    case PROPOSAL_SUBMIT_SUCCEEDED:
    case PROPOSAL_VOTE_ADMIN_SUCCEEDED: 
    case PROPOSAL_VOTE_MEMBER_SUCCEEDED: 
      return {
        ...state,
        updating: false,
        ...action.payload
      }
    case PROPOSAL_PUBLISH_FAILED: 
    case PROPOSAL_SAVE_FAILED: 
    case PROPOSAL_SUBMIT_FAILED: 
    case PROPOSAL_VOTE_ADMIN_FAILED: 
    case PROPOSAL_VOTE_MEMBER_FAILED: 
      return {
        ...state,
        updating: false,
        updateError: action.payload
      }
    default:
      return state
  }
}
