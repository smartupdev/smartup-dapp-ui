import fetch from '../lib/util/fetch'

/*
  params order:
    address > type > id > name > hash > asc > { pageNumb, pageSize, isLoadMore } 
*/
const pageNumbDefault = 1, pageSizeDefault = 20 // default at the end of the query

function pageHelper(pageNumb, pageSize, isLoadMore) {
  return {
    pageNumb: isLoadMore ? pageNumb + 1 : 1,
    pageSize
  }
}

// Bookmark <-> collect-controller
export const API_USER_COLLECT_ADD = '/api/user/collect/add';
export const API_USER_COLLECT_DEL = '/api/user/collect/del';
export const API_USER_COLLECT_LIST = '/api/user/collect/list';

export const apiGetGlobalMarket = () => () => fetch.get('/api/market/global/data') // return sutAmount, marketCount, latelyPostCount

// type: market | post | reply
// id: marketId | postId | replyId
export const apiDelCollect =         (type, id) => () => fetch.post('/api/user/collect/del', { type, objectMark: id })
export const apiAddCollect =         (type, id) => () => fetch.post('/api/user/collect/add', { type, objectMark: id })

/* ====== GET PERSONAL CENTER DATA ====== START */
export const apiGetCreatedMarket =   ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/market/created',      pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of details markets
export const apiGetCollectedMarket = ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/market/collected',    pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of details markets
export const apiGetTradedMarket =    ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/market/traded',       pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of details markets
export const apiGetTradedMarketCt =  ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/ct/account/in/market',pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of markets with ct !important

export const apiGetCreatedPost =     ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/post/created',     pageHelper(pageNumb, pageSize, isLoadMore) )
export const apiGetCollectedPost =   ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/post/collected',   pageHelper(pageNumb, pageSize, isLoadMore) )

export const apiGetCreatedReply =    ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/reply/created',    pageHelper(pageNumb, pageSize, isLoadMore) )
export const apiGetCollectedReply =  ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/reply/collected',  pageHelper(pageNumb, pageSize, isLoadMore) )

export const apiGetTransaction =     ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/transaction/list', pageHelper(pageNumb, pageSize, isLoadMore) )
/* ====== GET PERSONAL CENTER DATA ====== END */

/* ====== USER AUTH ====== START */
export const apiLogin =              (address) =>              () => fetch.post('/api/login',       { address }) // return code
export const apiAuth =               (address, signature) =>   () => fetch.post('/api/auth',        { address, signature }) // return { token, user }
export const apiGetUser =            () =>                     () => fetch.get('/api/user/current') // return { address, name, avatarIpfsHash, createTime }
export const apiUpdateUser =         (name, avatarIpfsHash) => () => fetch.post('/api/user/update',  { name, avatarIpfsHash })
/* ====== USER AUTH ====== END */

/* ====== Transaction ====== START */
export const transactionType = { depositSut: 'ChargeSut', depositEth: 'ChargeEth', withdrawSut: 'WithdrawSut', withdrawEth: 'WithdrawEth', createMarket: 'CreateMarket', buyCT: 'BuyCT', sellCT: 'SellCT' }
export const apiGetTransactionList = ({ pageNumb = pageNumbDefault, pageSize = pageSizeDefault, type = '' }) => () => fetch.post('/api/user/transaction/list', { type, pageNumb, pageSize })
export const apiAddTransaction =     ({ txHash, type, amount }) => () => fetch.post('/api/user/transaction/upload/tx/hash', { txHash, type, amount })
/* ====== Transaction ====== END */

/* ====== Market ====== START */
export const apiCreateMarketCheckInput1 = ({name, desc: description, detail, avatarHash: photo, coverHash: cover}) => () => fetch.post('/api/market/create/check/info', { name, description, photo, cover, detail })
export const apiCreateMarketCheckInput2 = ({unit: ctCount, unitPrice: ctPrice, reserveRatio, symbol, period: closingTime}) => () => fetch.post('/api/market/create/check/setting', { ctCount, ctPrice, ctRecyclePrice: ctPrice * reserveRatio, symbol, closingTime })
export const apiGetNewMarketId = () => () => fetch.get('/api/market/create/generate/id')
export const apiCreateMarket = ({marketId, name, description, photo, cover, ctCount, ctPrice, ctRecyclePrice, gasLimit, gasPrice, sign}) => () => fetch.post('/api/user/market/create', { marketId, name, description, photo, cover, ctCount, ctPrice, ctRecyclePrice, gasLimit, gasPrice, sign })
export const apiGetSavedMarket = () => () => fetch.get('/api/user/market/creating')
/* ====== Transaction ====== END */

//notification-controller
export const API_USER_NOTIFICATION_LIST = '/api/user/notification/list';
export const API_USER_NOTIFICATION_SEARCH = '/api/user/notification/search';
export const API_USER_NOTIFICATION_SET_READ = '/api/user/notification/set/read';
export const API_USER_NOTIFICATION_UNREAD = '/api/user/notification/unread';
//post-controller
export const API_POST_LIST = '/api/post/list';
export const API_POST_ONE = '/api/post/one';
export const API_POST_REPLY_CHILDREN_LIST = '/api/post/reply/children/list';
export const API_POST_REPLY_LIST = '/api/post/reply/list';
export const API_POST_REPLY_ONE = '/api/post/reply/one';
export const API_POST_LIKE = '/api/user/post/like';
export const API_USER_POST_ADD = '/api/user/post/add';
export const API_USER_POST_REPLY_ADD = '/api/user/post/reply/add';
//market-controller
export const API_MARKET_DETAIL = '/api/market/one/by/id';
export const API_MARKET_LIST = '/api/market/list';
export const API_MARKET_GLOBAL = '/api/market/global/data';
export const API_MARKET_CREATE_GET = '/api/user/market/creating'
export const API_MARKET_CREATE_CHANGE_NAME = '/api/user/market/is/name/right'
export const API_MARKET_CREATE_SAVE = '/api/user/market/save'
export const API_MARKET_CREATE_LOCK = '/api/user/market/lock'
export const API_MARKET_SEARCH = '/api/market/search'
export const API_MARKET_TOP = '/api/market/top'
//account-controller
export const API_CT_ACCOUNT_IN_MARKET = '/api/user/ct/account/in/market'
//user-controller
export const API_USER_AUTH = '/api/auth';
export const API_USER_LOGIN = '/api/login';
export const API_USER_CURRENT = '/api/user/current';
export const API_USER_UPDATE = '/api/user/update';
export const API_USER_TRANSACTION_LIST = '/api/user/transaction/list';
export const API_USER_MARKET_CREATED = '/api/user/market/created';
export const API_USER_MARKET_TRADED = '/api/user/market/traded';
export const API_USER_MARKET_COLLECTED = '/api/user/market/collected';
export const API_USER_POST_COLLECTED = '/api/user/post/collected';
export const API_USER_POST_CREATED = '/api/user/post/created';
export const API_USER_REPLY_COLLECTED = '/api/user/reply/collected';
export const API_USER_REPLY_CREATED = '/api/user/reply/created';
//trade-controller
export const API_MARKET_TRADE_LIST = '/api/market/trade/list';
export const API_USER_TRADE_LIST = '/api/user/trade/list';
export const API_USER_TRADE_DETAIL = '/api/user/trade/one';
export const API_USER_TRADE_SAVE = '/api/user/trade/save';
export const API_KLINE_DATA = '/api/kline/data';
//proposal-controller
export const API_MARKET_PROPOSAL_LIST = '/api/market/proposal/list';
export const API_PROPOSAL_ONE = '/api/proposal/one';
export const API_USER_PROPOSAL_LIST = 'API_USER_PROPOSAL_LIST';
export const API_USER_PROPOSAL_SUGGEST_EDITING = '/api/user/proposal/suggest/editing';
export const API_USER_PROPOSAL_SUGGEST_SAVE = '/api/user/proposal/suggest/save';
export const API_USER_PROPOSAL_SUT_EDITING = '/api/user/proposal/sut/editing';
export const API_USER_PROPOSAL_SUT_SAVE = '/api/user/proposal/sut/save';
