import web3 from 'web3'
import { ENV, sutContractAddress, nttContractAddress, exchangeContractAddress, createMarketGasLimit, buyCtStage1GasLimit } from '../config'
import { callbackFunction } from './index'
const { smartupContractAddress, networkVersion, gasWeiPrices } = ENV 
const address0x0 = '0x0000000000000000000000000000000000000000'
const bytes0x0 = '0x0000000000000000000000000000000000000000000000000000000000000000'
const provider = web3.givenProvider // || window.ethereum || window.web3 && window.web3.currentProvider
export const smartupWeb3 = provider ? new web3(provider) : null
const {toBN, soliditySha3, sha3} = smartupWeb3 ? smartupWeb3.utils : {}

window.sut = smartupWeb3
window.web9 = web3

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
  return window.web3.fromWei(r)
}

export function toWei(r, unit) {
  return smartupWeb3 ? `${smartupWeb3.utils.toWei(r+'', unit)}` : null
}

export function encodeParam(r) {
  return smartupWeb3 ? `${smartupWeb3.eth.abi.encodeParameter('uint256', r)}` : null
}

export function decodeResult(r){
  return `${smartupWeb3.utils.fromWei(r)}`
}

export function createMarketData() {
  return encodeFunctionCall({
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
  return encodeFunctionCall({
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
  return encodeFunctionCall({
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
  return encodeFunctionCall({
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
  return encodeFunctionCall({
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

// deposit
export async function depositSut(sut) {
  const sutWei = toWei(sut)

  const data = encodeFunctionCall({
    name: 'approveAndCall',
    type: 'function',
    inputs: [ 
      { type: 'address', name: '_spender' }, 
      { type: 'uint256', name: '_value' }, 
      { type: 'bytes',   name: '_extraData'} 
    ]}, [
      exchangeContractAddress, 
      sutWei, 
      bytes0x0
    ])

  return toPromise(smartupWeb3.eth.sendTransaction, {
    from: await getAccount(),
    to: sutContractAddress,
    value: '0x0',
    data
  })
}

export async function depositEth(eth) {
  const ethWei = toWei(eth)

  const data = encodeFunctionCall({
    name: 'depositEther',
    type: 'function',
    inputs: []
  }, [])

  return toPromise(smartupWeb3.eth.sendTransaction, {
    from: await getAccount(),
    to: exchangeContractAddress,
    value: ethWei,
    data
  })
}

// get
async function getTokenBalance(address) {
  const data = encodeFunctionCall({
    name: 'tokenBalance',
    type: 'function',
    inputs: [
      { type: 'address', name: 'token' }, 
      { type: 'address', name: 'address'}
    ]
  }, [address, await getAccount()])

  return toPromise(
    smartupWeb3.eth.call, {
      to: exchangeContractAddress, 
      data
    }
  ).then(formatToken)
}

export function getSut() {
  return getTokenBalance(sutContractAddress)
}

export function getEth() {
  return getTokenBalance(address0x0)
}

export async function getWalletEth() {
  return toPromise(
    smartupWeb3.eth.getBalance, await getAccount()
  ).then(formatToken)
}
export async function getWalletSut() {
  const data =  encodeFunctionCall({
    name: 'balanceOf',
    type: 'function',
    inputs: [{ type: 'address' }]
  }, [await getAccount()])

  return toPromise(smartupWeb3.eth.call, {
    to: sutContractAddress, 
    data
  }).then(formatToken)
}
export async function getNtt() {
  const data = encodeFunctionCall({
    name: 'checkCredit',
    type: 'function',
    inputs: [{ type: 'address' }]
  }, [await getAccount()]);

  return toPromise(smartupWeb3.eth.call, {
    to: nttContractAddress, data
  }).then(r => `${decodeParameter('uint256', r)}`)
}

// withdraw
async function withdrawToken(address, amount) {
  const wei = toWei(amount)
  const data = encodeFunctionCall({
    name: 'withdraw',
    type: 'function',
    inputs: [
      { type: 'address', name: 'token' },
      { type: 'uint256', name: 'amount' }
    ]
  }, [address, wei])

  return toPromise(
    smartupWeb3.eth.sendTransaction, {
      from: await getAccount(),
      to: exchangeContractAddress,
      value: '0x0',
      data
    }
  )
}

export function withdrawSut(sut) {
  return withdrawToken(sutContractAddress, sut)
}

export function withdrawEth(eth) {
  return withdrawToken(address0x0, eth)
}

export async function createMarketSign(marketId, marketSymbol, sut, ctCount, ctPrice, ctRecyclePrice, closingTime, gasPrice) {
  const account = await getAccount()
  
  const sutWei = toWei(sut)
  const ctCountWei = toWei(ctCount)
  const ctPriceWei = toWei(ctPrice)
  const ctRecyclePriceWei = toWei(ctRecyclePrice)
  const gesFeeWei =  getGasWei(createMarketGasLimit, gasPrice)

  const hash = soliditySha3(
      account,
      toBN(sutWei),
      marketId, 
      marketSymbol,
      toBN(ctCountWei),
      toBN(ctPriceWei),
      toBN(ctRecyclePriceWei),
      gesFeeWei,
      closingTime
  );

  console.log('Request sign with the following message')
  console.table([
    ['account', account],
    ['sutWei', sutWei],
    ['marketId', marketId],
    ['symbol', marketSymbol],
    ['ctCountWei', ctCountWei],
    ['ctPriceWei', ctPriceWei],
    ['ctRecyclePriceWei', ctRecyclePriceWei],
    ['gesFeeWei', gesFeeWei+''],
    ['closingTime', closingTime],
    ['hash', hash]
  ])
  return toPromise(
    window.web3.personal.sign, 
    hash, account
  )
}

export function getMarketCt(address) {
  return toPromise(
    smartupWeb3.eth.call,
    { to: address }
  ).then(decodeResult)
}

export async function butCtStage1(useAddress, marketAddress, ctCount, gasPrice, time) {
  const ctCountWei = toWei(ctCount)
  const feeWei = getGasWei(buyCtStage1GasLimit, gasPrice)
  const timeHash = sha3(time)
  const hash = soliditySha3(
      marketAddress,
      ctCountWei,
      useAddress,
      feeWei,
      timeHash
  );
  return toPromise(
    window.web3.personal.sign,
    hash, await getAccount()  
  )
}

export function getMarketStatus(marketAddress) {
  const data = encodeFunctionCall({
      name: 'isInFirstPeriod',
      type: 'function',
      inputs: []
  }, []);

  return toPromise(
    smartupWeb3.eth.call,
    { to: marketAddress, data }
  ).then(res => decodeParameter('bool', res) ? 1 : 2 )
}

// Util
function encodeFunctionCall(...p) {
  if(!smartupWeb3) throw Error('No MetaMask')
  return smartupWeb3.eth.abi.encodeFunctionCall(...p)
} 
function decodeParameter(...p) {
  if(!smartupWeb3) throw Error('No MetaMask')
  return smartupWeb3.eth.abi.decodeParameter(...p)
} 
function getGasWei(gasLimit, gasPrice) {
  return toBN(toWei(gasPrice, "gwei")).mul( toBN(gasLimit) )
}
export function toPromise(callback, ...params) {
  return new Promise( (resolve, reject) => 
    callback(...params, (error, response) => error ? reject(error) : resolve(response))
  )
}
export function buDiv(base, divisor) {
  return toBN ? 
    toBN(base).divisor( toBN(divisor) )
  : (base/divisor) + ''
}
export function bnMul(base, times) {
  return toBN ?
    toBN(base).mul( toBN(times) ) + ''
  : (base * times) + ''
}
