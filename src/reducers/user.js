import {
  ADD_USER, METAMASK_ETH_BALANCE,UPDATE_USER_NAME,
  UPDATE_USER_AVATAR,QUERY_USER_INFO
} from '../actions/actionTypes';
import LoginIcon from '../images/menu1.svg';

const ipfsPre = 'https://ipfs.smartup.global/ipfs/';


export const initialState = {
  metaMaskHint: 'MetaMask',
  userName: 'Smart',
  userAvatar: LoginIcon,
  loggedIn: false,
  account: null,
  ethBalance: null,
  payload: null,
  queryUserInfo: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        account: action.account,
        metaMaskHint: action.metaMaskHint,
        payload: action.payload,
      });
    }
    case METAMASK_ETH_BALANCE: {
      return Object.assign({}, state, {
        ethBalance: action.ethBalance,
      });
    }
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
