import { MATEMASK_STATUS, MATEMASK_LOGIN,MATEMASK_ETH_BALANCE,MATEMASK_ETH_TRANSACTION } from './actionTypes';

//是否安装MateMask插件
export function isSupportMateMask(){
    let isSupport = (typeof window.ethereum !== 'undefined' 
    && typeof window.web3 !== 'undefined');
    console.log('isSupportMateMask',isSupport);
    return {
        type: MATEMASK_STATUS,
        isSupport: isSupport,
    }
}

export function loginMateMask(){
    return dispatch => {
        window.ethereum.enable().then((accounts) => {
            dispatch({
                type: MATEMASK_LOGIN,
                isLogin: true,
                account : accounts[0],
            });
          }).catch((e)=> {
            dispatch({
                type: MATEMASK_LOGIN,
                isLogin: false,
                account : null,
            });
          });
    }
}

//获取eth余额
export function getEthBalance(account) {
    return dispatch => {
        window.web3.getBalance(account, (err, balance) => {
            if (err) {
                balance = null;
            } else {
                balance = weindow.web3.fromWei(balance, 'ether') + ' ETH';
            }
            dispatch({
                type: MATEMASK_ETH_BALANCE,
                balance: balance,
            });
        });
    }
}

//转账 txHash有值表示交易成功（可以修改为回调方式）
export function ethTransaction(from,to,value){
    return dispatch => {
        window.web3.eth.sendTransaction({
            from,
            to,
            value: window.web3.toWei(value, 'eth'),
        },(err, txHash) => {
            if (err) {
                txHash = null;
            }
            dispatch({
                type: MATEMASK_ETH_TRANSACTION,
                txHash: txHash,
            });
        });
    }

}