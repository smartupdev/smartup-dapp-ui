import {
  LOGIN_METAMASK_REQUESTED, LOGIN_METAMASK_SUCCEEDED, LOGIN_METAMASK_FAILED,
  METAMASK_ETH_BALANCE_SUCCEEDED, METAMASK_ETH_BALANCE_FAILED,
  METAMASK_SUT_BALANCE_SUCCEEDED, METAMASK_SUT_BALANCE_FAILED,
  METAMASK_NTT_BALANCE_SUCCEEDED, METAMASK_NTT_BALANCE_FAILED,
} from './actionTypes';
import Web3 from 'web3';

const sutContractAddress = '0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03';
const nttContractAddress = '0x846ce03199a759a183cccb35146124cd3f120548';
const smartupWeb3 = new Web3(window.web3.currentProvider);

// login in metamask
export function loginMetaMask() {
  let isSupport = (typeof window.ethereum !== 'undefined' && typeof window.web3 !== 'undefined');
  if (!!isSupport) {
    return (dispatch, getState) => {
      dispatch({
        type: LOGIN_METAMASK_REQUESTED,
        payload: {},
        error: false,
        meta: null
      });
      window.ethereum.enable().then((accounts) => {
        window.account = window.web3.eth.accounts[0];
        getEthBalance(dispatch);
        getSutBalance(dispatch);
        getNttBalance(dispatch);
        dispatch({
          type: LOGIN_METAMASK_SUCCEEDED,
          payload: {
            account: accounts[0],
          },
          error: false,
          meta: null
        });
      }).catch((errorMsg) => {
        dispatch({
          type: LOGIN_METAMASK_FAILED,
          payload: {
            msg: errorMsg
          },
          error: true,
          meta: null
        });
      });
    }
  } else {
    return {
      type: LOGIN_METAMASK_FAILED,
      payload: {
        msg: 'Please install or enable the MetaMask browser plug-in from Metamask.io (clickable URL)'
      },
      error: true,
      meta: null
    };
  }
}

//get eth balance
function getEthBalance(dispatch) {
  window.web3.eth.getBalance(window.account, (err, balance) => {
    if (err) {
      dispatch({
        type: METAMASK_ETH_BALANCE_FAILED,
        payload: {
          msg: err
        },
        error: true,
        meta: null
      });
    } else {
      const ethBalance = window.web3.fromWei(balance, 'ether') + '';
      console.log('------------eth balance', ethBalance);
      dispatch({
        type: METAMASK_ETH_BALANCE_SUCCEEDED,
        payload: {
          ethBalance: ethBalance
        },
        error: false,
        meta: null
      });
    }
  });
}

//get sut balance
function getSutBalance(dispatch) {
  const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'balanceOf',
    type: 'function',
    inputs: [
      {
        type: 'address'
      }
    ]
  }, [window.account]);
  smartupWeb3.eth.call({
    to: sutContractAddress,
    data: encodeFunc
  }, function (err, ret) {
    if (err) {
      dispatch({
        type: METAMASK_SUT_BALANCE_FAILED,
        payload: {
          msg: err
        },
        error: true,
        meta: null
      });
    } else {
      const balance = smartupWeb3.utils.fromWei(ret) + '';
      console.log('------------ sut balance', balance);
      dispatch({
        type: METAMASK_SUT_BALANCE_SUCCEEDED,
        payload: {
          sutBalance: balance
        },
        error: false,
        meta: null
      });
    }
  });
}

//get ntt balance
function getNttBalance(dispatch) {
  const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
    name: 'checkCredit',
    type: 'function',
    inputs: [
      {
        type: 'address'
      }
    ]
  }, [window.account]);
  smartupWeb3.eth.call({
    to: nttContractAddress,
    data: encodeFunc
  }, function (err, ret) {
    if (err) {
      dispatch({
        type: METAMASK_NTT_BALANCE_FAILED,
        payload: {
          msg: err
        },
        error: true,
        meta: null
      });
    } else {
      const balance = smartupWeb3.eth.abi.decodeParameter('uint256', ret) + '';
      console.log('------------ ntt balance', balance);
      dispatch({
        type: METAMASK_NTT_BALANCE_SUCCEEDED,
        payload: {
          nttBalance: balance
        },
        error: false,
        meta: null
      });
    }
  });
}