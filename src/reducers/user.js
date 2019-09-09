import {
  METAMASK_UPDATE,

  LOGIN_METAMASK_REQUESTED, USER_AUTH_SMARTUP_SUCCEEDED,
  LOGIN_METAMASK_FAILED, USER_LOGIN_SMARTUP_FAILED, USER_PERSON_SIGN_FAILED, USER_AUTH_SMARTUP_FAILED,

  USER_UPDATE_REQUESTED, USER_UPDATE_SUCCEEDED, USER_UPDATE_FAIL,
} from '../actions/actionTypes';
import { userMassage } from  '../integrator/massager'

export const initialState = {
  metaMaskHint: 'MetaMask', // TODO: remvoe
  
  loggedIn: false,
  isLoading: false,
  loginError: null, 

  address: undefined,
  name: '',
  displayName: '', // username || user address
  avatarHash: null,

  userInfoUpdating: false,
  userInfoError: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case METAMASK_UPDATE:
      return {
        ...state,
        address: action.payload.selectedAddress
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
      }
    case USER_AUTH_SMARTUP_SUCCEEDED:
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
        loginError: initialState.loginError,
        ...userMassage(action.payload.user),
      }

    case USER_UPDATE_REQUESTED:
      return {
        ...state,
        userInfoUpdating: true,
        userInfoError: initialState.userInfoError,
      }
    case USER_UPDATE_SUCCEEDED:
      return {
        ...state,
        name: action.meta.username || state.name,
        displayName: action.meta.username || state.displayName,
        avatarHash: action.meta.avatarHash,
        userInfoUpdating: false,
      }
    case USER_UPDATE_FAIL:
      return {
        ...state,
        userInfoUpdating: false,
        userInfoError: action.payload,
      }
    default:
      return state;
  }
};
