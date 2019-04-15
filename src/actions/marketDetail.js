import {
  SET_IS_SELL, DETAIL_MARKET_SET_TAB,TRADE_CHANGE_CT_AMOUNT
} from './actionTypes';

import { getBidQuote, getAskQuote } from './trade'

export function setActiveTab(tabIndex) {
  return {
    type: DETAIL_MARKET_SET_TAB,
    payload: tabIndex
  }
}

export function setIsSell() {
    return ({
      type: SET_IS_SELL,
    })
}

export function onChangeCtAmount(amount){
  return (dispatch, getState)=>{
    dispatch({
      type: TRADE_CHANGE_CT_AMOUNT,
      payload: amount
    });
    let isSell = getState().marketDetail.isSell;
    if(!!isSell){
      dispatch(getAskQuote(amount));
    }else{
      dispatch(getBidQuote(amount));
    }
    
  }
}