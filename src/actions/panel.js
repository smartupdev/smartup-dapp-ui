import {
    METAMASK_LOGIN, METAMASK_ETH_BALANCE,
    METAMASK_ETH_TRANSACTION, PANEL_SET_ACTIVE_TAB,
    SET_EXPANDED_WALLET, SET_EXPANDED_MARKET,
    SET_EXPANDED_BOOKMARK
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

//Login MetaMask
export function loginMetaMask() {
    let isSupport = (typeof window.ethereum !== 'undefined'
        && typeof window.web3 !== 'undefined');
    if (!!isSupport) {
        return (dispatch, getState) => {
            window.ethereum.enable().then((accounts) => {
                window.account = accounts[0];
                getEthBalance(dispatch);
                dispatch({
                    type: METAMASK_LOGIN,
                    loggedIn: true,
                    account: accounts[0],
                    metaMaskHint: 'MetaMask',
                });
            }).catch((e) => {
                console.log('------------', e);
                dispatch({
                    type: METAMASK_LOGIN,
                    loggedIn: false,
                    account: null,
                    metaMaskHint: 'MetaMask',
                });
            });
        }
    } else {
        return {
            type: METAMASK_LOGIN,
            loggedIn: false,
            account: null,
            metaMaskHint: 'The browers not support MetaMask',
        }
    }


}

//获取eth余额
function getEthBalance(dispatch) {
    window.web3.eth.getBalance(window.account, (err, balance) => {
        if (err) {
            balance = null;
        } else {
            balance = window.web3.fromWei(balance, 'ether') + '';
        }
        dispatch({
            type: METAMASK_ETH_BALANCE,
            ethBalance: balance,
        });
    });
}

//转账 txHash有值表示交易成功（可以修改为回调方式）
export function ethTransaction(from, to, value) {
    return dispatch => {
        window.web3.eth.sendTransaction({
            from,
            to,
            value: window.web3.toWei(value, 'eth'),
        }, (err, txHash) => {
            if (err) {
                txHash = null;
            }
            dispatch({
                type: METAMASK_ETH_TRANSACTION,
                txHash: txHash,
            });
        });
    }

}