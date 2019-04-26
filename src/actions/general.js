import {
    TOGGLE_EXPANDED_INFO,
    TOGGLE_EXPANDED_RULE,
    TOGGLE_EXPANDED_SUB
  } from './actionTypes';

  export function toggleExpandedInfo() {
    return {
      type: TOGGLE_EXPANDED_INFO,
    }
  }
  
  export function toggleExpandedRule() {
    return {
      type: TOGGLE_EXPANDED_RULE,
    }
  }
  
  export function toggleExpandedSub() {
    return {
      type: TOGGLE_EXPANDED_SUB,
    }
  }