import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
  METAMASK_RESET,
  USER_AUTH_SMARTUP_SUCCEEDED,
  USER_PERSON_SIGN_REQUESTED, USER_PERSON_SIGN_SUCCEEDED, USER_PERSON_SIGN_FAILED,
  USER_AVATAR_CHANGE_REQUESTED, USER_AVATAR_CHANGE_SUCCEEDED, USER_AVATAR_CHANGE_FAIL,
  USER_CURRENT_INFO_REQUESTED, USER_CURRENT_INFO_SUCCEEDED, USER_CURRENT_INFO_FAIL,
  USER_UPDATE_AVATAR_REQUESTED, USER_UPDATE_AVATAR_SUCCEEDED, USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_NAME_REQUESTED, USER_UPDATE_NAME_SUCCEEDED, USER_UPDATE_NAME_FAIL,
  USER_NAME_CHANGE,
} from '../actions/actionTypes';

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

  userName: '',
  realUserName: '',
  displayName: '',
  userAvatar: null,
  userAddress: null,
  gettingUserInfo: false,
  userInfoError: null,

  avatarUrl: null,
  avatarHash: '',
  avatarUploading: false,

  updatingUserInfo: false,
  updateAvatarError: null,
  updateNameError: null,
}

function userInfo(user) {
  return {
    avatarHash: user.avatarIpfsHash,
    userAvatar: user.avatarIpfsHash,
    userAddress: user.userAddress,
    userName: user.name ? user.name : user.userAddress,
    realUserName: user.name,
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
    case USER_AUTH_SMARTUP_SUCCEEDED:
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
    // case METAMASK_ETH_BALANCE_REQUESTED:
    //   return {
    //     ...state,
    //     gettingEth: true
    //   }
    case METAMASK_ETH_BALANCE_SUCCEEDED:
      return {
        ...state,
        // gettingEth: false,
        ethBalance: action.payload,
      };
    // case METAMASK_ETH_BALANCE_FAILED:
    //   return {
    //     ...state,
    //     gettingEth: false,
    //     ethError: action.payload
    //   };
    // case METAMASK_SUT_BALANCE_REQUESTED:
    //   return {
    //     ...state,
    //     gettingSut: true
    //   }
    case METAMASK_SUT_BALANCE_SUCCEEDED:
      return {
        ...state,
        // gettingSut: false,
        sutBalance: action.payload,
      };
    // case METAMASK_SUT_BALANCE_FAILED:
    //   return {
    //     ...state,
    //     gettingSut: false,
    //     sutError: action.payload
    //   };
    // case METAMASK_NTT_BALANCE_REQUESTED:
    //   return {
    //     ...state,
    //     gettingNtt: true
    //   }
    case METAMASK_NTT_BALANCE_SUCCEEDED:
      return {
        ...state,
        // gettingNtt: false,
        nttBalance: action.payload,
      };
    // case METAMASK_NTT_BALANCE_FAILED:
    //   return {
    //     ...state,
    //     gettingNtt: false,
    //     nttError: action.payload,
    //   }
    case USER_AVATAR_CHANGE_REQUESTED:
      return {
        ...state,
        avatarUploading: true
      }
    case USER_AVATAR_CHANGE_SUCCEEDED:
      return {
        ...state,
        avatarUploading: false,
        avatarHash: action.payload,
        updateAvatarError: initialState.updateAvatarError
      }
    case USER_AVATAR_CHANGE_FAIL:
      return {
        ...state,
        avatarUploading: false,
        updateAvatarError: action.payload
      }
    case USER_UPDATE_AVATAR_REQUESTED:
      return {
        ...state,
        updatingUserInfo: true
      }
    case USER_UPDATE_AVATAR_SUCCEEDED:
      return {
        ...state,
        updatingUserInfo: false,
        updateAvatarError: initialState.updateAvatarError,
        userAvatar: state.avatarHash,
      }
    case USER_UPDATE_AVATAR_FAIL:
      return {
        ...state,
        updatingUserInfo: false,
        updateAvatarError: action.payload,
      }
    case USER_UPDATE_NAME_REQUESTED:
      return {
        ...state,
        updatingUserInfo: true
      }
    case USER_UPDATE_NAME_SUCCEEDED:
      return {
        ...state,
        updatingUserInfo: false,
        updateNameError: initialState.updateNameError,
        userName: state.realUserName ? state.realUserName : state.userAddress,
      }
    case USER_UPDATE_NAME_FAIL:
      return {
        ...state,
        updatingUserInfo: false,
        updateNameError: 'User name can not change',
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
    case USER_NAME_CHANGE: {
      const error = action.payload.length < 6 || action.payload.length > 15
      return {
        ...state,
        realUserName: action.payload,
        updateNameError: error,
      }
    }
    default:
      return state;
  }
};
