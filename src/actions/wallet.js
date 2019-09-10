import {
  METAMASK_ETH_BALANCE_SUCCEEDED, // GET
  METAMASK_SUT_BALANCE_SUCCEEDED, 
  METAMASK_NTT_BALANCE_SUCCEEDED, 
  METAMASK_GET_PLATFORM_ETH_SUCCEEDED, 
  METAMASK_GET_PLATFORM_SUT_SUCCEEDED,
  METAMASK_PUT_PLATFORM_SUT_REQUESTED, // PUT
  METAMASK_PUT_PLATFORM_SUT_SUCCEEDED,
  METAMASK_PUT_PLATFORM_SUT_FAILED,
  METAMASK_PUT_PLATFORM_ETH_REQUESTED,
  METAMASK_PUT_PLATFORM_ETH_SUCCEEDED,
  METAMASK_PUT_PLATFORM_ETH_FAILED,
  METAMASK_TAKE_PLATFORM_SUT_REQUESTED, // TAKE
  METAMASK_TAKE_PLATFORM_SUT_SUCCEEDED,
  METAMASK_TAKE_PLATFORM_SUT_FAILED,
  METAMASK_TAKE_PLATFORM_ETH_REQUESTED,
  METAMASK_TAKE_PLATFORM_ETH_SUCCEEDED,
  METAMASK_TAKE_PLATFORM_ETH_FAILED,
  PANEL_PUT_ETH_INPUT_ONCHANGE, // ONCHANGE
  PANEL_PUT_SUT_INPUT_ONCHANGE,
  PANEL_TAKE_ETH_INPUT_ONCHANGE,
  PANEL_TAKE_SUT_INPUT_ONCHANGE,
} from './actionTypes'

import {
  asyncFunction, 
  getWalletEth, getWalletSut, getNtt, getEth, getSut,
  depositEth, depositSut, withdrawEth, withdrawSut
} from '../integrator'

import { transactionType, apiGetTransactionList, apiAddTransaction } from '../integrator/api'
import { action } from './actionHelper'
import { log } from '../lib/util'

export function getAllBalance() {
  return dispatch => {
    dispatch(asyncFunction(getWalletSut, null, METAMASK_SUT_BALANCE_SUCCEEDED))
    dispatch(asyncFunction(getWalletEth, null, METAMASK_ETH_BALANCE_SUCCEEDED))
    dispatch(asyncFunction(getNtt, null, METAMASK_NTT_BALANCE_SUCCEEDED))
    dispatch(asyncFunction(getEth, null, METAMASK_GET_PLATFORM_ETH_SUCCEEDED))
    dispatch(asyncFunction(getSut, null, METAMASK_GET_PLATFORM_SUT_SUCCEEDED))
  }
}

export function onChangeSutDeposit(value) { return action(PANEL_PUT_SUT_INPUT_ONCHANGE, value) }
export function onChangeEthDeposit(value) { return action(PANEL_PUT_ETH_INPUT_ONCHANGE, value) }
export function onChangeSutWithdraw(value) { return action(PANEL_TAKE_SUT_INPUT_ONCHANGE, value) }
export function onChangeEthWithdraw(value) { return action(PANEL_TAKE_ETH_INPUT_ONCHANGE, value) }

function transaction(getAmount, metamaskFunction, req, res, err, apiType ) {
  return (dispatch, getState) => {
    const amount = getAmount(getState())
    return dispatch(
      asyncFunction(
        () => metamaskFunction(amount), 
        req, res, err,
      )
    )
    .then( ([ error, txHash ]) => !error && apiAddTransaction({ type: apiType, txHash, amount })() )
    .catch(log.error)
  }
}

export function onDepositEth() {
  return transaction(
    s => s.wallet.ethInputDeposit, 
    depositEth, 
    METAMASK_PUT_PLATFORM_ETH_REQUESTED, METAMASK_PUT_PLATFORM_ETH_SUCCEEDED, METAMASK_PUT_PLATFORM_ETH_FAILED,
    transactionType.depositEth
  )
}

export function onDepositSut() {
  return transaction(
    s => s.wallet.sutInputDeposit,
    depositSut,
    METAMASK_PUT_PLATFORM_SUT_REQUESTED, METAMASK_PUT_PLATFORM_SUT_SUCCEEDED, METAMASK_PUT_PLATFORM_SUT_FAILED,
    transactionType.depositSut
  )
}

export function onWithdrawEth() {
  return transaction(
    s => s.wallet.ethInputWithdraw,
    withdrawEth,
    METAMASK_TAKE_PLATFORM_ETH_REQUESTED, METAMASK_TAKE_PLATFORM_ETH_SUCCEEDED, METAMASK_TAKE_PLATFORM_ETH_FAILED,
    transactionType.withdrawEth
  )
}

export function onWithdrawSut() {
  return transaction(
    s => s.wallet.sutInputWithdraw,
    withdrawSut,
    METAMASK_TAKE_PLATFORM_SUT_REQUESTED, METAMASK_TAKE_PLATFORM_SUT_SUCCEEDED, METAMASK_TAKE_PLATFORM_SUT_FAILED,
    transactionType.withdrawSut
  )
}