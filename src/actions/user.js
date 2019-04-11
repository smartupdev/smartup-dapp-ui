import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
  USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
  USER_PERSON_SIGN_REQUESTED,USER_PERSON_SIGN_SUCCEEDED,USER_PERSON_SIGN_FAILED,
  UPDATE_USER_NAME, UPDATE_USER_AVATAR, QUERY_USER_INFO,
} from './actionTypes'
import {
  asyncFunction, callbackFunction,
  formatToken, formatCredit,
  getBalance, getCredit,
  sutContractAddress, nttContractAddress,
  smartupWeb3
} from '../integrator'
import {
   API_USER_LOGIN, API_USER_CURRENT, API_USER_UPDATE
} from './api';
import ipfsClient from 'ipfs-http-client';
import toBuffer from 'blob-to-buffer';
import { Net } from '../lib/util/request';

const client = ipfsClient('ipfs-api.smartup.global', '80', { protocol: 'http' });

export function enableEthereum() {
  return asyncFunction(
    window.ethereum && window.ethereum.enable,
    LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
    { isWeb3: true, responsePayload: accounts => accounts[0] }
  )
}

export function loginMetaMask() {
  return async (dispatch, getState) => {
    const [error, response] = await dispatch(enableEthereum())
    if (!error) {
      await Promise.all([
        dispatch(getEthBalance()),
        dispatch(getSutBalance()),
        dispatch(getNttBalance()),
        dispatch(loginSmartUp()),
      ])
    }
  }
}

//get eth balance
function getEthBalance() {
  return (dispatch, getState) => {
    return dispatch(callbackFunction(
      smartupWeb3.eth.getBalance,
      METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
      {
        isWeb3: true,
        params: getState().user.account,
        responsePayload: formatToken
      }
    ))
  }
}

//get sut balance
function getSutBalance() {
  return (dispatch, getState) => {
    return dispatch(callbackFunction(
      smartupWeb3.eth.call,
      METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
      {
        isWeb3: true,
        params: { to: sutContractAddress, data: getBalance(getState().user.account) },
        responsePayload: formatToken
      }
    ))
  }
}

//get ntt balance
function getNttBalance() {
  return (dispatch, getState) => {
    return dispatch(callbackFunction(
      smartupWeb3.eth.call,
      METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
      {
        isWeb3: true,
        params: { to: nttContractAddress, data: getCredit(getState().user.account) },
        responsePayload: formatCredit
      }
    ))
  }
}

//api-login to get sign code
function loginSmartUp() {
  return async (dispatch, getState) => {
    let address = getState().user.account;
    let [error, response] = await dispatch(asyncFunction(
      Net,
      USER_LOGIN_SMARTUP_REQUESTED, USER_LOGIN_SMARTUP_SUCCEEDED, USER_LOGIN_SMARTUP_FAILED,
      { isWeb3: true, params:{api:API_USER_LOGIN, params:{address}}, responsePayload: reps => reps.obj }
    ));
    if(!error){
      //dispatch(getPersonSign(response));
    }
  }
}

//get person sign
function getPersonSign(msg){
  console.log('------------',window.web3.personal.sign);
  return async (dispatch, getState)=>{
    let account = getState().user.account;
    let [error, response] = await dispatch(asyncFunction(
      window.web3.personal.sign,
      USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
      { isWeb3: true, params:{'nonce':msg, 'public_address':account} }
    ));
    console.log('------------sign',error);
    console.log('------------sign',response);
  } 
}

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

