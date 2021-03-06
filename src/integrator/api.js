import fetch, { delay, fakeApi } from '../lib/util/fetch'
import {
  ENV, createMarketGasLimit, buyCtStage1GasLimit
} from '../config'
import { orderMassage } from './massager'
import { log, getYear, getMonth, getDate, getHour, DAY, MONTH, YEAR } from '../lib/util'

export const FLAG_STATUS = {
  collecting: 'collectDeposit',
  voting: 'voting',
  finished: 'finished'
}

export const PROPOSAL_STATE = {
  all: 'all',
  draft: 'draft',
  revision: 'revision',
  adminVote: 'adminVote',
  publicVote: 'publicVote',
  ongoing: 'ongoing',
  review: 'review',
  closed: 'closed'
}

export const PROPOSAL_SORT = {
  startTime: 'startTime',
  totalVotes: 'totalVotes',
  yesVotes: 'yesVotes',
  noVotes: 'noVotes',
  currentWithdrawAmount: 'currentWithdrawAmount',
  totalWithdrawAmount: 'totalWithdrawAmount', 
  createdTime: 'createdTime'
}

// trading/cancel/cancelPart/done
export const ORDER_STATE = {
  active: 'trading',
  locked: 'locked',
  fullyExecuted: 'done',
  partiallyExecuted: 'cancelPart',
  notExecuted: 'cancel',
  processing: 'processing',
  onHold: 'onHold',
  newAdded: 'new', // only for FE
}

export const ORDER_SIDE = { 
  buy: 'buy',
  sell: 'sell',
  firstStageBuy: 'firstStageBuy'
 }

export const MARKET_FILTER_TYPE = {
  all: 'all', 
  hot: 'hot',
  new: 'new',
  pop: 'pop',
  rich: 'rich',
}

export const MARKET_STAGE = {
  offering: '1',
  exchange: '2', 
  closed: '-1' 
}

/*
  params order:
    address > type > id > name > hash > asc > { pageNumb, pageSize, isLoadMore } 
*/
const pageNumbDefault = 1, pageSizeDefault = 20 // default at the end of the query
function pageHelper(pageNumb, pageSize, isLoadMore, isPolling) {
  return {
    pageNumb: !isPolling && isLoadMore ? pageNumb + 1 : 1,
    pageSize
  }
}

export const apiGetGlobalMarket = () => () => fetch.get('/api/market/global/data') // return sutAmount, marketCount, latelyPostCount
export const apiGetSutValue = () => () => window.fetch('http://api.coinbene.com/v1/market/ticker?symbol=SMARTUPUSDT').then(r => r.json()).then(r => ({ usd: +r.ticker[0].last }))
// type: market | post | reply
// id: marketId | postId | replyId
export const apiDelCollect =         (type, id) => () => fetch.post('/api/user/collect/del', { type, objectMark: id })
export const apiAddCollect =         (type, id) => () => fetch.post('/api/user/collect/add', { type, objectMark: id })

/* ====== USER AUTH ====== START */
export const apiLogin =              (address) =>              () => fetch.post('/api/login',       { address }) // return code
export const apiAuth =               (address, signature) =>   () => fetch.post('/api/auth',        { address, signature }) // return { token, user }
export const apiGetUser =            () =>                     () => fetch.get('/api/user/current') // return { address, name, avatarIpfsHash, createTime }
export const apiUserUpdate = (username, avatarHash) => () => fetch.post('/api/user/update', { name: username || null, avatarIpfsHash: avatarHash || '' })
/* ====== USER AUTH ====== END */

/* ====== Personal Center ====== START */
export const apiGetCreatedMarket =   ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/market/created',      pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of details markets
export const apiGetCollectedMarket = ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/market/collected',    pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of details markets
export const apiGetTradedMarket =    ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/market/traded',       pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of details markets
export const apiGetTradedMarketCt =  ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/ct/account/in/market',pageHelper(pageNumb, pageSize, isLoadMore) ) // return list of markets with ct !important

export const apiGetCreatedPost =     ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/post/created',     pageHelper(pageNumb, pageSize, isLoadMore) )
export const apiGetCollectedPost =   ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/post/collected',   pageHelper(pageNumb, pageSize, isLoadMore) )

export const apiGetCreatedReply =    ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/reply/created',    pageHelper(pageNumb, pageSize, isLoadMore) )
export const apiGetCollectedReply =  ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/reply/collected',  pageHelper(pageNumb, pageSize, isLoadMore) )

export const apiGetTransaction =     ({pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => () => fetch.get('/api/user/transaction/list', pageHelper(pageNumb, pageSize, isLoadMore) )
/* ====== Personal Center ====== END */

/* ====== Transaction ====== START */
export const transactionType = { depositSut: 'ChargeSut', depositEth: 'ChargeEth', withdrawSut: 'WithdrawSut', withdrawEth: 'WithdrawEth', createMarket: 'CreateMarket', buyCT: 'BuyCT', sellCT: 'SellCT' }
export const apiGetTransactionList = ({ type = '', pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false }) => () => fetch.post('/api/user/transaction/list', { type, ...pageHelper(pageNumb, pageSize, isLoadMore) })
export const apiAddTransaction =     ({ txHash, type, amount }) => () => fetch.post('/api/user/transaction/upload/tx/hash', { txHash, type, amount })

// to make sure the output is from the most updated input
let currentGettingGasFee = ''
function checkOutdate(localKey) {
  if(localKey !== currentGettingGasFee) throw new Error('Skip invalid/outdated data')
}
export const apiGetGasFee = (marketId, price, unit) => async () => {
  try {
    const localKey = {}
    currentGettingGasFee = localKey
    if(!price || !unit) return null
    await delay(500) // only call api when user idle certain ms
    checkOutdate(localKey)
    const r = await fetch.get('/api/user/trade/add/buy/reckon', { marketId, type: 'buy', price, volume: unit })
    checkOutdate(localKey)
    // limit = times * Step + [times/10 + (times%10>0 ? 1 : 0)] * Base
    // Step = 10_0000;
    // Base = 20_0000;
    return {...r, gasFee: r.limit * ENV.gasWeiPrices[1]}
  }
  catch(error) {
    // do nothing, swallow error
    log.casual(error.message)
    return
  }
}

export const apiBuyCtStage1 = ({marketId, ctCount, gasPriceLevel, timestamp, sign, sellPrice, sellSign}) => () => fetch.post('/api/user/first/stage/buy', {marketId, ctCount, gasLimit: buyCtStage1GasLimit, gasPrice: ENV.gasWeiPrices[gasPriceLevel], timestamp, sign, sellPrice, sellSign})
export const apiBuyCtStage2 = ({marketId, buyPrice, sellPrice, unit, times, timestamp, makeSign, takeSign, sellSign}) => () => fetch.post('/api/user/trade/add/buy', {marketId, price: buyPrice, volume: unit, sellPrice, times, timestamp, makeSign, takeSign, sellSign})
export const apiTradeList = ({ types, states, pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false }) => () => fetch('/api/user/trade/list', { types, states, ...pageHelper(pageNumb, pageSize, isLoadMore) })
/* ====== Transaction ====== END */

/* ========== My Order ========= */
const myOrder = {
  list: [ // sort by: createdTime(newest to oldest)
    {
      orderId: 'vbtres',
      createdTime: '2019-06-04 11:03:14', // string
      side: ORDER_SIDE.sell, // or sell
      state: 'active',
      totalAmount: 50,
      filledAmount: 20,
      buyingPrice: 40.41, // only for buy
      sellingPrice: 50.11, // buy and sell
      avgTradedPrice: 40.51,
    },
    {
      orderId: 'g43edvf',
      createdTime: '2019-06-01 11:03:14', // string
      side: ORDER_SIDE.buy, // or sell
      state: 'active',
      totalAmount: 50,
      filledAmount: 20,
      buyingPrice: 40.41, // only for buy
      sellingPrice: 50.11, // buy and sell
      avgTradedPrice: 40.51,
    }
  ],  
  hasNextPage: false,
  pageNumb: 1,
  pageSize: 20,
  pageCount: 1,
  rowCount: 1,
}
export const apiGetUserOrder = ({ marketId, side, states, orderBy, pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false }) => () => 
  fetch.get('/api/user/trade/list', { marketId, types: [side], states, ...pageHelper(pageNumb, pageSize, isLoadMore) })

export const apiEditSellOrder = ({ marketId, cancelledOrderIds, unlockedOrderIds, addedOrders: list, sign, timestamp }) => () => 
  fetch.post('api/user/trade/update/sell/reckon', { marketId, cancelledOrderIds, lockedOrderIds: unlockedOrderIds, newOrders: list.map( l => ({
    price: l.sellingPrice,
    volume: l.totalAmount,
    // times,
    // makeSign,
    // takeSign,
    timestamp,
  })) }, null, 'json')
/* ========== My Order ========= END */ 
// /api/user/trade/update/sell/reckon
// api/user/trade/update/sell
/* ========== Order Book ========= */
const orderBookRes = {
  hasNextPage: false,
  pageNumb: 1,
  pageSize: 20,
  pageCount: 1,
  rowCount: 1,
  list: [
    { price: 30, amount: 1000 },
    { price: 29.99, amount: 900 },
    { price: 28.98, amount: 500 },
    { price: 27.98, amount: 500 },
    { price: 26.98, amount: 500 },
    { price: 25.98, amount: 500 },
    { price: 24.98, amount: 500 },
    { price: 23.98, amount: 500 },
    { price: 22.98, amount: 500 },
    { price: 21.98, amount: 500 },
    { price: 21.97, amount: 500 },
    { price: 21.96, amount: 500 },
    { price: 21.95, amount: 500 },
    { price: 21.94, amount: 500 },
    { price: 21.93, amount: 500 },
    { price: 21.92, amount: 500 },
    { price: 21.91, amount: 500 },
    { price: 21.90, amount: 500 },
    // { price: 21.89, amount: 500 },
    // { price: 21.88, amount: 500 },
    // { price: 21.86, amount: 500 },
    // { price: 21.84, amount: 500 },
    // { price: 21.81, amount: 500 },
    // { price: 21.65, amount: 500 },
  ]
}

export const apiGetOrderBook = (marketId, numberOfBook = 30, numberOfTransaction = 100) => () => 
  fetch.get('/api/trade/order/book', { marketId, topOfBook: numberOfBook, topOfOrder: numberOfTransaction })
    .then(r => ({ ...r, sellOrder: orderMassage(r.sellBook), buyOrder: orderMassage(r.buyBook) }))
/* ========== Order Book ========== END */ 

/* ====== Market ====== START */
export const apiCreateMarketCheckInput1 = ({name, desc: description, detail, avatarHash: photo, coverHash: cover}) => () => fetch.post('/api/market/create/check/info', { name, description, photo, cover, detail })
export const apiCreateMarketCheckInput2 = ({unit: ctCount, unitPrice: ctPrice, reserveRatio, symbol, closingTime}) => () => fetch.post('/api/market/create/check/setting', { ctCount, ctPrice, ctRecyclePrice: ctPrice * reserveRatio, symbol, closingTime }) // TODO: use BN
export const apiGetNewMarketId = () => () => fetch.get('/api/market/create/generate/id')
export const apiCreateMarket = ({marketId, name, description, detail, photo, cover, symbol, closingTime, ctCount, ctPrice, ctRecyclePrice, gasPriceLevel, hash: sign}) => () => fetch.post('/api/user/market/create', { marketId, name, description, detail, photo, cover, symbol, closingTime, ctCount, ctPrice, ctRecyclePrice, gasLimit: createMarketGasLimit, gasPrice: ENV.gasWeiPrices[gasPriceLevel], sign })
export const apiGetSavedMarket = () => () => fetch.get('/api/user/market/creating')

export const apiGetMarket = (marketId) => () => fetch.get('/api/market/one', { marketId })

function getDateRange(tabIndex) {
  const now = Date.now()
  function getDateShort(d) { return `${getYear(d)}_${getMonth(d)}_${getDate(d)}` }
  function getDateLong(d) { return `${getYear(d)}_${getMonth(d)}_${getDate(d)}_${getHour(d)}` }
  const end = getDateShort(now)
  return [
    { start: getDateLong(now - DAY), end: getDateLong(now), segment: '1hour'}, // 1d
    { start: getDateShort(now - MONTH), end, segment: '1day'}, // 1m
    { start: getDateShort(now - YEAR), end, segment: '1week'}, // 1y
  ][tabIndex]
}
export const apiGetKline = (marketAddress, segmentIndex) => () => fetch.get('/api/kline/data', { marketAddress, ...getDateRange(segmentIndex) })

// /api/market/list   Get all markets
// /api/market/search Get market by filter
// /api/market/top    Get filtered markets, e.g. hottest
let _filteredMarketList = [] // To cache the latest market list and do sorting and keyword search locally
function _marketListResponse(markets) {
  return {list: markets, pageNumb: 1, hasNextPage: false, rowCount: markets.length}
}
export const apiGetMarketList = ({
  sortBy, orderBy, keyword, 
  filterType, marketStage,
  pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false}) => async () => {
    const isAll = filterType === MARKET_FILTER_TYPE.all
    const asc = orderBy === 'asc'
    if(isAll)
      return keyword ? 
        fetch.get('/api/market/search', {orderBy: sortBy, asc, ...pageHelper(pageNumb, pageSize, isLoadMore), name: keyword })
      : fetch.get('/api/market/list', {orderBy: sortBy, asc, ...pageHelper(pageNumb, pageSize, isLoadMore) })
    else 
      if(keyword || sortBy) {
        const marketList = sortBy ? 
            [..._filteredMarketList].sort( (a, b) => {
              const A = a[sortBy], B = b[sortBy]
              if(A === null) return 1
              if(B === null) return -1
              return (orderBy === 'asc' ? 1 : -1) *
              (typeof A === 'string' || typeof B === 'string' ?
              A.localeCompare(B) :
              A - B)
            }) 
          : _filteredMarketList
        return _marketListResponse(marketList.filter(m => m.name.toLowerCase().includes(keyword.toLowerCase()) )) 
      }
      else {
        _filteredMarketList = await fetch.get('/api/market/top', { type: filterType })
        return _marketListResponse(_filteredMarketList)
      }
}

/* ====== Market ====== END */


/* ======== Discussion ======= Start */
export const apiGetPostList = ({ marketId, keyword, autoFetch, pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false }) => () => fetch.get('/api/post/list', {
  type: marketId ? 'market' : 'root',
  marketId,
  query: keyword,
  ...pageHelper(pageNumb, pageSize, isLoadMore, autoFetch),
})
export const apiGetReplyList = ({ postId, isPolling, pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false }) => () => fetch.get('/api/post/reply/list', {
  postId, 
  ...pageHelper(pageNumb, pageSize, isLoadMore, isPolling)
})

/* ======== Discussion ======= END */


/* ======== Proposal ======= Start */
const voteObj = {
  endTime: Date.now() + 5000000,
  yesVotes: 30,
  noVotes: 30,
  totalVotes: 60,
  totalCt: 100
}
const milestone = {
  title: 'Design',
  description: 'XXXXXXXX', 
  receiver: 'addressxxxx',
  withdrawAmount: 1234565432,
  publicVote: voteObj,
  adminVote: voteObj, // only hv in the first milestone
  ongoingPeriod: 123, // only hv except first milestone
}

const proposalList = [
  {
    id: 1,
    state: PROPOSAL_STATE.draft,
    name: 'Promote market',
    createdTime: Date.now(),
    lastUpdateTime: Date.now(),
    owner: {
      name: 'CM'
    },
    milestones: [ milestone, milestone ]
  },
  {
    id: 2,
    state: PROPOSAL_STATE.publicVote,
    name: 'Promote market',
    createdTime: Date.now(),
    lastUpdateTime: Date.now(),
    owner: {
      name: 'CM'
    },
    milestones: [ milestone, milestone ]
  }  
].map(p => ({
  ...p,
  ...p.milestones[0]
}))
export const apiGetProposalList = ({ marketId, state, sort, pageNumb = pageNumbDefault, pageSize = pageSizeDefault, isLoadMore = false }) => async () => {
  await delay(1000)
  return {
    hasNextPage: false,
    pageNumb: 1,
    pageSize: 20,
    pageCount: 1,
    rowCount: 1,
    list: proposalList,
  } 
}
export const apiGetProposalDetails = ({ marketId, proposalId }) => async () => {
  await delay(500)
  return proposalList[0]
}
/* ======== Proposal ======= END */

export const apiGetNotificationUnread = () => () => fetch.get('/api/user/notification/unread')


/*
  TODO: The followings should be removed
*/

//notification-controller
export const API_USER_NOTIFICATION_LIST = '/api/user/notification/list';
export const API_USER_NOTIFICATION_SEARCH = '/api/user/notification/search';
export const API_USER_NOTIFICATION_SET_READ = '/api/user/notification/set/read';
// export const API_USER_NOTIFICATION_UNREAD = '/api/user/notification/unread';
//post-controller
export const API_POST_LIST = '/api/post/list';
export const API_POST_ONE = '/api/post/one';
export const API_POST_REPLY_CHILDREN_LIST = '/api/post/reply/children/list';
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
//proposal-controller
export const API_MARKET_PROPOSAL_LIST = '/api/market/proposal/list';
export const API_PROPOSAL_ONE = '/api/proposal/one';
export const API_USER_PROPOSAL_LIST = 'API_USER_PROPOSAL_LIST';
export const API_USER_PROPOSAL_SUGGEST_EDITING = '/api/user/proposal/suggest/editing';
export const API_USER_PROPOSAL_SUGGEST_SAVE = '/api/user/proposal/suggest/save';
export const API_USER_PROPOSAL_SUT_EDITING = '/api/user/proposal/sut/editing';
export const API_USER_PROPOSAL_SUT_SAVE = '/api/user/proposal/sut/save';

// Bookmark <-> collect-controller
export const API_USER_COLLECT_ADD = '/api/user/collect/add';
export const API_USER_COLLECT_DEL = '/api/user/collect/del';
export const API_USER_COLLECT_LIST = '/api/user/collect/list';