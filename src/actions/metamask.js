import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
} from './actionTypes'
import { 
  asyncFunction, callbackFunction, 
  formatToken, formatCredit,
  getBalance, getCredit,
  sutContractAddress, nttContractAddress,
  smartupWeb3 
} from '../integrator'

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
        dispatch(getNttBalance())
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
        params: getState().metamask.account,
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
        params: { to: sutContractAddress, data: getBalance(getState().metamask.account) },
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
        params: { to: nttContractAddress, data: getCredit(getState().metamask.account) },
        responsePayload: formatCredit
      }
    ))
  }
}