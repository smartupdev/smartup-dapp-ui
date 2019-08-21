export const METAMASK_UPDATE = 'METAMASK_UPDATE'

// MARKET GLOBAL INFO
export const GLOBAL_GET_MARKET_REQUESTED = 'GLOBAL_GET_MARKET_REQUESTED'
export const GLOBAL_GET_MARKET_SUCCEEDED = 'GLOBAL_GET_MARKET_SUCCEEDED'
export const GLOBAL_GET_MARKET_FAILED = 'GLOBAL_GET_MARKET_FAILED'

export const MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED = 'MARKET_GET_TRADED_MARKET_WITH_CT_REQUESTED'
export const MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED = 'MARKET_GET_TRADED_MARKET_WITH_CT_SUCCEEDED'
export const MARKET_GET_TRADED_MARKET_WITH_CT_FAILED = 'MARKET_GET_TRADED_MARKET_WITH_CT_FAILED'

// Market
export const MARKET_ADD_SAVED_MARKET = 'MARKET_ADD_SAVED_MARKET'
export const MARKET_DEL_SAVED_MARKET = 'MARKET_DEL_SAVED_MARKET'

//General
export const TOGGLE_EXPANDED_INFO = 'TOGGLE_EXPANDED_INFO' // TODO: Remove
export const TOGGLE_EXPANDED_RULE = 'TOGGLE_EXPANDED_RULE' // TODO: Remove
export const TOGGLE_EXPANDED_SUB = 'TOGGLE_EXPANDED_SUB' // TODO: Remove

//notification
export const USER_NOTIFICATION_TOGGLE_UNREAD = 'USER_NOTIFICATION_TOGGLE_UNREAD'
export const USER_NOTIFICATION_KEYWORD_CHANGE = 'USER_NOTIFICATION_KEYWORD_CHANGE'
export const USER_NOTIFICATION_LIST_REQUESTED = 'USER_NOTIFICATION_LIST_REQUESTED'
export const USER_NOTIFICATION_LIST_SUCCEEDED = 'USER_NOTIFICATION_LIST_SUCCEEDED'
export const USER_NOTIFICATION_LIST_FAILED = 'USER_NOTIFICATION_LIST_FAILED'
export const USER_NOTIFICATION_READ_REQUESTED = 'USER_NOTIFICATION_READ_REQUESTED'
export const USER_NOTIFICATION_READ_SUCCEEDED = 'USER_NOTIFICATION_READ_SUCCEEDED'
export const USER_NOTIFICATION_READ_FAILED = 'USER_NOTIFICATION_READ_FAILED'
export const USER_NOTIFICATION_UNREAD_REQUESTED = 'USER_NOTIFICATION_UNREAD_REQUESTED'
export const USER_NOTIFICATION_UNREAD_SUCCEEDED = 'USER_NOTIFICATION_UNREAD_SUCCEEDED'
export const USER_NOTIFICATION_UNREAD_FAILED = 'USER_NOTIFICATION_UNREAD_FAILED'
//post
export const POST_ONCHANGE_KEYWORD = 'POST_ONCHANGE_KEYWORD'
export const POST_TOGGLE_POST_FOLLOW = 'POST_TOGGLE_POST_FOLLOW'
export const POST_TOGGLE_REPLY_FOLLOW = 'POST_TOGGLE_REPLY_FOLLOW'
export const POST_TOGGLE_POST_LIKE = 'POST_TOGGLE_POST_LIKE'
export const POST_TOGGLE_POST_DISLIKE = 'POST_TOGGLE_POST_DISLIKE'
export const POST_TOGGLE_REPLY_LIKE = 'POST_TOGGLE_REPLY_LIKE'
export const POST_TOGGLE_REPLY_DISLIKE = 'POST_TOGGLE_REPLY_DISLIKE'
export const POST_NEW_COMMENT_ONCHANGE = 'POST_NEW_COMMENT_ONCHANGE'
export const POST_LIST_REQUESTED = 'POST_LIST_REQUESTED'
export const POST_LIST_SUCCEEDED = 'POST_LIST_SUCCEEDED'
export const POST_LIST_FAILED = 'POST_LIST_FAILED'
export const POST_ONE_REQUESTED = 'POST_ONE_REQUESTED'
export const POST_ONE_SUCCEEDED = 'POST_ONE_SUCCEEDED'
export const POST_ADD_SUCCEEDED = 'POST_ADD_SUCCEEDED'
export const POST_ONE_FAILED = 'POST_ONE_FAILED'
export const POST_REPLY_CHILDREN_LIST_REQUESTED = 'POST_REPLY_CHILDREN_LIST_REQUESTED'
export const POST_REPLY_CHILDREN_LIST_SUCCEEDED = 'POST_REPLY_CHILDREN_LIST_SUCCEEDED'
export const POST_REPLY_CHILDREN_LIST_FAILED = 'POST_REPLY_CHILDREN_LIST_FAILED'
export const POST_REPLY_LIST_REQUESTED = 'POST_REPLY_LIST_REQUESTED'
export const POST_REPLY_LIST_SUCCEEDED = 'POST_REPLY_LIST_SUCCEEDED'
export const POST_REPLY_LIST_FAILED = 'POST_REPLY_LIST_FAILED'
export const POST_REPLY_ONE_REQUESTED = 'POST_REPLY_ONE_REQUESTED'
export const POST_REPLY_ONE_SUCCEEDED = 'POST_REPLY_ONE_SUCCEEDED'
export const POST_REPLY_ONE_FAILED = 'POST_REPLY_ONE_FAILED'
export const POST_USER_ADD_REQUESTED = 'POST_USER_ADD_REQUESTED'
export const POST_USER_ADD_SUCCEEDED = 'POST_USER_ADD_SUCCEEDED'
export const POST_USER_ADD_FAILED = 'POST_USER_ADD_FAILED'
export const POST_USER_REPLAY_ADD_REQUESTED = 'POST_USER_REPLAY_ADD_REQUESTED'
export const POST_USER_REPLAY_ADD_SUCCEEDED = 'POST_USER_REPLAY_ADD_SUCCEEDED'
export const POST_USER_REPLAY_ADD_FAILED = 'POST_USER_REPLAY_ADD_FAILED'
//home
export const HOME_RESET = 'HOME_RESET'
export const SET_EXPANDED_RECORDS = 'SET_EXPANDED_RECORDS'
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB'
export const HOME_SET_SORTING = 'HOME_SET_SORTING'
export const SEARCH_CONTENT_CHANGE = 'SEARCH_CONTENT_CHANGE'
//metamask
export const LOGIN_METAMASK_REQUESTED = 'LOGIN_METAMASK_REQUESTED' // LOGIN
export const LOGIN_METAMASK_SUCCEEDED = 'LOGIN_METAMASK_SUCCEEDED'
export const LOGIN_METAMASK_FAILED = 'LOGIN_METAMASK_FAILED'
export const METAMASK_ETH_BALANCE_SUCCEEDED = 'METAMASK_ETH_BALANCE_SUCCEEDED' // => GET
export const METAMASK_SUT_BALANCE_SUCCEEDED = 'METAMASK_SUT_BALANCE_SUCCEEDED'
export const METAMASK_NTT_BALANCE_SUCCEEDED = 'METAMASK_NTT_BALANCE_SUCCEEDED'
export const METAMASK_GET_PLATFORM_SUT_SUCCEEDED = 'METAMASK_GET_PLATFORM_SUT_SUCCEEDED' 
export const METAMASK_GET_PLATFORM_ETH_SUCCEEDED = 'METAMASK_GET_PLATFORM_ETH_SUCCEEDED'
export const METAMASK_PUT_PLATFORM_SUT_REQUESTED = 'METAMASK_PUT_PLATFORM_SUT_REQUESTED' // => PUT
export const METAMASK_PUT_PLATFORM_SUT_SUCCEEDED = 'METAMASK_PUT_PLATFORM_SUT_SUCCEEDED'
export const METAMASK_PUT_PLATFORM_SUT_FAILED = 'METAMASK_PUT_PLATFORM_SUT_FAILED'
export const METAMASK_PUT_PLATFORM_ETH_REQUESTED = 'METAMASK_PUT_PLATFORM_ETH_REQUESTED'
export const METAMASK_PUT_PLATFORM_ETH_SUCCEEDED = 'METAMASK_PUT_PLATFORM_ETH_SUCCEEDED'
export const METAMASK_PUT_PLATFORM_ETH_FAILED = 'METAMASK_PUT_PLATFORM_ETH_FAILED'
export const METAMASK_TAKE_PLATFORM_SUT_REQUESTED = 'METAMASK_TAKE_PLATFORM_SUT_REQUESTED' // => TAKE
export const METAMASK_TAKE_PLATFORM_SUT_SUCCEEDED = 'METAMASK_TAKE_PLATFORM_SUT_SUCCEEDED'
export const METAMASK_TAKE_PLATFORM_SUT_FAILED = 'METAMASK_TAKE_PLATFORM_SUT_FAILED'
export const METAMASK_TAKE_PLATFORM_ETH_REQUESTED = 'METAMASK_TAKE_PLATFORM_ETH_REQUESTED'
export const METAMASK_TAKE_PLATFORM_ETH_SUCCEEDED = 'METAMASK_TAKE_PLATFORM_ETH_SUCCEEDED'
export const METAMASK_TAKE_PLATFORM_ETH_FAILED = 'METAMASK_TAKE_PLATFORM_ETH_FAILED'

//user
export const USER_LOGIN_SMARTUP_REQUESTED = 'USER_LOGIN_SMARTUP_REQUESTED'
export const USER_LOGIN_SMARTUP_SUCCEEDED = 'USER_LOGIN_SMARTUP_SUCCEEDED'
export const USER_LOGIN_SMARTUP_FAILED = 'USER_LOGIN_SMARTUP_FAILED'
export const USER_AUTH_SMARTUP_REQUESTED = 'USER_AUTH_SMARTUP_REQUESTED'
export const USER_AUTH_SMARTUP_SUCCEEDED = 'USER_AUTH_SMARTUP_SUCCEEDED'
export const USER_AUTH_SMARTUP_FAILED = 'USER_AUTH_SMARTUP_FAILED'
export const USER_PERSON_SIGN_REQUESTED = 'USER_PERSON_SIGN_REQUESTED'
export const USER_PERSON_SIGN_SUCCEEDED = 'USER_PERSON_SIGN_SUCCEEDED'
export const USER_PERSON_SIGN_FAILED = 'USER_PERSON_SIGN_FAILED'

export const USER_CURRENT_INFO_REQUESTED = 'USER_CURRENT_INFO_REQUESTED'
export const USER_CURRENT_INFO_SUCCEEDED = 'USER_CURRENT_INFO_SUCCEEDED'
export const USER_CURRENT_INFO_FAIL = 'USER_CURRENT_INFO_FAIL'
export const USER_AVATAR_CHANGE_REQUESTED = 'USER_AVATAR_CHANGE_REQUESTED'
export const USER_AVATAR_CHANGE_SUCCEEDED = 'USER_AVATAR_CHANGE_SUCCEEDED'
export const USER_AVATAR_CHANGE_FAIL = 'USER_AVATAR_CHANGE_FAIL'
export const USER_UPDATE_AVATAR_REQUESTED = 'USER_UPDATE_AVATAR_REQUESTED'
export const USER_UPDATE_AVATAR_SUCCEEDED = 'USER_UPDATE_AVATAR_SUCCEEDED'
export const USER_UPDATE_AVATAR_FAIL = 'USER_UPDATE_AVATAR_FAIL'
export const USER_UPDATE_NAME_REQUESTED = 'USER_UPDATE_NAME_REQUESTED'
export const USER_UPDATE_NAME_SUCCEEDED = 'USER_UPDATE_NAME_SUCCEEDED'
export const USER_UPDATE_NAME_FAIL = 'USER_UPDATE_NAME_FAIL'

export const PERSONAL_CENTER_RESET = 'PERSONAL_CENTER_RESET'

export const USER_TRANSACTION_LIST_REQUESTED = 'USER_TRANSACTION_LIST_REQUESTED'
export const USER_TRANSACTION_LIST_SUCCEEDED = 'USER_TRANSACTION_LIST_SUCCEEDED'
export const USER_TRANSACTION_LIST_FAIL = 'USER_TRANSACTION_LIST_FAIL'
export const USER_NAME_CHANGE = 'USER_NAME_CHANGE'

// DONE
export const USER_MARKET_CREATED_REQUESTED = 'USER_MARKET_CREATED_REQUESTED'
export const USER_MARKET_CREATED_SUCCEEDED = 'USER_MARKET_CREATED_SUCCEEDED'
export const USER_MARKET_CREATED_FAIL = 'USER_MARKET_CREATED_FAIL'

export const USER_MARKET_TRADED_REQUESTED = 'USER_MARKET_TRADED_REQUESTED'
export const USER_MARKET_TRADED_SUCCEEDED = 'USER_MARKET_TRADED_SUCCEEDED'
export const USER_MARKET_TRADED_FAIL = 'USER_MARKET_TRADED_FAIL'

export const USER_MARKET_COLLECTED_REQUESTED = 'USER_MARKET_COLLECTED_REQUESTED'
export const USER_MARKET_COLLECTED_SUCCEEDED = 'USER_MARKET_COLLECTED_SUCCEEDED'
export const USER_MARKET_COLLECTED_FAIL = 'USER_MARKET_COLLECTED_FAIL'

export const USER_MARKET_COLLECTED_PANEL_REQUESTED = 'USER_MARKET_COLLECTED_PANEL_REQUESTED'
export const USER_MARKET_COLLECTED_PANEL_SUCCEEDED = 'USER_MARKET_COLLECTED_PANEL_SUCCEEDED'
export const USER_MARKET_COLLECTED_PANEL_FAIL = 'USER_MARKET_COLLECTED_PANEL_FAIL'

export const USER_POST_CREATED_REQUESTED = 'USER_POST_CREATED_REQUESTED'
export const USER_POST_CREATED_SUCCEEDED = 'USER_POST_CREATED_SUCCEEDED'
export const USER_POST_CREATED_FAIL = 'USER_POST_CREATED_FAIL'

export const USER_POST_COLLECTED_REQUESTED = 'USER_POST_COLLECTED_REQUESTED'
export const USER_POST_COLLECTED_SUCCEEDED = 'USER_POST_COLLECTED_SUCCEEDED'
export const USER_POST_COLLECTED_FAIL = 'USER_POST_COLLECTED_FAIL'

export const USER_REPLY_CREATED_REQUESTED = 'USER_REPLY_CREATED_REQUESTED'
export const USER_REPLY_CREATED_SUCCEEDED = 'USER_REPLY_CREATED_SUCCEEDED'
export const USER_REPLY_CREATED_FAIL = 'USER_REPLY_CREATED_FAIL'

export const USER_REPLY_COLLECTED_REQUESTED = 'USER_REPLY_COLLECTED_REQUESTED'
export const USER_REPLY_COLLECTED_SUCCEEDED = 'USER_REPLY_COLLECTED_SUCCEEDED'
export const USER_REPLY_COLLECTED_FAIL = 'USER_REPLY_COLLECTED_FAIL'

export const USER_NAME_SUBMITTING = 'USER_NAME_SUBMITTING'
// Trading
export const TRADE_RESET = 'TRADE_RESET'
export const TRADE_TOGGLE_AGREE_TNC = 'TRADE_TOGGLE_AGREE_TNC'
export const TRADE_CHANGE_BUY_UNIT = 'TRADE_CHANGE_BUY_UNIT'
export const TRADE_CHANGE_BUY_PRICE = 'TRADE_CHANGE_BUY_PRICE'
export const TRADE_CHANGE_SELL_PRICE = 'TRADE_CHANGE_SELL_PRICE'

export const TRADE_GET_GAS_FEE_SUCCEEDED = 'TRADE_GET_GAS_FEE_SUCCEEDED'
export const TRADE_REQUESTED = 'TRADE_REQUESTED'
export const TRADE_SUCCEEDED = 'TRADE_SUCCEEDED'
export const TRADE_FAILED = 'TRADE_FAILED'

export const ORDER_BOOK_RESET = 'ORDER_BOOK_RESET'
export const ORDER_BOOK_BUY_REQUESTED = 'ORDER_BOOK_BUY_REQUESTED'
export const ORDER_BOOK_BUY_SUCCEEDED = 'ORDER_BOOK_BUY_SUCCEEDED'
export const ORDER_BOOK_BUY_FAILED = 'ORDER_BOOK_BUY_FAILED'
export const ORDER_BOOK_SELL_REQUESTED = 'ORDER_BOOK_SELL_REQUESTED'
export const ORDER_BOOK_SELL_SUCCEEDED = 'ORDER_BOOK_SELL_SUCCEEDED'
export const ORDER_BOOK_SELL_FAILED = 'ORDER_BOOK_SELL_FAILED'

export const ORDER_USER_RESET = 'ORDER_USER_RESET'
export const ORDER_USER_GET_BUY_REQUESTED = 'ORDER_USER_GET_BUY_REQUESTED'
export const ORDER_USER_GET_BUY_SUCCEEDED = 'ORDER_USER_GET_BUY_SUCCEEDED'
export const ORDER_USER_GET_BUY_FAILED = 'ORDER_USER_GET_BUY_FAILED'
export const ORDER_USER_GET_SELL_REQUESTED = 'ORDER_USER_GET_SELL_REQUESTED'
export const ORDER_USER_GET_SELL_SUCCEEDED = 'ORDER_USER_GET_SELL_SUCCEEDED'
export const ORDER_USER_GET_SELL_FAILED = 'ORDER_USER_GET_SELL_FAILED'
export const ORDER_USER_GET_HISTORY_REQUESTED = 'ORDER_USER_GET_HISTORY_REQUESTED'
export const ORDER_USER_GET_HISTORY_SUCCEEDED = 'ORDER_USER_GET_HISTORY_SUCCEEDED'
export const ORDER_USER_GET_HISTORY_FAILED = 'ORDER_USER_GET_HISTORY_FAILED'
// export const TRADE_SAVE_SUCCEEDED = 'TRADE_SAVE_SUCCEEDED'

// export const TRADE_SET_TAB = 'TRADE_SET_TAB'


// export const TRADE_LIST_REQUESTED = 'TRADE_LIST_REQUESTED'
// export const TRADE_LIST_SUCCEEDED = 'TRADE_LIST_SUCCEEDED'
// export const TRADE_LIST_FAILED = 'TRADE_LIST_FAILED'

// export const TRADE_KLINE_REQUESTED = 'TRADE_KLINE_REQUESTED'
// export const TRADE_KLINE_SUCCEEDED = 'TRADE_KLINE_SUCCEEDED'
// export const TRADE_KLINE_FAILED = 'TRADE_KLINE_FAILED'

// export const TRADE_HIGH_LOW_REQUESTED = 'TRADE_HIGH_LOW_REQUESTED'
// export const TRADE_HIGH_LOW_SUCCEEDED = 'TRADE_HIGH_LOW_SUCCEEDED'
// export const TRADE_HIGH_LOW_FAILED = 'TRADE_HIGH_LOW_FAILED'

// export const TRADE_DETAIL_REQUESTED = 'TRADE_DETAIL_REQUESTED'
// export const TRADE_DETAIL_SUCCEEDED = 'TRADE_DETAIL_SUCCEEDED'
// export const TRADE_DETAIL_FAILED = 'TRADE_DETAIL_FAILED'
/* ======== Market ======= */
// UI
export const CREATE_MARKET_SET_TAB = 'CREATE_MARKET_SET_TAB'
export const CREATE_MARKET_RESET = 'CREATE_MARKET_RESET'
export const CREATE_MARKET_NAME_CHANGE = 'CREATE_MARKET_NAME_CHANGE'
export const CREATE_MARKET_DESC_CHANGE = 'CREATE_MARKET_DESC_CHANGE'
export const CREATE_MARKET_DETAIL_CHANGE = 'CREATE_MARKET_DETAIL_CHANGE'
export const CREATE_MARKET_SYMBOL_CHANGE = 'CREATE_MARKET_SYMBOL_CHANGE'
export const CREATE_MARKET_PERIOD_CHANGE = 'CREATE_MARKET_PERIOD_CHANGE'
export const CREATE_MARKET_PRICE = 'CREATE_MARKET_PRICE'
export const CREATE_MARKET_UNIT = 'CREATE_MARKET_UNIT'
export const CREATE_MARKET_RESERVE = 'CREATE_MARKET_RESERVE'
// IPFS
export const CREATE_MARKET_AVATAR_CHANGE_REQUESTED = 'CREATE_MARKET_AVATAR_CHANGE_REQUESTED'
export const CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED = 'CREATE_MARKET_AVATAR_CHANGE_SUCCEEDED'
export const CREATE_MARKET_AVATAR_CHANGE_FAILED = 'CREATE_MARKET_AVATAR_CHANGE_FAILED'
export const CREATE_MARKET_COVER_CHANGE_REQUESTED = 'CREATE_MARKET_COVER_CHANGE_REQUESTED'
export const CREATE_MARKET_COVER_CHANGE_SUCCEEDED = 'CREATE_MARKET_COVER_CHANGE_SUCCEEDED'
export const CREATE_MARKET_COVER_CHANGE_FAILED = 'CREATE_MARKET_COVER_CHANGE_FAILED'
// API
export const CREATE_MARKET_GET_REQUESTED = 'CREATE_MARKET_GET_REQUESTED'
export const CREATE_MARKET_GET_SUCCEEDED = 'CREATE_MARKET_GET_SUCCEEDED'
export const CREATE_MARKET_GET_FAILED = 'CREATE_MARKET_GET_FAILED'
export const CREATE_MARKET_CHECK_REQUESTED = 'CREATE_MARKET_CHECK_REQUESTED'
export const CREATE_MARKET_CHECK_SUCCEEDED = 'CREATE_MARKET_CHECK_SUCCEEDED'
export const CREATE_MARKET_CHECK_FAILED = 'CREATE_MARKET_CHECK_FAILED'
export const CREATE_MARKET_SAVE_REQUESTED = 'CREATE_MARKET_SAVE_REQUESTED'
export const CREATE_MARKET_SAVE_SUCCEEDED = 'CREATE_MARKET_SAVE_SUCCEEDED'
export const CREATE_MARKET_SAVE_FAILED = 'CREATE_MARKET_SAVE_FAILED'
export const CREATE_MARKET_LOCK_REQUESTED = 'CREATE_MARKET_LOCK_REQUESTED'
export const CREATE_MARKET_LOCK_SUCCEEDED = 'CREATE_MARKET_LOCK_SUCCEEDED'
export const CREATE_MARKET_LOCK_FAILED = 'CREATE_MARKET_LOCK_FAILED'
export const CREATE_MARKET_PAY_REQUESTED = 'CREATE_MARKET_PAY_REQUESTED'
export const CREATE_MARKET_PAY_SUCCEEDED = 'CREATE_MARKET_PAY_SUCCEEDED'
export const CREATE_MARKET_PAY_FAILED = 'CREATE_MARKET_PAY_FAILED'

export const MARKET_DETAIL_RESET = 'MARKET_DETAIL_RESET'
export const GET_MARKET_DETAIL_REQUESTED = 'GET_MARKET_DETAIL_REQUESTED'
export const GET_MARKET_DETAIL_SUCCEEDED = 'GET_MARKET_DETAIL_SUCCEEDED'
export const GET_MARKET_DETAIL_FAILED = 'GET_MARKET_DETAIL_FAILED'

export const MARKET_DETAIL_GET_CT_REQUESTED = 'MARKET_DETAIL_GET_CT_REQUESTED'
export const MARKET_DETAIL_GET_CT_SUCCEEDED = 'MARKET_DETAIL_GET_CT_SUCCEEDED'
export const MARKET_DETAIL_GET_CT_FAILED = 'MARKET_DETAIL_GET_CT_FAILED'

export const GET_MARKET_LIST_REQUESTED = 'GET_MARKET_LIST_REQUESTED'
export const GET_MARKET_LIST_SUCCEEDED = 'GET_MARKET_LIST_SUCCEEDED'
export const GET_MARKET_LIST_FAILED = 'GET_MARKET_LIST_FAILED'
export const MARKET_SEARCH_REQUESTED = 'MARKET_SEARCH_REQUESTED'
export const MARKET_SEARCH_SUCCEEDED = 'MARKET_SEARCH_SUCCEEDED'
export const MARKET_SEARCH_FAILED = 'MARKET_SEARCH_FAILED'
export const MARKET_TOP_REQUESTED = 'MARKET_TOP_REQUESTED'
export const MARKET_TOP_SUCCEEDED = 'MARKET_TOP_SUCCEEDED'
export const MARKET_TOP_FAILED = 'MARKET_TOP_FAILED'
export const MARKET_TOP_SORT = 'MARKET_TOP_SORT'
//panel
export const PANEL_SET_OPEN = 'PANEL_SET_OPEN'
export const PANEL_SET_ACTIVE_TAB = 'PANEL_SET_ACTIVE_TAB'
export const PANEL_TOGGLE_EXPANDED_WALLET = 'PANEL_TOGGLE_EXPANDED_WALLET'
export const PANEL_TOGGLE_EXPANDED_MARKET = 'PANEL_TOGGLE_EXPANDED_MARKET'
export const PANEL_TOGGLE_EXPANDED_BOOKMARK = 'PANEL_TOGGLE_EXPANDED_BOOKMARK'
export const PANEL_PUT_ETH_INPUT_ONCHANGE = 'PANEL_PUT_ETH_INPUT_ONCHANGE'
export const PANEL_PUT_SUT_INPUT_ONCHANGE = 'PANEL_PUT_SUT_INPUT_ONCHANGE'
export const PANEL_TAKE_ETH_INPUT_ONCHANGE = 'PANEL_TAKE_ETH_INPUT_ONCHANGE'
export const PANEL_TAKE_SUT_INPUT_ONCHANGE = 'PANEL_TAKE_SUT_INPUT_ONCHANGE'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_AVATAR = 'SET_USER_AVATAR'
export const METAMASK_LOGIN = 'METAMASK_LOGIN'
export const METAMASK_ETH_TRANSACTION = 'METAMASK_ETH_TRANSACTION'
//proposed
export const MARKET_PROPODAL_LIST_REQUESTED = 'MARKET_PROPODAL_LIST_REQUESTED'
export const MARKET_PROPODAL_LIST_SUCCEEDED = 'MARKET_PROPODAL_LIST_SUCCEEDED'
export const MARKET_PROPODAL_LIST_FAILED = 'MARKET_PROPODAL_LIST_FAILED'
export const MARKET_PROPODAL_ONE_REQUESTED = 'MARKET_PROPODAL_ONE_REQUESTED'
export const MARKET_PROPODAL_ONE_SUCCEEDED = 'MARKET_PROPODAL_ONE_SUCCEEDED'
export const MARKET_PROPODAL_ONE_FAILED = 'MARKET_PROPODAL_ONE_FAILED'
export const USER_PROPODAL_LIST_REQUESTED = 'USER_PROPODAL_LIST_REQUESTED'
export const USER_PROPODAL_LIST_SUCCEEDED = 'USER_PROPODAL_LIST_SUCCEEDED'
export const USER_PROPODAL_LIST_FAILED = 'USER_PROPODAL_LIST_FAILED'
export const USER_PROPODAL_SUGGEST_EDITING_REQUESTED = 'USER_PROPODAL_SUGGEST_EDITING_REQUESTED'
export const USER_PROPODAL_SUGGEST_EDITING_SUCCEEDED = 'USER_PROPODAL_SUGGEST_EDITING_SUCCEEDED'
export const USER_PROPODAL_SUGGEST_EDITING_FAILED = 'USER_PROPODAL_SUGGEST_EDITING_FAILED'
export const USER_PROPODAL_SUGGEST_SAVE_REQUESTED = 'USER_PROPODAL_SUGGEST_SAVE_REQUESTED'
export const USER_PROPODAL_SUGGEST_SAVE_SUCCEEDED = 'USER_PROPODAL_SUGGEST_SAVE_SUCCEEDED'
export const USER_PROPODAL_SUGGEST_SAVE_FAILED = 'USER_PROPODAL_SUGGEST_SAVE_FAILED'
export const USER_PROPODAL_SUT_EDITING_REQUESTED = 'USER_PROPODAL_SUT_EDITING_REQUESTED'
export const USER_PROPODAL_SUT_EDITING_SUCCEEDED = 'USER_PROPODAL_SUT_EDITING_SUCCEEDED'
export const USER_PROPODAL_SUT_EDITING_FAILED = 'USER_PROPODAL_SUT_EDITING_FAILED'
export const USER_PROPODAL_SUT_SAVE_REQUESTED = 'USER_PROPODAL_SUT_SAVE_REQUESTED'
export const USER_PROPODAL_SUT_SAVE_SUCCEEDED = 'USER_PROPODAL_SUT_SAVE_SUCCEEDED'
export const USER_PROPODAL_SUT_SAVE_FAILED = 'USER_PROPODAL_SUT_SAVE_FAILED'
