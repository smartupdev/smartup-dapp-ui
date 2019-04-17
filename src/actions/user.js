import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
  USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
  USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
  USER_AUTH_SMARTUP_REQUESTED,USER_AUTH_SMARTUP_SUCCEEDED,USER_AUTH_SMARTUP_FAILED,
  UPDATE_USER_NAME, UPDATE_USER_AVATAR, QUERY_USER_INFO,
  METAMASK_RESET
} from './actionTypes'
import {
asyncFunction, callbackFunction,
formatToken, formatCredit,
  getBalance, getCredit,
  sutContractAddress, nttContractAddress,
  smartupWeb3, getAccount
} from '../integrator'
import {
  API_USER_LOGIN, API_USER_CURRENT, API_USER_UPDATE,API_USER_AUTH,
} from './api';
import ipfsClient from 'ipfs-http-client';
import toBuffer from 'blob-to-buffer';
import fetch from '../lib/util/fetch';

const client = ipfsClient('ipfs-api.smartup.global', '80', { protocol: 'http' });

const STORAGE_KEY_TOKEN = 'token'
const STORAGE_KEY_ACC = 'acc'

function setStorageToken(token) {
  window.localStorage.setItem(STORAGE_KEY_TOKEN, token)
  window.localStorage.setItem(STORAGE_KEY_ACC, getAccount())
}
function getStorageToken() {
  const r = window.localStorage.getItem(STORAGE_KEY_TOKEN)
  return r === 'undefined' ? undefined : r
}
function getStorageAccount() {
  const r = window.localStorage.getItem(STORAGE_KEY_ACC)
  return r === 'undefined' ? undefined : r
}

export function checkLogin() {
  return async dispatch => {
    const token = getStorageToken()
    if(token) {
      const [error, response] = await dispatch(loginMetaMask(true))
      if(!error) {
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
      const acc = getStorageAccount()
      const newAccount = getAccount()
      if (acc != newAccount && newAccount) {
        setStorageToken()
        dispatch({ type: METAMASK_RESET })
      }
    }, 1000);

  }
}

export function enableEthereum() {
  return asyncFunction(
    window.ethereum && window.ethereum.enable,
    LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
    { isWeb3: true, responsePayload: accounts => accounts[0] }
  )
}

export function loginMetaMask(skipLogin) {
  return async (dispatch) => {
    const [error, response] = await dispatch(enableEthereum())
    if (!error) {
      await Promise.all([
        dispatch(getEthBalance()),
        dispatch(getSutBalance()),
        dispatch(getNttBalance()),
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

function authSmartUp(signature){
  return async dispatch => {
    let [error, response] = await dispatch(asyncFunction(
      fetch.post,
      USER_AUTH_SMARTUP_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED, USER_AUTH_SMARTUP_FAILED,
      { isWeb3: true, params: API_USER_AUTH, params2: { address: getAccount(),signature }, responsePayload: reps => reps.token }
    ));
    if (!error) {
      setStorageToken(response)
      console.debug('Saved to token as '+response)
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
    if(!error) {
      dispatch(authSmartUp(response));
    }
  }  
}

// web3.personal.sign(msg, account, (err, ret) => {
//   if (err) {
//     console.log('err', err)
//   } else {
//     console.log('account: ', account)
//     console.log('msg: ', msg)
//     console.log('sign: ', ret)
//   }
// })

//update user name
export function updateUserName(name) {
  // return (dispatch, getState) => {
  //   dispatch({
  //     type: UPDATE_USER_NAME,
  //     payload: {
  //       status: 'loading',
  //       obj: null,
  //       msg: null,
  //       code: null,
  //     },
  //   });
  //   let params = {
  //     address: window.account,
  //     name: name
  //   }
  //   Net(API_USER_UPDATE, params).then((res) => {
  //     dispatch({
  //       type: UPDATE_USER_NAME,
  //       userName: name,
  //       payload: {
  //         status: 'success',
  //         obj: res.obj,
  //         msg: res.msg,
  //         code: res.code,
  //       },
  //     });
  //   }).catch(() => {
  //     dispatch({
  //       type: UPDATE_USER_NAME,
  //       payload: {
  //         status: 'error',
  //         obj: null,
  //         msg: null,
  //         code: null,
  //       },
  //     });
  //   });
  // }
}

//update user avatar
export function updateUserAvatar(chooseImgs) {

  // return (dispatch, getState) => {
  //   dispatch({
  //     type: UPDATE_USER_AVATAR,
  //     payload: {
  //       status: 'loading',
  //       obj: null,
  //       msg: null,
  //       code: null,
  //     },
  //   });
  //   const file = chooseImgs.files[0];
  //   const blob = new Blob([file], { type: file.type });
  //   toBuffer(blob, (err, buffer) => {
  //     if (err) {
  //       dispatch({
  //         type: UPDATE_USER_AVATAR,
  //         payload: {
  //           status: 'error',
  //           obj: null,
  //           msg: err,
  //           code: null,
  //         },
  //       });
  //     } else {
  //       client.add(buffer, null, function (err, ret) {
  //         if (err) {
  //           dispatch({
  //             type: UPDATE_USER_AVATAR,
  //             payload: {
  //               status: 'error',
  //               obj: null,
  //               msg: err,
  //               code: null,
  //             },
  //           });
  //         } else {
  //           if (ret && ret[0] && ret[0].hash) {
  //             let ipfsResult = ret[0].hash;
  //             let params = {
  //               address: window.account,
  //               avatarIpfsHash: ipfsResult
  //             }
  //             Net(API_USER_UPDATE, params).then((res) => {
  //               dispatch({
  //                 type: UPDATE_USER_AVATAR,
  //                 userAvatar: ipfsResult,
  //                 payload: {
  //                   status: 'success',
  //                   obj: res.obj,
  //                   msg: res.msg,
  //                   code: res.code,
  //                 },
  //               });
  //             }).catch(() => {
  //               dispatch({
  //                 type: UPDATE_USER_AVATAR,
  //                 payload: {
  //                   status: 'error',
  //                   obj: null,
  //                   msg: null,
  //                   code: null,
  //                 },
  //               });
  //             });
  //           } else {
  //             dispatch({
  //               type: UPDATE_USER_AVATAR,
  //               payload: {
  //                 status: 'error',
  //                 obj: null,
  //                 msg: err,
  //                 code: null,
  //               },
  //             });
  //           }
  //         }
  //       })
  //     }
  //   });
  // }
}

//query user by address
export function queryUserInfo(account) {
  // return (dispatch, getState) => {
  //   dispatch({
  //     type: QUERY_USER_INFO,
  //     payload: {
  //       status: 'loading',
  //       obj: null,
  //       msg: null,
  //       code: null,
  //     },
  //   });
  //   let params = {
  //     address: account,
  //   }
  //   Net(API_USER_QUERY, params).then((res) => {
  //     dispatch({
  //       type: QUERY_USER_INFO,
  //       payload: {
  //         status: 'success',
  //         obj: res.obj,
  //         msg: res.msg,
  //         code: res.code,
  //       },
  //     });
  //   }).catch(() => {
  //     dispatch({
  //       type: QUERY_USER_INFO,
  //       payload: {
  //         status: 'error',
  //         obj: null,
  //         msg: null,
  //         code: null,
  //       },
  //     });
  //   });
  // }
}

