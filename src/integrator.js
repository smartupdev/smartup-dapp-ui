import Web3 from 'web3'

export const smartupContractAddress = '0x437098700e7de348e436b809c74bb2442abd3bd6';
export const sutContractAddress = '0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03'
export const nttContractAddress = '0x846ce03199a759a183cccb35146124cd3f120548'
export const smartupWeb3 = window.web3 && new Web3(window.web3.currentProvider)

export function checkIsSupportWeb3() { 
  return typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined'
}
export function formatToken(r) { 
  return `${window.web3.fromWei(r)}`
}
export function formatCredit(r) { 
  return `${smartupWeb3.eth.abi.decodeParameter('uint256', r)}`
}

export function getBalance(account) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
   name: 'balanceOf',
   type: 'function',
   inputs: [ { type: 'address' } ]
 }, [account]);
}

export function createMarketData(){
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

export function getCredit(account) {
  return smartupWeb3.eth.abi.encodeFunctionCall({
   name: 'checkCredit',
   type: 'function',
   inputs: [ { type: 'address' } ]
 }, [account]);
}

export function asyncFunction(
  func,
  requestType, responseType, errorType,
  options = {} // isWeb3, params, responsePayload
) {
  return async dispatch => {
    dispatch({ type: requestType })
    try {
      if(options.isWeb3 && !checkIsSupportWeb3()) throw new Error('Web3 or ethereum is not supported.')
      let response = await func(options.params)
      response = options.responsePayload ? options.responsePayload(response) : response
      dispatch({
        type: responseType,
        payload: response
      })
      return [null, response]
    }
    catch(error) {
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
  options = {} // isWeb3, params, responsePayload
) {
  return async dispatch => {
    const promise = () => new Promise( (resolve, reject) => 
      func(options.params, (error, response) => {
        if(error) reject(error)
        resolve(response)
      })    
    )
    return await dispatch(asyncFunction(promise, requestType, responseType, errorType, options))

  }
}