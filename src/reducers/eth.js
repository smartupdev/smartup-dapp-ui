import {
  ETH_SUT_BALANCE, ETH_CREATE_MARKET, ETH_GET_MARKET_BY_INDEX,
  ETH_SET_MARKET_ADDRESS, ETH_GET_CT_BALANCE, ETH_IS_TRADE_ENABLE,
  ETH_GET_MARKET_CREATOR, ETH_GET_Total_SUT, ETH_BID_QUOTE,
  ETH_ASK_QUOTE, DISPUTE_MARKET_STATE, DISPUTE_NEXT_FLAGGABLE_DATE,
  DISPUTE_CREATE, DISPUTE_FLAGGING_PERIOD, DISPUTE_JUROR_VOTE,
  DISPUTE_JUROR_VOTE_DONE, DISPUTE_DONE, DISPUTE_JUROR_LIST, DISPUTE_JUROR_VOTES,
  DISPUTE_APPEAL_ROUND, DISPUTE_APPEALING_PERIOD, DISPUTE_DO_APPEAL,
  DISPUTE_MARKET_DISSOLVE, PROPOSED_DO_PROPOSED, PROPOSED_CURRENT_AMOUNT,
  PROPOSED_AMOUNT, PROPOSED_VOTING_PERIOND, PROPOSED_DO_VOTE,
  PROPOSED_JURORS, PROPOSED_VOTES, PROPOSED_VOTE_DONE
} from '../actions/actionTypes';

export const initialState = {
  sutBalance: null,
  createMarketHash: null,
  indexMarketHash: null,
  setMarketAddress: null,
  ctBalance: null,
  isTradeEnabled: false,
  totalSut: null,
  bidQuote: null,
  askQuote: null,
  marketState: null,
  nextFlaggableDate: null,
  flaggingPeriod: null,
  jurorVoteHash: null,
  jurorVoteDoneHash: null,
  disputeDone: null,
  jurorList: null,
  jurorVotes: null,
  appealRound: null,
  appealingPeriod: null,
  doAppealHash: null,
  marketDissolveHash: null,
  doProposedHash: null,
  currentProposedAmount: null,
  proposedAmount: null,
  proposedVotingPeriod: null,
  doProposedVoteHash: null,
  proposedJurors: null,
  proposedVotes: null,
  proposedVoteDoneHash: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ETH_SUT_BALANCE:
      return Object.assign({}, state, { sutBalance: action.sutBalance });
    case ETH_CREATE_MARKET:
      return Object.assign({}, state, { createMarketHash: action.createMarketHash });
    case ETH_GET_MARKET_BY_INDEX:
      return Object.assign({}, state, { indexMarketHash: action.indexMarketHash });
    case ETH_SET_MARKET_ADDRESS:
      return Object.assign({}, state, { setMarketAddress: action.setMarketAddress });
    case ETH_GET_CT_BALANCE:
      return Object.assign({}, state, { ctBalance: action.ctBalance });
    case ETH_IS_TRADE_ENABLE:
      return Object.assign({}, state, { isTradeEnabled: action.isTradeEnabled });
    case ETH_GET_MARKET_CREATOR:
      return Object.assign({}, state, { createMarketHash: action.createMarketHash });
    case ETH_GET_Total_SUT:
      return Object.assign({}, state, { totalSut: action.totalSut });
    case ETH_BID_QUOTE:
      return Object.assign({}, state, { bidQuote: action.bidQuote });
    case ETH_ASK_QUOTE:
      return Object.assign({}, state, { ETH_ASK_QUOTE: action.ETH_ASK_QUOTE });
    case DISPUTE_MARKET_STATE:
      return Object.assign({}, state, { marketState: action.marketState });
    case DISPUTE_NEXT_FLAGGABLE_DATE:
      return Object.assign({}, state, { nextFlaggableDate: action.nextFlaggableDate });
    case DISPUTE_CREATE:
      return Object.assign({}, state, { createDisputeHash: action.createDisputeHash });
    case DISPUTE_FLAGGING_PERIOD:
      return Object.assign({}, state, { flaggingPeriod: action.flaggingPeriod });
    case DISPUTE_JUROR_VOTE:
      return Object.assign({}, state, { jurorVoteHash: action.jurorVoteHash });
    case DISPUTE_JUROR_VOTE_DONE:
      return Object.assign({}, state, { jurorVoteDoneHash: action.jurorVoteDoneHash });
    case DISPUTE_DONE:
      return Object.assign({}, state, { disputeDone: action.disputeDone });
    case DISPUTE_JUROR_LIST:
      return Object.assign({}, state, { jurorList: action.jurorList });
    case DISPUTE_JUROR_VOTES:
      return Object.assign({}, state, { jurorVotes: action.jurorVotes });
    case DISPUTE_APPEAL_ROUND:
      return Object.assign({}, state, { appealRound: action.appealRound });
    case DISPUTE_APPEALING_PERIOD:
      return Object.assign({}, state, { appealingPeriod: action.appealingPeriod });
    case DISPUTE_DO_APPEAL:
      return Object.assign({}, state, { doAppealHash: action.doAppealHash });
    case DISPUTE_MARKET_DISSOLVE:
      return Object.assign({}, state, { marketDissolveHash: action.marketDissolveHash });
    case PROPOSED_DO_PROPOSED:
      return Object.assign({}, state, { doProposedHash: action.doProposedHash });
    case PROPOSED_CURRENT_AMOUNT:
      return Object.assign({}, state, { currentProposedAmount: action.currentProposedAmount });
    case PROPOSED_AMOUNT:
      return Object.assign({}, state, { proposedAmount: action.proposedAmount });
    case PROPOSED_VOTING_PERIOND:
      return Object.assign({}, state, { proposedVotingPeriod: action.proposedVotingPeriod });
    case PROPOSED_DO_VOTE:
      return Object.assign({}, state, { doProposedVoteHash: action.doProposedVoteHash });
    case PROPOSED_JURORS:
      return Object.assign({}, state, { proposedJurors: action.proposedJurors });
    case PROPOSED_VOTES:
      return Object.assign({}, state, { proposedVotes: action.proposedVotes });
    case PROPOSED_VOTE_DONE:
      return Object.assign({}, state, { proposedVoteDoneHash: action.proposedVoteDoneHash });
    default:
      return state;
  }
};