import { 
  METAMASK_ETH_BALANCE_SUCCEEDED, // GET
  METAMASK_SUT_BALANCE_SUCCEEDED, 
  METAMASK_NTT_BALANCE_SUCCEEDED, 
  METAMASK_GET_PLATFORM_SUT_SUCCEEDED,
  METAMASK_GET_PLATFORM_ETH_SUCCEEDED,
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
  PANEL_PUT_ETH_INPUT_ONCHANGE, // INPUT CHANGE
  PANEL_PUT_SUT_INPUT_ONCHANGE,
  PANEL_TAKE_ETH_INPUT_ONCHANGE,
  PANEL_TAKE_SUT_INPUT_ONCHANGE,

  USER_NOTIFICATION_LIST_SUCCEEDED,
 } from '../actions/actionTypes'
import { transactionType } from '../integrator/api';

// use string as balance because number may be too large
export const initialState = {
  // Balance in MetaMask
  sutWallet: null,
  ethWallet: null,

  // Balance in the platform
  sut: null,
  sutInputDeposit: '',
  sutDepositStatus: 0, // 0 is normal, 1 is asking metamask, 2 is processing transaction
  sutDepositTxHash: null,
  sutInputWithdraw: '',
  sutWithdrawStatus: 0,
  sutWithdrawTxHash: null,

  eth: null,  
  ethInputDeposit: '',
  ethDepositStatus: 0, // 0 is normal, 1 is asking metamask, 2 is processing transaction
  ethDepositTxHash: null,
  ethInputWithdraw: '',
  ethWithdrawStatus: 0,
  ethWithdrawTxHash: null,

  ntt: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case METAMASK_ETH_BALANCE_SUCCEEDED: 
      return { ...state, ethWallet: action.payload }
    case METAMASK_SUT_BALANCE_SUCCEEDED:
      return { ...state, sutWallet: action.payload }
    case METAMASK_NTT_BALANCE_SUCCEEDED:
      return { ...state, ntt: action.payload }
    case METAMASK_GET_PLATFORM_SUT_SUCCEEDED: 
      return { ...state, sut: action.payload }
    case METAMASK_GET_PLATFORM_ETH_SUCCEEDED: 
      return { ...state, eth: action.payload }

    case PANEL_PUT_ETH_INPUT_ONCHANGE:
      return { ...state, ethInputDeposit: action.payload }
    case PANEL_PUT_SUT_INPUT_ONCHANGE:
      return { ...state, sutInputDeposit: action.payload }
    case PANEL_TAKE_ETH_INPUT_ONCHANGE:
      return { ...state, ethInputWithdraw: action.payload }
    case PANEL_TAKE_SUT_INPUT_ONCHANGE:
      return { ...state, sutInputWithdraw: action.payload }

    case METAMASK_PUT_PLATFORM_SUT_REQUESTED: 
      return { ...state, sutDepositStatus: 1 }
    case METAMASK_PUT_PLATFORM_SUT_SUCCEEDED: 
      return { ...state, sutDepositStatus: 2, sutDepositTxHash: action.payload }
    case METAMASK_PUT_PLATFORM_SUT_FAILED: 
      return { ...state, sutDepositStatus: 0 }
    case METAMASK_PUT_PLATFORM_ETH_REQUESTED: 
      return { ...state, ethDepositStatus: 1 }
    case METAMASK_PUT_PLATFORM_ETH_SUCCEEDED: 
      return { ...state, ethDepositStatus: 2, ethDepositTxHash: action.payload }
    case METAMASK_PUT_PLATFORM_ETH_FAILED: 
      return { ...state, ethDepositStatus: 0 }
    case METAMASK_TAKE_PLATFORM_SUT_REQUESTED: 
      return { ...state, sutWithdrawStatus: 1 }
    case METAMASK_TAKE_PLATFORM_SUT_SUCCEEDED: 
      return { ...state, sutWithdrawStatus: 2, sutWithdrawTxHash: action.payload }
    case METAMASK_TAKE_PLATFORM_SUT_FAILED: 
      return { ...state, sutWithdrawStatus: 0 }
    case METAMASK_TAKE_PLATFORM_ETH_REQUESTED: 
      return { ...state, ethWithdrawStatus: 1 }
    case METAMASK_TAKE_PLATFORM_ETH_SUCCEEDED: 
      return { ...state, ethWithdrawStatus: 2, ethWithdrawTxHash: action.payload }
    case METAMASK_TAKE_PLATFORM_ETH_FAILED: 
      return { ...state, ethWithdrawStatus: 0 }

    case USER_NOTIFICATION_LIST_SUCCEEDED:
      const ethDepositUpdated = action.payload.list.some(l => l.type.includes(transactionType.depositEth) && l.content.txHash === state.ethDepositTxHash && l.content.isSuccess)
      const sutDepositUpdated = action.payload.list.some(l => l.type.includes(transactionType.depositSut) && l.content.txHash === state.sutDepositTxHash && l.content.isSuccess)
      const ethWithdrawUpdated = action.payload.list.some(l => l.type.includes(transactionType.withdrawEth) && l.content.txHash === state.ethWithdrawTxHash && l.content.isSuccess)
      const sutWithdrawUpdated = action.payload.list.some(l => l.type.includes(transactionType.withdrawSut) && l.content.txHash === state.sutWithdrawTxHash && l.content.isSuccess)
      return {
        ...state,
        ...ethDepositUpdated && { eth: +state.eth + +state.ethInputDeposit + '', ethWallet: +state.ethWallet - +state.ethInputDeposit + '', ethDepositTxHash: initialState.ethDepositTxHash, ethDepositStatus: initialState.ethDepositStatus, ethInputDeposit: initialState.ethInputDeposit },
        ...sutDepositUpdated && { sut: +state.sut + +state.sutInputDeposit + '', ethWallet: +state.sutWallet - +state.sutInputDeposit + '', sutDepositTxHash: initialState.sutDepositTxHash, sutDepositStatus: initialState.sutDepositStatus, sutInputDeposit: initialState.sutInputDeposit },
        ...ethWithdrawUpdated && { eth: +state.eth - state.ethInputWithdraw + '', ethWallet: +state.ethWallet + +state.ethInputWithdraw + '', ethWithdrawTxHash: initialState.ethWithdrawTxHash, ethWithdrawStatus: initialState.ethWithdrawStatus, ethInputWithdraw: initialState.ethInputWithdraw },
        ...sutWithdrawUpdated && { sut: +state.sut - state.sutInputWithdraw + '', ethWallet: +state.sutWallet + +state.sutInputWithdraw + '', sutWithdrawTxHash: initialState.sutWithdrawTxHash, sutWithdrawStatus: initialState.sutWithdrawStatus, sutInputWithdraw: initialState.sutInputWithdraw },
      }
    default:
      return state
  }
}
