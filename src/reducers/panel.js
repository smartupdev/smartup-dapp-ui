import {
  PANEL_SET_ACTIVE_TAB,
  PANEL_TOGGLE_EXPANDED_BOOKMARK,
  PANEL_TOGGLE_EXPANDED_MARKET,
  PANEL_TOGGLE_EXPANDED_WALLET,
  PANEL_SET_OPEN,
} from '../actions/actionTypes'

export const initialState = {
  activeTabIndex: 0,
  expandedWallet: true,
  expandedMarket: false,
  expandedBookmark: false,
  didOpen: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PANEL_SET_OPEN:
      return {
        ...state,
        didOpen: action.payload,
      }
    case PANEL_SET_ACTIVE_TAB:
      return {
        ...state,
        activeTabIndex: action.payload,
      }
    case PANEL_TOGGLE_EXPANDED_WALLET:
      return {
        ...state,
        expandedWallet: !state.expandedWallet,
      }
    case PANEL_TOGGLE_EXPANDED_MARKET:
      return {
        ...state,
        expandedMarket: !state.expandedMarket,
      }
    case PANEL_TOGGLE_EXPANDED_BOOKMARK:
      return {
        ...state,
        expandedBookmark: !state.expandedBookmark,
      }
    default:
      return state
  }
}
