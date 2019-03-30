import { MATEMASK_STATUS, MATEMASK_LOGIN, MATEMASK_ETH_BALANCE, MATEMASK_ETH_TRANSACTION } from '../constants/actionTypes';

export const initialState = {
  isSupport: true,
  isLogin: false,
  account: null,
  balance: null,
  txHash: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MATEMASK_STATUS:
      return Object.assign({}, state, { isSupport: action.isSupport });
    case MATEMASK_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.isLogin,
        account: action.account,
      });
    case MATEMASK_ETH_BALANCE:
      return Object.assign({}, state, {
        balance: action.balance,
      });
    case MATEMASK_ETH_TRANSACTION:
      return Object.assign({}, state, {
        txHash: action.txHash,
      });
    default:
      return state;
  }
};
