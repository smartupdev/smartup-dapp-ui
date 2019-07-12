import {
  METAMASK_UPDATE,
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,

  USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
  USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
  USER_AUTH_SMARTUP_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED, USER_AUTH_SMARTUP_FAILED,

  USER_AVATAR_CHANGE_REQUESTED, USER_AVATAR_CHANGE_SUCCEEDED, USER_AVATAR_CHANGE_FAIL,
  USER_UPDATE_AVATAR_REQUESTED, USER_UPDATE_AVATAR_SUCCEEDED, USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_NAME_REQUESTED, USER_UPDATE_NAME_SUCCEEDED, USER_UPDATE_NAME_FAIL,
  USER_NAME_CHANGE, USER_NAME_SUBMITTING,
} from './actionTypes'
import {
  asyncFunction, callbackFunction, 
  getAccount,
  metamaskListener, getMetamaskInfo, 
  enableMetamask,
} from '../integrator'

import { apiLogin, apiAuth, apiGetUser } from '../integrator/api'

import { API_USER_UPDATE } from './api';
import fetch, { delay } from '../lib/util/fetch';
import { postIpfsImg } from './ipfs'
import { getAllBalance } from './wallet'

const STORAGE_KEY_TOKEN = 'token'
const STORAGE_KEY_ACC = 'acc'

function clearAccountAndToken() {
  localStorage.removeItem(STORAGE_KEY_TOKEN)
  localStorage.removeItem(STORAGE_KEY_ACC)
}

function setStorageToken(token, account) {
  window.localStorage.setItem(STORAGE_KEY_TOKEN, token)
  window.localStorage.setItem(STORAGE_KEY_ACC, account)
  console.debug(`Saved to token as ${token} with account(${account})`)
}
function getStorageToken() {
  const r = window.localStorage.getItem(STORAGE_KEY_TOKEN)
  console.debug('------------ token', r);
  return r === 'undefined' ? undefined : r
}
function getStorageAccount() {
  const r = window.localStorage.getItem(STORAGE_KEY_ACC)
  return r === 'undefined' ? undefined : r
}

/* Login process
  loginMetaMask: [MM] Enable
    => getAllBalance: [MM]
      => getEthBalance
      => getSutBalance
      => getNttBalance
    => loginSmartUp: [BE] Get sign code
      => getPersonSign: [MM] Get signature
        => getUserInfo: [BE] Get token for header, set localStorage

  watchMetamask
    => metamaskListener: [MM] add updateMetamask to listener
    => updateMetamask: [MM] init metamask data
      => [if logout or change ac1 to ac2] clearAccountAndToken
      => update redux
    => [if metamask ready] getUserInfo
    => [if metamask ready] getAllBalance
    => Looping
      => [if account exists] getAllBalance
*/
export function watchMetamask() {
  return async dispatch => {
    // update selectedAddress, isEnabled, isUnlocked
    function updateMetamask(info) {
      const storedAccount = getStorageAccount()
      const currentAccount = info.selectedAddress
      if((!currentAccount && storedAccount) || (currentAccount !== storedAccount && storedAccount)) {
        console.debug('clear storage because of logout or change ac1 to ac2')
        clearAccountAndToken()
        window.location.reload()
      }
      dispatch({
        type: METAMASK_UPDATE,
        payload: info
      })
    }
    const initMetamaskInfo = getMetamaskInfo()
    updateMetamask( initMetamaskInfo )
    metamaskListener( updateMetamask )
    const {selectedAddress, isEnabled, isUnlocked, isTargetNetwork} = initMetamaskInfo
    if(selectedAddress && isEnabled && isUnlocked && isTargetNetwork && getStorageToken()) {
      dispatch(getUserInfo())
    }
  }
}

export function enableEthereum() {
  return asyncFunction(
    enableMetamask,
    LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
    { isWeb3: true }
  )
}

export function loginMetaMask() {
  return async (dispatch) => {
    const [error] = await dispatch(enableEthereum())
    if (!error) {
      dispatch(loginSmartUp())
    }
  }
}

function loginSmartUp() {
  return async dispatch => {
    const [error, response] = await dispatch(
      asyncFunction(
        apiLogin(await getAccount()),
        USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
        { isWeb3: true }
      )
    )
    if (!error) {
      dispatch(getPersonSign(response));
    }
  }
}

function getPersonSign(msg) {
  return async dispatch => {
    let [error, response] = await dispatch(
      callbackFunction(
        window.web3.personal.sign,
        USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
        { params: msg, params2: await getAccount() }
      )
    )
    if (!error) {
      dispatch(getUserInfo(response));
    }
  }
}

function getUserInfo(signature) {
  return async dispatch => {
    dispatch(getAllBalance())
    const account = await getAccount()
    const [error, response] = await dispatch(
      asyncFunction(
        signature ? apiAuth(account, signature) : apiGetUser(),
        USER_AUTH_SMARTUP_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED, USER_AUTH_SMARTUP_FAILED,
        { isWeb3: true, responsePayload: r => signature ? r : {user: r} }
      )
    )
    if (!error && signature) {
      setStorageToken(response.token, account)
    }
  }
}

//upload image
export function onChangeAvatar(files) {
  if (!files) return {
    type: USER_AVATAR_CHANGE_SUCCEEDED,
  }
  return asyncFunction(
    () => postIpfsImg(files[0]),
    USER_AVATAR_CHANGE_REQUESTED, USER_AVATAR_CHANGE_SUCCEEDED, USER_AVATAR_CHANGE_FAIL,
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



