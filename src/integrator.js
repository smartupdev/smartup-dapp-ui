import Web3 from 'web3'
import { NOT_LOGIN } from './lib/util/fetch'
import { USER_PERSON_SIGN_FAILED } from './actions/actionTypes'

export const smartupContractAddress = '0x1bff1dc00bb838187e104400d7e9128d93db5313';
export const sutContractAddress = '0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03'
export const nttContractAddress = '0x846ce03199a759a183cccb35146124cd3f120548'
export const smartupWeb3 = window.web3 && new Web3(window.web3.currentProvider)
window.sut = smartupWeb3

export const getAccount = () => {
  if (window.web3) {
    return window.web3.eth.accounts[0];
  }
  return undefined;
};

export function checkIsSupportWeb3() {
  return typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined'
}
export function formatToken(r) {
  return `${window.web3.fromWei(r)}`
}
export function formatCredit(r) {
  return `${smartupWeb3.eth.abi.decodeParameter('uint256', r)}`
}

export function toWei(r) {
  return `${smartupWeb3.utils.toWei(r)}`
}

export function encodeParam(r) {
  return `${smartupWeb3.eth.abi.encodeParameter('uint256', r)}`
}

export function decodeResult(r){
  return `${smartupWeb3.utils.fromWei(r)}`
}

export function getBalance(account) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'balanceOf',
    type: 'function',
    inputs: [{ type: 'address' }]
  }, [account]);
}

export function createMarketData() {
  return smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'approveAndCall',
    type: 'function',
    inputs: [
      {
        type: 'address',
        name: '_spender'
      },
      {
        type: 'uint256',
        name: '_value'
      },
      {
        type: 'bytes',
        name: '_extraData'
      }
    ]
  }, [smartupContractAddress, '2500000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000001']);
}

export function createBidCtData({ marketAddress, encodeCtPrice, encodeCtAmount }) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'approveAndCall',
    type: 'function',
    inputs: [
      {
        type: 'address',
        name: '_spender'
      },
      {
        type: 'uint256',
        name: '_value'
      },
      {
        type: 'bytes',
        name: '_extraData'
      }
    ]
  }, [marketAddress, encodeCtPrice, encodeCtAmount]);
}

export function createBidQuoteData(encodeCtAmount) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'bidQuote',
    type: 'function',
    inputs: [
        {
            type: 'uint256',
            name: 'ctAmount'
        }
    ]
}, [encodeCtAmount]);
}

export function createAskQuoteData(encodeCtAmount) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'askQuote',
    type: 'function',
    inputs: [
        {
            type: 'uint256',
            name: 'ctAmount'
        }
    ]
}, [encodeCtAmount]);
}

export function createAskCtData(decodeCtAmount) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'sell',
    type: 'function',
    inputs: [
        {
            type: 'uint256',
            name: 'ctAmount'
        }
    ]
}, [decodeCtAmount]);
}

export function getCredit(account) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'checkCredit',
    type: 'function',
    inputs: [{ type: 'address' }]
  }, [account]);
}

export function asyncFunction(
  func,
  requestType, responseType, errorType,
  options = {} // isWeb3, params, responsePayload
) {
  return async (dispatch, getState) => {
    dispatch({ type: requestType })
    try {
      if (options.isWeb3 && !checkIsSupportWeb3()) throw new Error('Web3 or ethereum is not supported.')
      let response = await func(...[options.params, options.params2])
      response = options.responsePayload ? options.responsePayload(response) : response
      dispatch({
        type: responseType,
        payload: response
      })
      return [null, response]
    }
    catch (error) {
      if(error.message === NOT_LOGIN) dispatch({ type: USER_PERSON_SIGN_FAILED, payload: error, error: true })
      dispatch({
        type: errorType,
        payload: error,
        error: true
      })
      return [error]
    }
  }
}

export function callbackFunction(
  func,
  requestType, responseType, errorType,
  options = {} // isWeb3, params, responsePayload, params2
) {
  return async dispatch => {
    const promise = () => new Promise((resolve, reject) =>
      func(...[options.params, options.params2], (error, response) => {
        if (error) reject(error)
        resolve(response)
      })
    )
    return await dispatch(asyncFunction(promise, requestType, responseType, errorType, options))

  }
}