import Web3 from 'web3'
import { ENV } from '../config'

const { smartupContractAddress, networkVersion } = ENV 
export const sutContractAddress = '0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03'
export const nttContractAddress = '0x846ce03199a759a183cccb35146124cd3f120548'
export const exchangeContractAddress = '0x7d56a317ceda7083172757e88c2ba4576f9530da'
const address0x0 = '0x0000000000000000000000000000000000000000'
const bytes0x0 = '0x0000000000000000000000000000000000000000000000000000000000000000'
const provider = Web3.givenProvider // || window.ethereum || window.web3 && window.web3.currentProvider
export const smartupWeb3 = provider ? new Web3(provider) : null

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
  return window.web3.fromWei(r)
}

export function toWei(r) {
  return smartupWeb3 ? `${smartupWeb3.utils.toWei(r+'')}` : null
}

export function encodeParam(r) {
  return smartupWeb3 ? `${smartupWeb3.eth.abi.encodeParameter('uint256', r)}` : null
}

export function decodeResult(r){
  return `${smartupWeb3.utils.fromWei(r)}`
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

// Contract Method
function toPromise(callback, ...params) {
  return new Promise( (resolve, reject) => 
    callback(...params, (error, response) => error ? reject(error) : resolve(response))
  )
}
// deposit
export async function depositSut(sut) {
  const sutWei = toWei(sut)

  const data = smartupWeb3.eth.abi.encodeFunctionCall({
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
  console.log(eth)
  const ethWei = toWei(eth)

  const data = smartupWeb3.eth.abi.encodeFunctionCall({
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
  const data = smartupWeb3.eth.abi.encodeFunctionCall({
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
  const data =  smartupWeb3.eth.abi.encodeFunctionCall({
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
  const data = smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'checkCredit',
    type: 'function',
    inputs: [{ type: 'address' }]
  }, [await getAccount()]);

  return toPromise(smartupWeb3.eth.call, {
    to: nttContractAddress, data
  }).then(r => `${smartupWeb3.eth.abi.decodeParameter('uint256', r)}`)
}

// withdraw
async function withdrawToken(address, amount) {
  const wei = toWei(amount)
  const data = smartupWeb3.eth.abi.encodeFunctionCall({
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