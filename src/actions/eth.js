import Web3 from 'web3';
import {
    ETH_SUT_BALANCE, ETH_CREATE_MARKET, ETH_GET_MARKET_BY_INDEX,
    ETH_SET_MARKET_ADDRESS, ETH_GET_CT_BALANCE, ETH_IS_TRADE_ENABLE,
    ETH_GET_MARKET_CREATOR, ETH_GET_Total_SUT, ETH_BID_QUOTE,
    ETH_ASK_QUOTE,
} from './actionTypes';

const smartupWeb3 = new Web3(window.web3.currentProvider);

//查询SUT
export function getSUTBalance(account, to) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'balanceOf',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [account]);
    return dispatch => smartupWeb3.eth.call({
        to,
        data: encodeFunc
    }, function (err, ret) {
        let sutBalance;
        if (err) {
            sutBalance = null;
        } else {
            sutBalance = smartupWeb3.utils.fromWei(ret);
        }
        dispatch({
            type: ETH_SUT_BALANCE,
            sutBalance: sutBalance,
        });
    });
}

//创建市场(from和account相同，有几个参数是什么？？？)
export function createMarket(account, to, value) {
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
    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: to,
            value: value,
            data: encodeFunc
        }, function (err, ret) {
            let marketHash;
            if (err) {
                marketHash = null;
            } else {
                marketHash = ret;
            }
            dispatch({
                type: ETH_CREATE_MARKET,
                createMarketHash: marketHash,
            });
        });
    }
}

//索引查询市场
export function getMarketByIndex(index, to) {
    const decodeIndex = smartupWeb3.eth.abi.encodeParameter('uint256', index);
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'markets',
        type: 'function',
        inputs: [
            {
                type: 'uint256',
                name: 'index'
            }
        ]
    }, [decodeIndex]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: to,
            data: encodeFunc
        }, function (err, ret) {
            let indexMarketHash;
            if (err) {
                indexMarketHash = null;
            } else {
                indexMarketHash = smartupWeb3.eth.abi.decodeParameter('address', ret);
            }
            dispatch({
                type: ETH_GET_MARKET_BY_INDEX,
                indexMarketHash: indexMarketHash,
            });
        });
    }
}

//设置市场地址
export function setMarketAddress(marketAddress) {
    return {
        type: ETH_SET_MARKET_ADDRESS,
        setMarketAddress: marketAddress,
    }
}

//CT余额查询
export function getCtBalance(matemaskAccount, marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'balanceOf',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [matemaskAccount]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let ctBalance;
            if (err) {
                ctBalance = null;
            } else {
                ctBalance = smartupWeb3.utils.fromWei(ret);
            }
            dispatch({
                type: ETH_GET_CT_BALANCE,
                ctBalance: ctBalance,
            });
        });
    }
}

//是否可以交易
export function isTradeEnabled(marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'tradeEnabled',
        type: 'function',
        inputs: []
    }, []);
    return dispatch => {
        smartupWeb3.myWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc,
        }, function (err, ret) {
            let isTradeEnabled;
            if (err) {
                isTradeEnabled = false;
            } else {
                isTradeEnabled = smartupWeb3.eth.abi.decodeParameter('bool', ret);
            }
            dispatch({
                type: ETH_IS_TRADE_ENABLE,
                isTradeEnabled: isTradeEnabled,
            });
        });
    }
}

//查询市场创建者地址
export function getMarketCreator(marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'creator',
        type: 'function',
        inputs: []
    }, []);
    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let createMarketHash;
            if (err) {
                createMarketHash = null;
            } else {
                createMarketHash = smartupWeb3.eth.abi.decodeParameter('address', ret);
            }
            dispatch({
                type: ETH_GET_MARKET_CREATOR,
                createMarketHash: createMarketHash,
            });
        });
    }
}

//查询市场总交易SUT
export function getTotalTradeSut(marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'totalTraderSut',
        type: 'function',
        inputs: []
    }, []);
    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let totalSut;
            if (err) {
                totalSut = null;
            } else {
                totalSut = smartupWeb3.utils.fromWei(ret);
            }
            dispatch({
                type: ETH_GET_Total_SUT,
                totalSut: totalSut,
            });
        });
    }
}

//查询买入价格[SUT]
export function getBidQuote(marketAddress, ctAmount) {
    const ctAmount = smartupWeb3.utils.toWei(ctAmount);
    const encodeCtAmount = smartupWeb3.eth.abi.encodeParameter('uint256', ctAmount);
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'bidQuote',
        type: 'function',
        inputs: [
            {
                type: 'uint256',
                name: 'ctAmount'
            }
        ]
    }, [encodeCtAmount]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let bidQuote;
            if (err) {
                bidQuote = null;
            } else {
                bidQuote = smartupWeb3.utils.fromWei(ret);
            }
            dispatch({
                type: ETH_BID_QUOTE,
                bidQuote: bidQuote,
            });
        });
    }
}

//查询卖出价格[SUT]
export function getAskQuote(marketAddress, ctAmount) {
    const ctAmount = smartupWeb3.utils.toWei(ctAmount);
    const encodeCtAmount = smartupWeb3.eth.abi.encodeParameter('uint256', ctAmount);
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'askQuote',
        type: 'function',
        inputs: [
            {
                type: 'uint256',
                name: 'ctAmount'
            }
        ]
    }, [encodeCtAmount]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let askQuote;
            if (err) {
                askQuote = null;
            } else {
                askQuote = smartupWeb3.utils.fromWei(ret);
            }
            dispatch({
                type: ETH_ASK_QUOTE,
                askQuote: askQuote,
            });
        });
    }
}





