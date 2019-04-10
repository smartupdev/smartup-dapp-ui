import {
  GET_MARKET_LIST, GET_MARKET_CREATED_LIST, GET_MARKET_DETAIL, CREATE_MARKET, BOOKMARK_MARKET
} from './actionTypes';
import { Net } from '../lib/util/request';
import {
  API_MARKET_CREATE, API_MARKET_CREATOR_CREATED, API_MARKET_LIST, API_MARKET_ONE,
  API_MARKET_QUERY_BY_TX_HASH, API_MARKET_UPDATE_MARKET_ADDRESS
} from './api';
import Web3 from 'web3';
const smartupWeb3 = window.web3 && new Web3(window.web3.currentProvider);

//创建市场(from和account相同，有几个参数是什么？？？)
export function createMarket(account, to, value, name, description) {
  return dispatch => {
    dispatch({
      type: CREATE_MARKET,
      payload: {
        status: 'loading',
        obj: null,
        msg: null,
        code: null,
      },
    });
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
      name: 'approveAndCall',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: '_spender'
        },
        {
          type: 'uint256',
          name: '_value'
        },
        {
          type: 'bytes',
          name: '_extraData'
        }
      ]
    }, ['0xb03aba8d576c499277f7e0946d55f30a07be39be', '2500000000000000000000', '0x0000000000000000000000000000000000000000000000000000000000000001']);

    smartupWeb3.eth.sendTransaction({
      from: account,
      to: to,
      value: value,
      data: encodeFunc
    }, function (err, ret) {
      if (err) {
        dispatch({
          type: CREATE_MARKET,
          payload: {
            status: 'error',
            obj: null,
            msg: err,
            code: null,
          },
        });
      } else {
        let marketHash = ret;
        let params = {
          txHash: marketHash,
          creatorAddress: account,
          name: name,
          description: description,
        }
        Net(API_MARKET_CREATE, params).then((res) => {
          dispatch({
            type: CREATE_MARKET,
            payload: {
              status: 'success',
              obj: res.obj,
              msg: res.msg,
              code: res.code,
            },
          });
        }).catch((error) => {
          dispatch({
            type: CREATE_MARKET,
            payload: {
              status: 'error',
              obj: null,
              msg: error,
              code: null,
            },
          });
        });

      }
    });
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
  return (dispatch, getState) => {
    dispatch({
      type: GET_MARKET_CREATED_LIST,
      payload: {
        status: 'loading',
        obj: null,
        msg: null,
        code: null,
      },
    });
    Net(API_MARKET_CREATOR_CREATED, params).then((res) => {
      dispatch({
        type: GET_MARKET_CREATED_LIST,
        payload: {
          status: 'success',
          obj: res.obj,
          msg: res.msg,
          code: res.code,
        },
      });
    }).catch((error) => {
      dispatch({
        type: GET_MARKET_CREATED_LIST,
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

//更新市场address<暂用，后续由服务端处理>
export function updateMarketAddress(txHash, marketAddress) {
  return (dispatch, getState) => {
    let params = {
      txHash: txHash,
      marketAddress: marketAddress,
    }
    Net(API_MARKET_UPDATE_MARKET_ADDRESS, params).then((res) => {

    }).catch((error) => {

    });
  }
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




