import Web3 from 'web3'
import { NOT_LOGIN } from './lib/util/fetch'
import { USER_PERSON_SIGN_FAILED } from './actions/actionTypes'

import { ENV } from './config'
import { getRawLang } from './language'

const { smartupContractAddress, networkVersion } = ENV 
export const sutContractAddress = '0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03'
export const nttContractAddress = '0x846ce03199a759a183cccb35146124cd3f120548'
const provider = Web3.givenProvider // || window.ethereum || window.web3 && window.web3.currentProvider
export const smartupWeb3 = provider ? new Web3(provider) : null

const NO_ACCOUNT = 'Please connect to metamask.'
window.sut = smartupWeb3
window.web9 = Web3

export function getAccount() {
  if(smartupWeb3) {
    return smartupWeb3.eth.getAccounts().then(a => a[0] && a[0].toLocaleLowerCase()) // MM bug
  }
  return undefined;
};

export function checkIsSupportWeb3() {
  return !!smartupWeb3
}
export function formatToken(r) {
  return `${window.web3.fromWei(r)}`
}
export function formatCredit(r) {
  return `${smartupWeb3.eth.abi.decodeParameter('uint256', r)}`
}

export function toWei(r) {
  return smartupWeb3 ? `${smartupWeb3.utils.toWei(r)}` : null
}

export function encodeParam(r) {
  return smartupWeb3 ? `${smartupWeb3.eth.abi.encodeParameter('uint256', r)}` : null
}

export function decodeResult(r){
  return `${smartupWeb3.utils.fromWei(r)}`
}

export function getBalance(account) {
  return account && smartupWeb3 && smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'balanceOf',
    type: 'function',
    inputs: [{ type: 'address' }]
  }, [account]);
}

export function createMarketData() {
  return smartupWeb3 && smartupWeb3.eth.abi.encodeFunctionCall({
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
  options = {} // isWeb3, params, responsePayload, meta
) {
  return async dispatch => {
    const lang = getRawLang()
    requestType && dispatch({ type: requestType, meta: options.meta })
    try {
      if (options.isWeb3 && !checkIsSupportWeb3()) throw new Error('Web3 or ethereum is not supported.')
      if(options.loginRequired && !await getAccount()) throw new Error(lang.error.noAccount)
      let response = await func(...[options.params, options.params2])
      response = options.responsePayload ? options.responsePayload(response) : response
      responseType && dispatch({
        type: responseType,
        payload: response,
        meta: options.meta
      })
      return [null, response]
    }
    catch (error) {
      console.error(error, options.params)
      if(error.message === NOT_LOGIN || error.message === NO_ACCOUNT) 
        if(error.message === NOT_LOGIN) error.message = lang.error.notLogin // Update error msg to other language
        dispatch({ 
          type: USER_PERSON_SIGN_FAILED, 
          meta: options.meta, 
          payload: error, 
          error: true
        })
      errorType && dispatch({
        type: errorType,
        payload: error, //error.message.include('{"') ? new Error(JSON.parse(error.message.match(/{.+}/g)[0]).message) : error,
        meta: options.meta,
        error: true
      })
      return [error]
    }
  }
}

export function callbackFunction(
  func,
  requestType, responseType, errorType,
  options = {} // isWeb3, params, responsePayload, params2, meta, loginRequired
) {
  return async dispatch => {
    const promise = () => new Promise((resolve, reject) => {
      const f = () => func(...[options.params, options.params2], (error, response) => {
        if (error) reject(error)
        resolve(response)
      })
      if(func instanceof Promise) return f().catch(e => reject(e) )
      return f()
    }
    )
    return await dispatch(asyncFunction(promise, requestType, responseType, errorType, options))
  }
}

// ========= my new start =========
// function noop() {}

function metamaskMassage(r) {
  return { ...r, isTargetNetwork: r.networkVersion === networkVersion } // '3' old, '4' new
}

// callback = ({ isEnabled<bool>, isUnlocked<bool>, networkVersion<string>, onboardingcomplete<bool>, selectedAddress<string>, }) => { do sth }
export function metamaskListener(callback = console.log) {
  if(!provider) return null
  provider.publicConfigStore
  .on('update', r => callback(metamaskMassage(r)))
}
export function getMetamaskInfo() {
  if(!provider) return {}
  return metamaskMassage(provider.publicConfigStore.getState())
}
export function enableMetamask() {
  if(!provider) return null
  return window.ethereum && window.ethereum.enable().then( accounts => { 
    if(!accounts) throw new Error('No account')
    return accounts
  })
}
