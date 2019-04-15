//home
export const HOME_PAGE_LOADED = 'HOME_PAGE_LOADED';
export const SET_EXPANDED_RECORDS = 'SET_EXPANDED_RECORDS';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const TABLE_HEADER_CLICK = 'TABLE_HEADER_CLICK';
export const SEARCH_MARKETS = 'SEARCH_MARKETS';
//metamask
export const METAMASK_RESET = 'METAMASK_RESET';

export const LOGIN_METAMASK_REQUESTED = 'LOGIN_METAMASK_REQUESTED';
export const LOGIN_METAMASK_SUCCEEDED = 'LOGIN_METAMASK_SUCCEEDED';
export const LOGIN_METAMASK_FAILED = 'LOGIN_METAMASK_FAILED';

export const METAMASK_ETH_BALANCE_REQUESTED = 'METAMASK_ETH_BALANCE_REQUESTED';
export const METAMASK_ETH_BALANCE_SUCCEEDED = 'METAMASK_ETH_BALANCE_SUCCEEDED';
export const METAMASK_ETH_BALANCE_FAILED = 'METAMASK_ETH_BALANCE_FAILED';
export const METAMASK_SUT_BALANCE_REQUESTED = 'METAMASK_SUT_BALANCE_REQUESTED';
export const METAMASK_SUT_BALANCE_SUCCEEDED = 'METAMASK_SUT_BALANCE_SUCCEEDED';
export const METAMASK_SUT_BALANCE_FAILED = 'METAMASK_SUT_BALANCE_FAILED';
export const METAMASK_NTT_BALANCE_REQUESTED = 'METAMASK_NTT_BALANCE_REQUESTED';
export const METAMASK_NTT_BALANCE_SUCCEEDED = 'METAMASK_NTT_BALANCE_SUCCEEDED';
export const METAMASK_NTT_BALANCE_FAILED = 'METAMASK_NTT_BALANCE_FAILED';

//user
export const USER_LOGIN_SMARTUP_REQUESTED = 'USER_LOGIN_SMARTUP_REQUESTED';
export const USER_LOGIN_SMARTUP_SUCCEEDED = 'USER_LOGIN_SMARTUP_SUCCEEDED';
export const USER_LOGIN_SMARTUP_FAILED = 'USER_LOGIN_SMARTUP_FAILED';

export const USER_AUTH_SMARTUP_REQUESTED = 'USER_AUTH_SMARTUP_REQUESTED';
export const USER_AUTH_SMARTUP_SUCCEEDED = 'USER_AUTH_SMARTUP_SUCCEEDED';
export const USER_AUTH_SMARTUP_FAILED = 'USER_AUTH_SMARTUP_FAILED';

export const USER_PERSON_SIGN_REQUESTED = 'USER_PERSON_SIGN_REQUESTED';
export const USER_PERSON_SIGN_SUCCEEDED = 'USER_PERSON_SIGN_SUCCEEDED';
export const USER_PERSON_SIGN_FAILED = 'USER_PERSON_SIGN_FAILED';

export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
export const UPDATE_USER_AVATAR = 'UPDATE_USER_AVATAR';
export const QUERY_USER_INFO = 'QUERY_USER_INFO';
//trade
export const TRADE_BID_QUOTE_REQUESTED = 'TRADE_BID_QUOTE_REQUESTED';
export const TRADE_BID_QUOTE_SUCCEEDED = 'TRADE_BID_QUOTE_SUCCEEDED';
export const TRADE_BID_QUOTE_FAILED = 'TRADE_BID_QUOTE_FAILED';
export const TRADE_BID_CT_REQUESTED = 'TRADE_BID_CT_REQUESTED';
export const TRADE_BID_CT_SUCCEEDED = 'TRADE_BID_CT_SUCCEEDED';
export const TRADE_BID_CT_FAILED = 'TRADE_BID_CT_FAILED';

export const TRADE_ASK_QUOTE_REQUESTED = 'TRADE_ASK_QUOTE_REQUESTED';
export const TRADE_ASK_QUOTE_SUCCEEDED = 'TRADE_ASK_QUOTE_SUCCEEDED';
export const TRADE_ASK_QUOTE_FAILED = 'TRADE_ASK_QUOTE_FAILED';
export const TRADE_ASK_CT_REQUESTED = 'TRADE_ASK_CT_REQUESTED';
export const TRADE_ASK_CT_SUCCEEDED = 'TRADE_ASK_CT_SUCCEEDED';
export const TRADE_ASK_CT_FAILED = 'TRADE_ASK_CT_FAILED';

export const TRADE_LIST_REQUESTED = 'TRADE_LIST_REQUESTED';
export const TRADE_LIST_SUCCEEDED = 'TRADE_LIST_SUCCEEDED';
export const TRADE_LIST_FAILED = 'TRADE_LIST_FAILED';

export const TRADE_DETAIL_REQUESTED = 'TRADE_DETAIL_REQUESTED';
export const TRADE_DETAIL_SUCCEEDED = 'TRADE_DETAIL_SUCCEEDED';
export const TRADE_DETAIL_FAILED = 'TRADE_DETAIL_FAILED';

export const ASYNC_START = 'ASYNC_START';
export const ASYNC_END = 'ASYNC_END';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
//market
export const MARKET_RESET = 'MARKET_RESET';
export const MARKET_NAME_CHANGE = 'MARKET_NAME_CHANGE';
export const MARKET_DESC_CHANGE = 'MARKET_DESC_CHANGE';
export const CREATE_MARKET_REQUESTED = 'CREATE_MARKET_REQUESTED';
export const CREATE_MARKET_SUCCEEDED = 'CREATE_MARKET_SUCCEEDED';
export const CREATE_MARKET_FAILED = 'CREATE_MARKET_FAILED';
export const CREATE_MARKET_SMARTUP_REQUESTED = 'CREATE_MARKET_SMARTUP_REQUESTED';
export const CREATE_MARKET_SMARTUP_SUCCEEDED = 'CREATE_MARKET_SMARTUP_SUCCEEDED';
export const CREATE_MARKET_SMARTUP_FAILED = 'CREATE_MARKET_SMARTUP_FAILED';

export const GET_MARKET_CREATED_LIST = 'GET_MARKET_CREATED_LIST';
export const GET_MARKET_DETAIL = 'GET_MARKET_DETAIL';
export const GET_MARKET_LIST = 'GET_MARKET_LIST';
export const CREATE_MARKET = 'CREATE_MARKET';
export const BOOKMARK_MARKET = 'BOOKMARK_MARKET';
//create market ui
export const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX';
//market detail ui
export const SET_IS_SELL = 'SET_IS_SELL';
//panel
export const PANEL_SET_ACTIVE_TAB = 'PANEL_SET_ACTIVE_TAB';
export const PANEL_TOGGLE_EXPANDED_WALLET = 'PANEL_TOGGLE_EXPANDED_WALLET';
export const PANEL_TOGGLE_EXPANDED_MARKET = 'PANEL_TOGGLE_EXPANDED_MARKET';
export const PANEL_TOGGLE_EXPANDED_BOOKMARK = 'PANEL_TOGGLE_EXPANDED_BOOKMARK';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AVATAR = 'SET_USER_AVATAR';
export const METAMASK_LOGIN = 'METAMASK_LOGIN';
export const METAMASK_ETH_TRANSACTION = 'METAMASK_ETH_TRANSACTION';

//eth
export const ETH_SUT_BALANCE = 'ETH_SUT_BALANCE';
export const ETH_CREATE_MARKET = 'ETH_CREATE_MARKET';
export const ETH_GET_MARKET_BY_INDEX = 'ETH_GET_MARKET_BY_INDEX';
export const ETH_SET_MARKET_ADDRESS = 'ETH_SET_MARKET_ADDRESS';
export const ETH_GET_CT_BALANCE = 'ETH_GET_CT_BALANCE';
export const ETH_IS_TRADE_ENABLE = 'ETH_IS_TRADE_ENABLE';
export const ETH_GET_MARKET_CREATOR = 'ETH_GET_MARKET_CREATOR';
export const ETH_GET_Total_SUT = 'ETH_GET_Total_SUT';
export const ETH_BID_QUOTE = 'ETH_BID_QUOTE';
export const ETH_ASK_QUOTE = 'ETH_ASK_QUOTE';
//dispute
export const DISPUTE_MARKET_STATE = 'DISPUTE_MARKET_STATE';
export const DISPUTE_NEXT_FLAGGABLE_DATE = 'DISPUTE_NEXT_FLAGGABLE_DATE';
export const DISPUTE_CREATE = 'DISPUTE_CREATE';
export const DISPUTE_FLAGGING_PERIOD = 'DISPUTE_FLAGGING_PERIOD';
export const DISPUTE_JUROR_VOTE = 'DISPUTE_JUROR_VOTE';
export const DISPUTE_JUROR_VOTE_DONE = 'DISPUTE_JUROR_VOTE_DONE';
export const DISPUTE_DONE = 'DISPUTE_DONE';
export const DISPUTE_JUROR_LIST = 'DISPUTE_JUROR_LIST';
export const DISPUTE_JUROR_VOTES = 'DISPUTE_JUROR_VOTES';
export const DISPUTE_APPEAL_ROUND = 'DISPUTE_APPEAL_ROUND';
export const DISPUTE_APPEALING_PERIOD = 'DISPUTE_APPEALING_PERIOD';
export const DISPUTE_DO_APPEAL = 'DISPUTE_DO_APPEAL';
export const DISPUTE_MARKET_DISSOLVE = 'DISPUTE_MARKET_DISSOLVE';
//proposed
export const PROPOSED_DO_PROPOSED = 'PROPOSED_DO_PROPOSED';
export const PROPOSED_CURRENT_AMOUNT = 'PROPOSED_CURRENT_AMOUNT';
export const PROPOSED_AMOUNT = 'PROPOSED_AMOUNT';
export const PROPOSED_VOTING_PERIOND = 'PROPOSED_VOTING_PERIOND';
export const PROPOSED_DO_VOTE = 'PROPOSED_DO_VOTE';
export const PROPOSED_JURORS = 'PROPOSED_JURORS';
export const PROPOSED_VOTES = 'PROPOSED_VOTES';
export const PROPOSED_VOTE_DONE = 'PROPOSED_VOTE_DONE';
//ipfs
export const IPFS_POST_STRING = 'IPFS_POST_STRING';
export const IPFS_GET_FILE = 'IPFS_GET_FILE';
export const IPFS_POST_FILE = 'IPFS_POST_FILE';
//bigchain
export const BIGCHAIN_GET = 'BIGCHAIN_GET';
export const BIGCHAIN_PUT = 'BIGCHAIN_PUT';
export const BIGCHAIN_SEARCH = 'BIGCHAIN_SEARCH';
export const BIGCHAIN_OWNER_SEARCH = 'BIGCHAIN_OWNER_SEARCH';





