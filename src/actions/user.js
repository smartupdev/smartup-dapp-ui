import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
  USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
  USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
  USER_AUTH_SMARTUP_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED, USER_AUTH_SMARTUP_FAILED,
  METAMASK_RESET,
  USER_TRANSACTION_LIST_REQUESTED,USER_TRANSACTION_LIST_SUCCEEDED,USER_TRANSACTION_LIST_FAIL,
  USER_AVATAR_CHANGE_REQUESTED,USER_AVATAR_CHANGE_SUCCEEDED,USER_AVATAR_CHANGE_FAIL,
  USER_UPDATE_INFO_REQUESTED,USER_UPDATE_INFO_SUCCEEDED,USER_UPDATE_INFO_FAIL,
  USER_CURRENT_INFO_REQUESTED,USER_CURRENT_INFO_SUCCEEDED,USER_CURRENT_INFO_FAIL,
  USER_NAME_CHANGE,
  USER_MARKET_CREATED_REQUESTED,USER_MARKET_CREATED_SUCCEEDED,USER_MARKET_CREATED_FAIL,
  USER_MARKET_TRADED_REQUESTED,USER_MARKET_TRADED_SUCCEEDED,USER_MARKET_TRADED_FAIL,
  USER_POST_COLLECTED_REQUESTED,USER_POST_COLLECTED_SUCCEEDED,USER_POST_COLLECTED_FAIL,
  USER_POST_CREATED_REQUESTED,USER_POST_CREATED_SUCCEEDED,USER_POST_CREATED_FAIL,
  USER_REPLY_COLLECTED_REQUESTED,USER_REPLY_COLLECTED_SUCCEEDED,USER_REPLY_COLLECTED_FAIL,
  USER_REPLY_CREATED_REQUESTED,USER_REPLY_CREATED_SUCCEEDED,USER_REPLY_CREATED_FAIL,
} from './actionTypes'
import {
  asyncFunction, callbackFunction,
  formatToken, formatCredit,
  getBalance, getCredit,
  sutContractAddress, nttContractAddress,
  smartupWeb3, getAccount
} from '../integrator'
import {
  API_USER_LOGIN, API_USER_CURRENT, API_USER_UPDATE, API_USER_AUTH,API_USER_TRANSACTION_LIST,
  API_USER_MARKET_CREATED,API_USER_MARKET_TRADED,API_USER_POST_COLLECTED,API_USER_POST_CREATED,
  API_USER_REPLY_CREATED,API_USER_REPLY_COLLECTED,
} from './api';
import fetch from '../lib/util/fetch';
import {postIpfsImg} from './ipfs'

const STORAGE_KEY_TOKEN = 'token'
const STORAGE_KEY_ACC = 'acc'

function setStorageToken(token) {
  window.localStorage.setItem(STORAGE_KEY_TOKEN, token)
  window.localStorage.setItem(STORAGE_KEY_ACC, getAccount())
}
function getStorageToken() {
  const r = window.localStorage.getItem(STORAGE_KEY_TOKEN)
  console.log('------------ token',r);
  return r === 'undefined' ? undefined : r
}
function getStorageAccount() {
  const r = window.localStorage.getItem(STORAGE_KEY_ACC)
  return r === 'undefined' ? undefined : r
}

export function checkLogin() {
  return async dispatch => {
    const token = getStorageToken()
    if (token) {
      const [error, response] = await dispatch(loginMetaMask(true))
      if (!error) {
        dispatch({
          type: USER_PERSON_SIGN_SUCCEEDED
        })
      }
    }
  }
}

export function watchMetamask() {
  return (dispatch, getState) => {
    let accountInterval = setInterval(() => {
      const storedAccount = getStorageAccount()
      const currentAccount = getAccount()
      if (storedAccount != currentAccount && currentAccount) {
        setStorageToken()
        dispatch({ type: METAMASK_RESET })
      }
      // if (currentAccount ) dispatch( getAllBalance() )
    }, 1000)
  }
}

export function enableEthereum() {
  return asyncFunction(
    window.ethereum && window.ethereum.enable,
    LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
    { isWeb3: true, responsePayload: accounts => accounts[0] }
  )
}

export function getAllBalance() {
  return dispatch => 
    Promise.all([
      dispatch(getEthBalance()),
      dispatch(getSutBalance()),
      dispatch(getNttBalance()),
    ])
}

export function loginMetaMask(skipLogin) {
  return async (dispatch) => {
    const [error, response] = await dispatch(enableEthereum())
    if (!error) {
      await Promise.all([
        dispatch(getAllBalance()),
        dispatch(getUserInfo()),
        skipLogin !== true && dispatch(loginSmartUp()),
      ])
    }
    return [error, response]
  }
}

//get eth balance
function getEthBalance() {
  return callbackFunction(
    smartupWeb3.eth.getBalance,
    METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
    {
      isWeb3: true,
      params: getAccount(),
      responsePayload: formatToken
    }
  )
}

//get sut balance
function getSutBalance() {
  return callbackFunction(
    smartupWeb3.eth.call,
    METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
    {
      isWeb3: true,
      params: { to: sutContractAddress, data: getBalance(getAccount()) },
      responsePayload: formatToken
    }
  )
}

//get ntt balance
function getNttBalance() {
  return callbackFunction(
    smartupWeb3.eth.call,
    METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
    {
      isWeb3: true,
      params: { to: nttContractAddress, data: getCredit(getAccount()) },
      responsePayload: formatCredit
    }
  )
}

//api-login to get sign code
function loginSmartUp() {
  return async dispatch => {
    let [error, response] = await dispatch(asyncFunction(
      fetch.post,
      USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
      { isWeb3: true, params: API_USER_LOGIN, params2: { address: getAccount() } }
    ));
    if (!error) {
      dispatch(getPersonSign(response));
    }
  }
}

function authSmartUp(signature) {
  return async dispatch => {
    let [error, response] = await dispatch(asyncFunction(
      fetch.post,
      USER_AUTH_SMARTUP_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED, USER_AUTH_SMARTUP_FAILED,
      { isWeb3: true, params: API_USER_AUTH, params2: { address: getAccount(), signature }, responsePayload: reps => reps.token }
    ));
    if (!error) {
      setStorageToken(response)
      dispatch(getUserInfo())
      console.debug('Saved to token as ' + response)
    }
  }
}

//get person sign
function getPersonSign(msg) {
  return async dispatch => {
    let [error, response] = await dispatch(
      callbackFunction(
        window.web3.personal.sign,
        USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
        { params: msg, params2: getAccount() }
      )
    )
    if (!error) {
      dispatch(authSmartUp(response));
    }
  }
}

//upload image
export function onChangeAvatar(files) {
  if(!files) return {
    type: USER_AVATAR_CHANGE_SUCCEEDED,
  }
  return asyncFunction(
    postIpfsImg,
    USER_AVATAR_CHANGE_REQUESTED, USER_AVATAR_CHANGE_SUCCEEDED, USER_AVATAR_CHANGE_FAIL,
    {
      params: files[0]
    }
  )
}

//update user info
export function updateUserInfo(){
  return (dispatch,getState)=>{
    const requestParams = {
      name: getState().user.realUserName,
      avatarIpfsHash: getState().user.avatarHash,
    }
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_UPDATE_INFO_REQUESTED, USER_UPDATE_INFO_SUCCEEDED, USER_UPDATE_INFO_FAIL,
        { params: API_USER_UPDATE, params2: requestParams }
      )
    )
  }
}

//update user info
export function getUserInfo(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_CURRENT_INFO_REQUESTED, USER_CURRENT_INFO_SUCCEEDED, USER_CURRENT_INFO_FAIL,
        { params: API_USER_CURRENT }
      )
    )
  }
}

export function onChangeName(name){
  console.log('------------ name',name);
  return {
    type: USER_NAME_CHANGE,
    payload: name,
  }
}

//get user transactions
export function getUserTransactionList(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
        { params: API_USER_TRANSACTION_LIST,
          params2:{pageNumb:getState().user.transPageNumb + 1, pageSize: getState().user.pageSize}
         }
      )
    )
  }
}

//用户创建的市场
export function getCreatedMarkets(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
        { params: API_USER_MARKET_CREATED,
          params2:{pageNumb:getState().user.createdMarketsPageNumb + 1, pageSize: getState().user.pageSize}
         }
      )
    )
  }
}

//用户交易的市场
export function getTradedMarkets(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
        { params: API_USER_MARKET_TRADED,
          params2:{pageNumb:getState().user.tradedMarketsPageNumb + 1, pageSize: getState().user.pageSize}
         }
      )
    )
  }
}

//用户收藏的帖子
export function getCollectedPosts(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_POST_COLLECTED_REQUESTED, USER_POST_COLLECTED_SUCCEEDED, USER_POST_COLLECTED_FAIL,
        { params: API_USER_POST_COLLECTED,
          params2:{pageNumb:getState().user.collectedPostsPageNumb + 1, pageSize: getState().user.pageSize}
         }
      )
    )
  }
}

//用户创建的帖子
export function getCreatedPosts(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_POST_CREATED_REQUESTED, USER_POST_CREATED_SUCCEEDED, USER_POST_CREATED_FAIL,
        { params: API_USER_POST_CREATED,
          params2:{pageNumb:getState().user.createdPostsPageNumb + 1, pageSize: getState().user.pageSize}
         }
      )
    )
  }
}

//用户收藏的回复
export function getCollectedReplys(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_REPLY_COLLECTED_REQUESTED, USER_REPLY_COLLECTED_SUCCEEDED, USER_REPLY_COLLECTED_FAIL,
        { params: API_USER_REPLY_COLLECTED,
          params2:{pageNumb:getState().user.collectedReplysPageNumb + 1, pageSize: getState().user.pageSize}
         }
      )
    )
  }
}

//用户创建的回复
export function getCreatedReplys(){
  return (dispatch,getState)=>{
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_REPLY_CREATED_REQUESTED, USER_REPLY_CREATED_SUCCEEDED, USER_REPLY_CREATED_FAIL,
        { params: API_USER_REPLY_CREATED,
          params2:{pageNumb:getState().user.createdReplysPageNumb + 1, pageSize: getState().user.pageSize}
         }
      )
    )
  }
}



