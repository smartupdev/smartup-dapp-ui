import {
  PANEL_SET_ACTIVE_TAB, SET_EXPANDED_WALLET, SET_EXPANDED_MARKET, SET_EXPANDED_BOOKMARK
} from './actionTypes';

export function setActiveTab(activeTab) {
  return {
    type: PANEL_SET_ACTIVE_TAB,
    activeTab: activeTab
  }
}

export function setExpandedWallet() {
  return {
    type: SET_EXPANDED_WALLET,
  }
}

export function setExpandedMarket() {
  return {
    type: SET_EXPANDED_MARKET,
  }
}

export function setExpandedBookmark() {
  return {
    type: SET_EXPANDED_BOOKMARK,
  }
}