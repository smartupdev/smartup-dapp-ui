import {
  CREATE_MARKET_REQUESTED, CREATE_MARKET_SUCCEEDED, CREATE_MARKET_FAILED,
  CREATE_MARKET_SMARTUP_REQUESTED,CREATE_MARKET_SMARTUP_SUCCEEDED,CREATE_MARKET_SMARTUP_FAILED,
  GET_MARKET_LIST, GET_MARKET_DETAIL, BOOKMARK_MARKET,
} from './actionTypes';
import { Net } from '../lib/util/request';
import fetch from '../lib/util/fetch';
import {
  API_USER_MARKET_CREATE,API_MARKET_LIST,
  API_MARKET_ONE,API_MARKET_QUERY_BY_TX_HASH,
} from './api';
import {
  asyncFunction,createMarketData,sutContractAddress,smartupWeb3, callbackFunction, getAccount
} from '../integrator'

//创建市场
export function createMarket() {
  return async (dispatch, getState) => {
    let address = getAccount()
    let [error, response] = await dispatch(callbackFunction(
      smartupWeb3.eth.sendTransaction,
      CREATE_MARKET_REQUESTED, CREATE_MARKET_SUCCEEDED, CREATE_MARKET_FAILED,
      {
        isWeb3: true,
        params: {
          from: address,
          to: sutContractAddress,
          value: '0x0',
          data: createMarketData()
        }
      }
    ));
    const createMarket = getState().createMarket
    dispatch({
      type: CREATE_MARKET_SMARTUP_SUCCEEDED,
      payload: {
        id: '99', 
        icon: null, 
        name: createMarket.name, 
        createdDateTime: 1553740797139, 
        changeAvg24h: null, 
        price: 61.75, 
        volumeAvg24h: 0, 
        pool: 0, 
        priceIn7d: [0, 0, 0, 0, 0, 0, 0], 
        overview: createMarket.desc, 
        image: null, 
        numberOfComments: 0, 
        numberOfSub: 0, 
        following: false 
      }
    })
    // if(!error){
    //   dispatch(createSmartUpMarket(response));
    // }
    console.log('------------ error', error);
    console.log('------------ response', response);
  }
}

function createSmartUpMarket(txHash){
  return (dispatch, getState) => {
    const {name, desc: description} = getState().createMarket;
    dispatch(asyncFunction(
      fetch.post,
      CREATE_MARKET_SMARTUP_REQUESTED, CREATE_MARKET_SMARTUP_SUCCEEDED, CREATE_MARKET_SMARTUP_FAILED,
      { isWeb3: true, params: API_USER_MARKET_CREATE, params2: { txHash,name,description }, responsePayload: reps => reps.obj }
    ));
  }
}

//全部市场列表<暂用,后续会有各种排序>
export function getMarketList(params) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_MARKET_LIST,
      payload: {
        status: 'loading',
        obj: null,
        msg: null,
        code: null,
      },
    });
    Net(API_MARKET_LIST, params).then((res) => {
      dispatch({
        type: GET_MARKET_LIST,
        payload: {
          status: 'success',
          obj: res.obj,
          msg: res.msg,
          code: res.code,
        },
      });
    }).catch((error) => {
      dispatch({
        type: GET_MARKET_LIST,
        payload: {
          status: 'error',
          obj: null,
          msg: error,
          code: null,
        },
      });
    });
  }
}

//市场详情
export function getMarketDetailByAddress(marketAddress) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_MARKET_DETAIL,
      payload: {
        status: 'loading',
        obj: null,
        msg: null,
        code: null,
      },
    });
    let params = {
      marketAddress: marketAddress,
    }
    Net(API_MARKET_ONE, params).then((res) => {
      dispatch({
        type: GET_MARKET_DETAIL,
        payload: {
          status: 'success',
          obj: res.obj,
          msg: res.msg,
          code: res.code,
        },
      });
    }).catch((error) => {
      dispatch({
        type: GET_MARKET_DETAIL,
        payload: {
          status: 'error',
          obj: null,
          msg: error,
          code: null,
        },
      });
    });
  }
}

export function getMarketDetailByTxHash(marketAddress) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_MARKET_DETAIL,
      payload: {
        status: 'loading',
        obj: null,
        msg: null,
        code: null,
      },
    });
    let params = {
      marketAddress: marketAddress,
    }
    Net(API_MARKET_QUERY_BY_TX_HASH, params).then((res) => {
      dispatch({
        type: GET_MARKET_DETAIL,
        payload: {
          status: 'success',
          obj: res.obj,
          msg: res.msg,
          code: res.code,
        },
      });
    }).catch((error) => {
      dispatch({
        type: GET_MARKET_DETAIL,
        payload: {
          status: 'error',
          obj: null,
          msg: error,
          code: null,
        },
      });
    });
  }
}

//创建者创建的市场列表
export function getMarketCreatedList(params) {
  // return (dispatch, getState) => {
  //   dispatch({
  //     type: GET_MARKET_CREATED_LIST,
  //     payload: {
  //       status: 'loading',
  //       obj: null,
  //       msg: null,
  //       code: null,
  //     },
  //   });
  //   Net(API_MARKET_CREATOR_CREATED, params).then((res) => {
  //     dispatch({
  //       type: GET_MARKET_CREATED_LIST,
  //       payload: {
  //         status: 'success',
  //         obj: res.obj,
  //         msg: res.msg,
  //         code: res.code,
  //       },
  //     });
  //   }).catch((error) => {
  //     dispatch({
  //       type: GET_MARKET_CREATED_LIST,
  //       payload: {
  //         status: 'error',
  //         obj: null,
  //         msg: error,
  //         code: null,
  //       },
  //     });
  //   });
  // }
}

//更新市场address<暂用，后续由服务端处理>
export function updateMarketAddress(txHash, marketAddress) {
  // return (dispatch, getState) => {
  //   let params = {
  //     txHash: txHash,
  //     marketAddress: marketAddress,
  //   }
  //   Net(API_MARKET_UPDATE_MARKET_ADDRESS, params).then((res) => {

  //   }).catch((error) => {

  //   });
  // }
}

//bookmark market
export function bookMarkMarket(recordData) {
  //after network request
  return (dispatch, getState) => {
    dispatch({
      type: BOOKMARK_MARKET,
      recordData: recordData,
    });
  }
}




