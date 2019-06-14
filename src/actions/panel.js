import {
  PANEL_SET_ACTIVE_TAB,
  PANEL_TOGGLE_EXPANDED_BOOKMARK,
  PANEL_TOGGLE_EXPANDED_MARKET,
  PANEL_TOGGLE_EXPANDED_WALLET,
  PANEL_SET_OPEN,
} from './actionTypes'

export function setOpen(value) {
  return {
    type: PANEL_SET_OPEN,
    payload: value,
  }
}

export function setActiveTab(activeTabIndex) {
  return {
    type: PANEL_SET_ACTIVE_TAB,
    payload: activeTabIndex,
  }
}

export function toggleExpandedWallet() {
  return {
    type: PANEL_TOGGLE_EXPANDED_WALLET,
  }
}

export function toggleExpandedMarket() {
  return {
    type: PANEL_TOGGLE_EXPANDED_MARKET,
  }
}

export function toggleExpandedBookmark() {
  return {
    type: PANEL_TOGGLE_EXPANDED_BOOKMARK,
  }
}
