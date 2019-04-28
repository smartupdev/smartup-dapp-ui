import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
  METAMASK_RESET,
  USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
  USER_AVATAR_CHANGE_REQUESTED, USER_AVATAR_CHANGE_SUCCEEDED, USER_AVATAR_CHANGE_FAIL,
  USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
  USER_CURRENT_INFO_REQUESTED, USER_CURRENT_INFO_SUCCEEDED, USER_CURRENT_INFO_FAIL,
  USER_UPDATE_INFO_REQUESTED, USER_UPDATE_INFO_SUCCEEDED, USER_UPDATE_INFO_FAIL,
} from '../actions/actionTypes';

import { ipfsHost } from '../actions/ipfs'

export const initialState = {
  ethBalance: null,
  gettingEth: false,
  ethError: null,

  sutBalance: null,
  gettingSut: false,
  sutError: null,

  nttBalance: null,
  gettingNtt: false,
  nttError: null,

  // metaMaskEnabled: false,

  account: undefined,
  loggedIn: false,
  isLoading: false,
  metaMaskEableError: null,
  metaMaskSignError: null,

  metaMaskHint: 'MetaMask',

  updatingUserInfo: false,
  updateError: null,

  userName: '',
  userAvatar: null,
  userAddress: null,
  gettingUserInfo: false,
  userInfoError: null,

  avatarUrl: null,
  avatarHash: '',
  avatarUploading: false,
  error: {
    avatar: null,
  },

  trancations: [],
  gettingTrancation: false,
  trancationError: null,
  pageNumb: 0,
  pageSize: 10,
  hasNextPage: true,
  /*交易列表
  type = CreateMarket, detail = {sut}
　type = BuyCT, detail = {sut, ct}
　type = SellCT, detail = {sut(stage==fail ? null:sut), ct}
  [
      {
        "txHash": "0x6cd23afbadf99b82075eb2e79bce253d234c93f477acfd85899d35e8e6077368",
        "stage": "success",
        "type": "CreateMarket",
        "userAddress": "0x8028012ef4b5Aceba7778aFbdF1757018Af1eEe8",
        "marketId": "2l93abj7zsw",
        "marketAddress": "0xFe404e75bfAceF095F7F7180484b0E1a651d967A",
        "marketName": "Market 3",
        "detail": {
          "sut": 2500
        },
        "createTime": "2019-04-28 15:13:27",
        "blockTime": "2019-04-28 15:14:36"
      }
    ]
  */
}

function hashToAvatar(hash) {
  return {
    avatarHash: hash,
    avatarUrl: hash ? ipfsHost + hash : initialState.avatarUrl
  }
}

function userInfo(user) {
  return {
    avatarHash: user.avatarIpfsHash,
    avatarUrl: user.avatarIpfsHash ? ipfsHost + user.avatarIpfsHash : initialState.avatarUrl,
    userAvatar: user.avatarIpfsHash ? ipfsHost + user.avatarIpfsHash : initialState.avatarUrl,
    userAddress: user.userAddress,
    userName: user.name ? user.name : user.userAddress,
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case METAMASK_RESET:
      return initialState
    case LOGIN_METAMASK_REQUESTED:
      return {
        ...state,
        loggedIn: false,
        isLoading: true,
      };
    case LOGIN_METAMASK_SUCCEEDED:
      return {
        ...state,
        account: action.payload,
        metaMaskEableError: initialState.metaMaskEableError
      };
    case LOGIN_METAMASK_FAILED:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        metaMaskEableError: true,
      };
    case USER_PERSON_SIGN_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        metaMaskSignError: initialState.metaMaskSignError
      }
    case USER_PERSON_SIGN_FAILED:
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        metaMaskSignError: true
      }
    case METAMASK_ETH_BALANCE_REQUESTED:
      return {
        ...state,
        gettingEth: true
      }
    case METAMASK_ETH_BALANCE_SUCCEEDED:
      return {
        ...state,
        gettingEth: false,
        ethBalance: action.payload,
      };
    case METAMASK_ETH_BALANCE_FAILED:
      return {
        ...state,
        gettingEth: false,
        ethError: action.payload
      };
    case METAMASK_SUT_BALANCE_REQUESTED:
      return {
        ...state,
        gettingSut: true
      }
    case METAMASK_SUT_BALANCE_SUCCEEDED:
      return {
        ...state,
        gettingSut: false,
        sutBalance: action.payload,
      };
    case METAMASK_SUT_BALANCE_FAILED:
      return {
        ...state,
        gettingSut: false,
        sutError: action.payload
      };
    case METAMASK_NTT_BALANCE_REQUESTED:
      return {
        ...state,
        gettingNtt: true
      }
    case METAMASK_NTT_BALANCE_SUCCEEDED:
      return {
        ...state,
        gettingNtt: false,
        nttBalance: action.payload,
      };
    case METAMASK_NTT_BALANCE_FAILED:
      return {
        ...state,
        gettingNtt: false,
        nttError: action.payload,
      }
    case USER_AVATAR_CHANGE_REQUESTED:
      return {
        ...state,
        avatarUploading: true
      }
    case USER_AVATAR_CHANGE_SUCCEEDED:
      return {
        ...state,
        avatarUploading: false,
        ...hashToAvatar(action.payload),
        error: action.payload
          ? { ...state.error, avatar: initialState.error.avatar }
          : state.error
      }
    case USER_AVATAR_CHANGE_FAIL:
      return {
        ...state,
        avatarUploading: false
      }
    case USER_UPDATE_INFO_REQUESTED:
      return {
        ...state,
        updatingUserInfo: true
      }
    case USER_UPDATE_INFO_SUCCEEDED:
      return {
        ...state,
        updatingUserInfo: false,
        updateError: initialState.updateError,
        userAvatar: state.avatarUrl,
        userName: state.userName,
      }
    case USER_UPDATE_INFO_FAIL:
      return {
        ...state,
        updatingUserInfo: false,
        updateError: action.payload,
      }
    case USER_CURRENT_INFO_REQUESTED:
      return {
        ...state,
        gettingUserInfo: true
      }
    case USER_CURRENT_INFO_SUCCEEDED:
      return {
        ...state,
        gettingUserInfo: false,
        ...userInfo(action.payload),
        userInfoError: initialState.userInfoError,
      }
    case USER_CURRENT_INFO_FAIL:
      return {
        ...state,
        gettingUserInfo: false,
        userInfoError: action.payload,
      }
    case USER_TRANSACTION_LIST_REQUESTED:
      return {
        ...state,
        gettingTrancation: true,
      }
    case USER_TRANSACTION_LIST_SUCCEEDED: {
      const { list: trancationList, pageNumb, pageSize, hasNextPage } = action.payload;
      let tempTrancations = state.trancations.concat(trancationList);
      return {
        ...state,
        trancations: tempTrancations,
        gettingTrancation: false,
        pageNumb, pageSize, hasNextPage,
        trancationError: initialState.trancationError,
      }
    }
    case USER_TRANSACTION_LIST_FAIL:
      return {
        ...state,
        gettingTrancation: false,
        trancationError: action.payload,
      }
    default:
      return state;
  }
};
