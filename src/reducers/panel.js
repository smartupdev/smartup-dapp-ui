import {
  METAMASK_LOGIN, METAMASK_ETH_BALANCE,
  METAMASK_ETH_TRANSACTION, PANEL_SET_ACTIVE_TAB,
  SET_EXPANDED_WALLET, SET_EXPANDED_MARKET,
  SET_EXPANDED_BOOKMARK,
} from '../actions/actionTypes';

export const initialState = {
  metaMaskHint: 'MetaMask',
  loggedIn: false,
  account: null,
  ethBalance: null,
  txHash: null,
  activeTab: 'portfilio',
  expandedWallet: true,
  expandedMarket: false,
  expandedBookmark: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PANEL_SET_ACTIVE_TAB:
      return Object.assign({}, state, {
        activeTab: action.activeTab,
      });
    case SET_EXPANDED_WALLET:
      return Object.assign({}, state, {
        expandedWallet: !state.expandedWallet,
      });
    case SET_EXPANDED_MARKET:
      return Object.assign({}, state, {
        expandedMarket: !state.expandedMarket,
      });
    case SET_EXPANDED_BOOKMARK:
      return Object.assign({}, state, {
        expandedBookmark: !state.expandedBookmark,
      });
    case METAMASK_LOGIN:
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        account: action.account,
        metaMaskHint: action.metaMaskHint,
      });
    case METAMASK_ETH_BALANCE:
      return Object.assign({}, state, {
        ethBalance: action.ethBalance,
      });
    case METAMASK_ETH_TRANSACTION:
      return Object.assign({}, state, {
        txHash: action.txHash,
      });
    default:
      return state;
  }
};
