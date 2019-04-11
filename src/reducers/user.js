import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_REQUESTED, METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_REQUESTED, METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_REQUESTED, METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
  UPDATE_USER_NAME,UPDATE_USER_AVATAR,QUERY_USER_INFO
} from '../actions/actionTypes';
import LoginIcon from '../images/menu1.svg';

const ipfsPre = 'https://ipfs.smartup.global/ipfs/';

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

  account: null,
  loggedIn: false,
  isLoading: false,
  loginError: null,

  metaMaskHint: 'MetaMask',
  userName: 'Smart',
  userAvatar: LoginIcon,
  queryUserInfo: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_METAMASK_REQUESTED:
      return {
        ...state,
        account: initialState.account,
        loggedIn: initialState.loggedIn,
        isLoading: true,
      };
    case LOGIN_METAMASK_SUCCEEDED:
      return {
        ...state,
        account: action.payload,
        loggedIn: true,
        isLoading: false,
        loginError: initialState.loginError
      };
    case LOGIN_METAMASK_FAILED:
      return {
        ...state,
        isLoading: false,
        loginError: action.payload,
      };
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
      };
    case UPDATE_USER_NAME: {
      if(action.payload.status === 'success'){
        return Object.assign({}, state, {
          userName: action.userName,
          payload: action.payload,
        });
      }
      return Object.assign({}, state, {
        payload: action.payload,
      });
    }
    case UPDATE_USER_AVATAR: {
      if(action.payload.status === 'success'){
        return Object.assign({}, state, {
          userAvatar: ipfsPre + action.userAvatar,
          payload: action.payload,
        });
      }
      return Object.assign({}, state, {
        payload: action.payload,
      });
    }
    case QUERY_USER_INFO: {
      if(action.payload.status === 'success'){
        return Object.assign({}, state, {
          queryUserInfo: action.payload.obj,
        });
      }
      return Object.assign({}, state, {
        queryUserInfo: null,
      });
    }
    case 'changeUser':
      return {
        ...state,
        name: action.payload.name
      };

    default:
      return state;
  }
};
