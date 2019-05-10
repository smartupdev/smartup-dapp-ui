import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  // METAMASK_ETH_BALANCE_REQUESTED, 
  METAMASK_ETH_BALANCE_SUCCEEDED,
  // METAMASK_ETH_BALANCE_FAILED,
  // METAMASK_SUT_BALANCE_REQUESTED, 
  METAMASK_SUT_BALANCE_SUCCEEDED,
  // METAMASK_SUT_BALANCE_FAILED,
  // METAMASK_NTT_BALANCE_REQUESTED, 
  METAMASK_NTT_BALANCE_SUCCEEDED,
  // METAMASK_NTT_BALANCE_FAILED,
  USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
  USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
  USER_AUTH_SMARTUP_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED, USER_AUTH_SMARTUP_FAILED,
  // METAMASK_RESET,
  USER_AVATAR_CHANGE_REQUESTED, USER_AVATAR_CHANGE_SUCCEEDED, USER_AVATAR_CHANGE_FAIL,
  USER_UPDATE_AVATAR_REQUESTED, USER_UPDATE_AVATAR_SUCCEEDED, USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_NAME_REQUESTED, USER_UPDATE_NAME_SUCCEEDED, USER_UPDATE_NAME_FAIL,
  USER_CURRENT_INFO_REQUESTED, USER_CURRENT_INFO_SUCCEEDED, USER_CURRENT_INFO_FAIL,
  USER_NAME_CHANGE, USER_NAME_SUBMITTING,
} from './actionTypes'
import {
  asyncFunction, callbackFunction,
  formatToken, formatCredit,
  getBalance, getCredit,
  sutContractAddress, nttContractAddress,
  smartupWeb3, getAccount,
} from '../integrator'
import {
  API_USER_LOGIN, API_USER_CURRENT, API_USER_UPDATE, API_USER_AUTH,
} from './api';
import fetch, { delay } from '../lib/util/fetch';
import { postIpfsImg } from './ipfs'

const STORAGE_KEY_TOKEN = 'token'
const STORAGE_KEY_ACC = 'acc'

function setStorageToken(token, account = getAccount()) {
  window.localStorage.setItem(STORAGE_KEY_TOKEN, token)
  window.localStorage.setItem(STORAGE_KEY_ACC, account)
}
function getStorageToken() {
  const r = window.localStorage.getItem(STORAGE_KEY_TOKEN)
  console.log('------------ token', r);
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
      const [error] = await dispatch(loginMetaMask(true))
      dispatch(watchMetamask())
      if (!error) {
        dispatch({
          type: USER_AUTH_SMARTUP_SUCCEEDED
        })
      }
    }
  }
}

export function watchMetamask() {
  return async (dispatch, getState) => {
    while (true) {
      const storedAccount = getStorageAccount()
      const currentAccount = getAccount()
      if (currentAccount) await dispatch(getAllBalance())
      // eslint-disable-next-line
      if (storedAccount != currentAccount) {
        if ( !currentAccount || (storedAccount && currentAccount) ) {
          window.localStorage.clear()
          window.location.reload()
        } else {
          setStorageToken()
        }
      }
      await delay(1000)
    }
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
/* Login process
  loginMetaMask: [Metamask] Enable
    => getAllBalance: [Metamask]
      => getEthBalance
      => getSutBalance
      => getNttBalance
    => loginSmartUp: [BE] Get sign code
      => getPersonSign: [Metamask] Get signature
        => authSmartUp: [BE] Get token for header, set localStorage
          => getUserInfo: [BE]

  checkLogin [if have token]
    => loginMetaMask
      => getAllBalance
      => NO loginSmartUp
      => getUserInfo
  watchMetamask [if account change]
    => Clear token
    => Update account
    => Reset
*/
export function loginMetaMask(skipLogin) {
  return async (dispatch) => {
    const [error, response] = await dispatch(enableEthereum())
    if (!error) {
      await Promise.all([
        dispatch(getAllBalance()),
        skipLogin === true && dispatch(getUserInfo()),
        skipLogin !== true && dispatch(loginSmartUp()),
      ])
    }
    return [error, response]
  }
}

//get eth balance
function getEthBalance() {
  return async (dispatch, getState) => dispatch(
    callbackFunction(
      smartupWeb3.eth.getBalance,
      null, null, null,
      {
        isWeb3: true,
        params: getAccount(),
        responsePayload: formatToken
      }
    )
    )
  .then( ([error, response]) => 
    !error && response !== getState().user.ethBalance && dispatch({
      type: METAMASK_ETH_BALANCE_SUCCEEDED,
      payload: response
    })
  )
}

//get sut balance
function getSutBalance() {
  return async (dispatch, getState) => dispatch(
    callbackFunction(
      smartupWeb3.eth.call,
      null, null, null,
      {
        isWeb3: true,
        params: { to: sutContractAddress, data: getBalance(getAccount()) },
        responsePayload: formatToken
      }
    )
    )
  .then( ([error, response]) => 
    !error && response !== getState().user.sutBalance && dispatch({
      type: METAMASK_SUT_BALANCE_SUCCEEDED,
      payload: response
    })
  )
}

//get ntt balance
function getNttBalance() {
  return async (dispatch, getState) => dispatch(
    callbackFunction(
      smartupWeb3.eth.call,
      null, null, null,
      {
        isWeb3: true,
        params: { to: nttContractAddress, data: getCredit(getAccount()) },
        responsePayload: formatCredit
      }
  )
      )
  .then( ([error, response]) => 
    !error && response !== getState().user.nttBalance && dispatch({
      type: METAMASK_NTT_BALANCE_SUCCEEDED,
      payload: response
    })
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
  if (!files) return {
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

//update user avatar
export function updateUserAvatar() {
  return (dispatch, getState) => {
    const requestParams = {
      avatarIpfsHash: getState().user.avatarHash,
    }
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_UPDATE_AVATAR_REQUESTED, USER_UPDATE_AVATAR_SUCCEEDED, USER_UPDATE_AVATAR_FAIL,
        { params: API_USER_UPDATE, params2: requestParams }
      )
    )
  }
}

//update user name
export function updateUserName() {
  return (dispatch, getState) => {
    const requestParams = {
      name: getState().user.realUserName,
    }
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_UPDATE_NAME_REQUESTED, USER_UPDATE_NAME_SUCCEEDED, USER_UPDATE_NAME_FAIL,
        { params: API_USER_UPDATE, params2: requestParams }
      )
    )
  }
}

//update user info
export function getUserInfo() {
  return (dispatch, getState) => {
    return dispatch(
      asyncFunction(
        fetch.post,
        USER_CURRENT_INFO_REQUESTED, USER_CURRENT_INFO_SUCCEEDED, USER_CURRENT_INFO_FAIL,
        { params: API_USER_CURRENT }
      )
    )
  }
}

export function onChangeName(name) {
  return {
    type: USER_NAME_CHANGE,
    payload: name,
  }
}

export function onChangeNameSubmit(submitting) {
  return {
    type: USER_NAME_SUBMITTING,
    payload: submitting,
  }
}



