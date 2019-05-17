import {
  METAMASK_RESET,
  METAMASK_UPDATE,

  LOGIN_METAMASK_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED,
  LOGIN_METAMASK_FAILED, USER_LOGIN_SMARTUP_FAILED, USER_PERSON_SIGN_FAILED, USER_AUTH_SMARTUP_FAILED,

  METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_SUCCEEDED, 
  
  USER_AVATAR_CHANGE_REQUESTED, USER_AVATAR_CHANGE_SUCCEEDED, USER_AVATAR_CHANGE_FAIL,
  USER_UPDATE_AVATAR_REQUESTED, USER_UPDATE_AVATAR_SUCCEEDED, USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_NAME_REQUESTED, USER_UPDATE_NAME_SUCCEEDED, USER_UPDATE_NAME_FAIL,
  USER_NAME_CHANGE, USER_NAME_SUBMITTING,
} from '../actions/actionTypes';
import { userMassage } from  '../integrator/massager'

export const initialState = {
  ethBalance: null,
  sutBalance: null,
  nttBalance: null,

  account: undefined,
  loggedIn: false,
  isLoading: false,
  loginError: null, 

  metaMaskHint: 'MetaMask', // TODO: remvoe

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
  submittingName: false,
  nameHasChanged: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case METAMASK_RESET:
      return initialState
    case METAMASK_UPDATE:
      return {
        ...state,
        account: action.payload.selectedAddress
      }
    // login related
    case LOGIN_METAMASK_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_METAMASK_FAILED:
    case USER_LOGIN_SMARTUP_FAILED:
    case USER_PERSON_SIGN_FAILED:
    case USER_AUTH_SMARTUP_FAILED:
      return {
        ...state,
        isLoading: false,
        loginError: action.type
      };
    case USER_AUTH_SMARTUP_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        ...userMassage(action.payload.user),
        loginError: initialState.loginError
      }

    // balance related
    case METAMASK_ETH_BALANCE_SUCCEEDED:
      return {
        ...state,
        ethBalance: action.payload,
      };
    case METAMASK_SUT_BALANCE_SUCCEEDED:
      return {
        ...state,
        sutBalance: action.payload,
      };
    case METAMASK_NTT_BALANCE_SUCCEEDED:
      return {
        ...state,
        nttBalance: action.payload,
      };

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
    case USER_NAME_SUBMITTING:
      return {
        ...state,
        updateNameError: action.payload ? 'Username can only be changed once.' : initialState.updateNameError,
        submittingName: action.payload,
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
        submittingName:false,
        nameHasChanged: true,
      }
    case USER_UPDATE_NAME_FAIL:
      return {
        ...state,
        updatingUserInfo: false,
        updateNameError: 'Username can only be changed once.',
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
