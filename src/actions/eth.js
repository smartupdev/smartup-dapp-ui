import Web3 from 'web3';
import {
    ETH_SUT_BALANCE, ETH_CREATE_MARKET, ETH_GET_MARKET_BY_INDEX,
    ETH_SET_MARKET_ADDRESS, ETH_GET_CT_BALANCE, ETH_IS_TRADE_ENABLE,
    ETH_GET_MARKET_CREATOR, ETH_GET_Total_SUT, ETH_BID_QUOTE,
    ETH_ASK_QUOTE, DISPUTE_MARKET_STATE, DISPUTE_NEXT_FLAGGABLE_DATE,
    DISPUTE_CREATE, DISPUTE_FLAGGING_PERIOD, DISPUTE_JUROR_VOTE,
    DISPUTE_JUROR_VOTE_DONE, DISPUTE_DONE, DISPUTE_JUROR_LIST, DISPUTE_JUROR_VOTES,
    DISPUTE_APPEAL_ROUND, DISPUTE_APPEALING_PERIOD, DISPUTE_DO_APPEAL,
    DISPUTE_MARKET_DISSOLVE, PROPOSED_DO_PROPOSED, PROPOSED_CURRENT_AMOUNT,
    PROPOSED_AMOUNT, PROPOSED_VOTING_PERIOND, PROPOSED_DO_VOTE,
    PROPOSED_JURORS, PROPOSED_VOTES, PROPOSED_VOTE_DONE
} from '../constants/actionTypes';

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
        smartupWeb3.eth.call({
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

//争议Dispute
//市场状态
export function getMarketState(marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'state',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: smartupContractAddress,
            data: encodeFunc
        }, function (err, ret) {
            let marketState;
            if (err) {
                marketState = null;
            } else {
                marketState = smartupWeb3.eth.abi.decodeParameter('uint8', ret);
                console.log('市场状态(0 Active, 1 Voting, 2 Dissolving, 3 Dissolved):  ', marketState);
            }
            dispatch({
                type: DISPUTE_MARKET_STATE,
                marketState: marketState,
            });
        });
    }
}

//允许下次争议开始的时间
export function getNextFlaggableDate(marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'nextFlaggableDate',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let nextFlaggableDate;
            if (err) {
                nextFlaggableDate = null;
            } else {
                let timestamp = smartupWeb3.eth.abi.decodeParameter('uint256', ret);
                nextFlaggableDate = new Date(timestamp * 1000);
                console.log('允许下次争议开始的时间为', time);
            }
            dispatch({
                type: DISPUTE_NEXT_FLAGGABLE_DATE,
                nextFlaggableDate: nextFlaggableDate,
            });
        });
    }

}

//发起争议
export function createDispute(account, marketAddress, smartupContractAddress, sutAmount) {
    const sutAmountWei = smartupWeb3.utils.toWei(sutAmount);
    const extraData = '0x0000000000000000000000' + marketAddress.substr(2, 40) + '02';
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'approveAndCall',
        type: 'function',
        inputs: [
            {
                type: 'address'
            },
            {
                type: 'uint256'
            },
            {
                type: 'bytes'
            }
        ]
    }, [smartupContractAddress, sutAmountWei, extraData]);
    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: sutContractAddress,
            value: '0x0',
            data: encodeFunc,
        }, function (err, ret) {
            let createDisputeHash;
            if (err) {
                createDisputeHash = null;
            } else {
                createDisputeHash = ret;
            }
            dispatch({
                type: DISPUTE_CREATE,
                createDisputeHash: createDisputeHash,
            });
        });
    }
}

//本次争议的开始时间和结束时间
export function getFlaggingPeriod(marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'flaggingPeriod',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let flaggingPeriod;
            if (err) {
                flaggingPeriod = null;
            } else {
                const timestamps = smartupWeb3.eth.abi.decodeParameters(['uint256', 'uint256'], ret);
                const start = new Date(timestamps[0] * 1000);
                const end = new Date(timestamps[1] * 1000);
                flaggingPeriod = {
                    start, end,
                }
                console.log('本次争议的开始时间和结束时间为', start, end);
            }
            dispatch({
                type: DISPUTE_FLAGGING_PERIOD,
                flaggingPeriod: flaggingPeriod,
            });
        });
    }

}

//争议陪审员投票
export function jurorVote(account, smartupContractAddress, vote) {
    let decodeVote;
    if (vote === 'true' || vote === true) {
        decodeVote = true;
    } else {
        decodeVote = false;
    }
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'vote',
        type: 'function',
        inputs: [
            {
                type: 'address'
            },
            {
                type: 'bool'
            }
        ]
    }, [marketAddress, decodeVote]);
    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let jurorVoteHash;
            if (err) {
                jurorVoteHash = null
            } else {
                jurorVoteHash = ret;
                console.log('陪审员投票成功，交易hash为：', ret);
            }
            dispatch({
                type: DISPUTE_JUROR_VOTE,
                jurorVoteHash: jurorVoteHash,
            });
        });
    }

}

//陪审员投票完成
export function jurorVoteDone(account, marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'conclude',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let jurorVoteDoneHash;
            if (err) {
                jurorVoteDoneHash = null;
            } else {
                jurorVoteDoneHash = ret;
                console.log('结束投票，交易hash为：', ret);
            }
            dispatch({
                type: DISPUTE_JUROR_VOTE_DONE,
                jurorVoteDoneHash: jurorVoteDoneHash,
            });
        });
    }

}

//争议完结
export function disputeDone(account, marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'closeFlagging',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let disputeDone;
            if (err) {
                disputeDone = null;
            } else {
                disputeDone = ret;
                console.log('结束争议，交易hash为：', ret);
            }
            dispatch({
                type: DISPUTE_DONE,
                disputeDone: disputeDone,
            });
        });
    }

}

//争议陪审员列表
export function getJurorList(marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'jurorList',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let jurorList;
            if (err) {
                jurorList = null;
            } else {
                jurorList = smartupWeb3.eth.abi.decodeParameter('address[]', ret)
                console.log('陪审员列表为', jurorList);
            }
            dispatch({
                type: DISPUTE_JUROR_LIST,
                jurorList: jurorList,
            });
        });
    }

}

//争议陪审员的投票
export function getJurorVotes(marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'jurorVotes',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let jurorVotes;
            if (err) {
                jurorVotes = null;
            } else {
                jurorVotes = smartupWeb3.eth.abi.decodeParameter('uint8[]', ret)
                console.log('陪审员投票列表为', jurorVotes);
            }
            dispatch({
                type: DISPUTE_JUROR_VOTES,
                jurorVotes: jurorVotes,
            });
        });
    }

}

//已上诉的次数
export function getAppealRound(marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'appealRound',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);
    return dispatch => {
        smartupWeb3.eth.call({
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let appealRound;
            if (err) {
                appealRound = null;
            } else {
                appealRound = smartupWeb3.eth.abi.decodeParameter('uint8', ret);
                console.log('已投票的次数为', appealRound);
            }
            dispatch({
                type: DISPUTE_APPEAL_ROUND,
                appealRound: appealRound,
            });
        });
    }

}

//上诉的开始时间和结束时间
export function getAppealingPeriod(marketAddress, smartupContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'appealingPeriod',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);

    return dispatch => {
        smartupWeb3.eth.call({
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let appealingPeriod;
            if (err) {
                appealingPeriod = null;
            } else {
                let timestamps = smartupWeb3.eth.abi.decodeParameters(['uint256', 'uint256'], ret);
                let start = new Date(timestamps[0] * 1000);
                let end = new Date(timestamps[1] * 1000);
                appealingPeriod = {
                    start, end,
                }
                console.log('上诉的开始时间和结束时间为', appealingPeriod);
            }
            dispatch({
                type: DISPUTE_APPEALING_PERIOD,
                appealingPeriod: appealingPeriod,
            });

        });
    }

}

//上诉
export function doAppeal(account, marketAddress, smartupContractAddress, sutContractAddress) {
    const sutAmountWei = smartupWeb3.utils.toWei('2500');
    const extraData = '0x0000000000000000000000' + marketAddress.substr(2, 40) + '03';

    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'approveAndCall',
        type: 'function',
        inputs: [
            {
                type: 'address'
            },
            {
                type: 'uint256'
            },
            {
                type: 'bytes'
            }
        ]
    }, [smartupContractAddress, sutAmountWei, extraData]);

    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: sutContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let doAppealHash;
            if (err) {
                doAppealHash = null;
            } else {
                doAppealHash = ret;
                console.log('上诉成功，交易hash为：', ret);
            }
            dispatch({
                type: DISPUTE_DO_APPEAL,
                doAppealHash: doAppealHash,
            });
        });
    }

}

//解散市场
export function marketDissolve(account, marketAddress, smartupContractAddress, sutContractAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'dissolve',
        type: 'function',
        inputs: [
            {
                type: 'address'
            }
        ]
    }, [marketAddress]);

    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: smartupContractAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let marketDissolveHash;
            if (err) {
                marketDissolveHash = null;
            } else {
                marketDissolveHash = ret;
                console.log('解散市场成功，交易hash为：', ret);
            }
            dispatch({
                type: DISPUTE_MARKET_DISSOLVE,
                marketDissolveHash: marketDissolveHash,
            });
        });
    }

}

//提案Proposed
//发起提案
export function doProposed(account, marketAddress, amount) {
    const amountWei = smartupWeb3.utils.toWei(amount);

    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'proposePayout',
        type: 'function',
        inputs: [
            {
                type: 'uint256'
            }
        ]
    }, [amountWei]);

    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: marketAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let doProposedHash;
            if (err) {
                doProposedHash = null;
            } else {
                doProposedHash = ret;
                console.log('发起提案成功，交易hash为：', ret);
            }
            dispatch({
                type: PROPOSED_DO_PROPOSED,
                doProposedHash: doProposedHash,
            });
        });
    }

}

//当前提案的金额
export function getCurrentProposedAmount(marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'proposedPayoutAmount',
        type: 'function',
        inputs: []
    }, []);

    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let currentProposedAmount;
            if (err) {
                currentProposedAmount = null;
            } else {
                currentProposedAmount = smartupWeb3.utils.fromWei(smartupWeb3.eth.abi.decodeParameter('uint256', ret));
                console.log('当前提案的金额为', currentProposedAmount);
            }
            dispatch({
                type: PROPOSED_CURRENT_AMOUNT,
                currentProposedAmount: currentProposedAmount,
            });
        });
    }

}

//总提案的金额
export function getProposedAmount(marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'totalPaidSut',
        type: 'function',
        inputs: []
    }, []);

    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let proposedAmount;
            if (err) {
                proposedAmount = null;
            } else {
                proposedAmount = smartupWeb3.utils.fromWei(smartupWeb3.eth.abi.decodeParameter('uint256', ret));
                console.log('总提案的金额为', proposedAmount);
            }
            dispatch({
                type: PROPOSED_AMOUNT,
                proposedAmount: proposedAmount,
            });
        });
    }

}

//提案投票时间
export function getProposedVotingPeriod(marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'votingPeriod',
        type: 'function',
        inputs: []
    }, []);

    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let proposedVotingPeriod;
            if (err) {
                proposedVotingPeriod = null;
            } else {
                const timeArr = smartupWeb3.eth.abi.decodeParameters(['uint256', 'uint256'], ret);
                const start = new Date(parseInt(timeArr[0]) * 1000);
                const end = new Date(parseInt(timeArr[1]) * 1000);
                proposedVotingPeriod = {
                    start, end,
                }
                console.log('提案投票时间为 ', proposedVotingPeriod);
            }
            dispatch({
                type: PROPOSED_VOTING_PERIOND,
                proposedVotingPeriod: proposedVotingPeriod,
            });
        });
    }

}

//提案投票
export function doProposedVote(account, marketAddress, vote) {
    let decodeVote;
    if (vote === true || vote === 'true') {
        decodeVote = true
    } else {
        decodeVote = false
    }

    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'vote',
        type: 'function',
        inputs: [
            {
                type: 'bool'
            }
        ]
    }, [decodeVote]);

    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: marketAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let doProposedVoteHash;
            if (err) {
                doProposedVoteHash = null;
            } else {
                doProposedVoteHash = ret;
                console.log('提案投票成功，交易hash为：', ret);
            }
            dispatch({
                type: PROPOSED_DO_VOTE,
                doProposedVoteHash: doProposedVoteHash,
            });
        });
    }

}

//查询提案陪审员
export function getProposedJurors(marketAddress) {

    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'jurors',
        type: 'function',
        inputs: []
    }, []);

    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let proposedJurors;
            if (err) {
                proposedJurors = null;
            } else {
                proposedJurors = smartupWeb3.eth.abi.decodeParameter('address[]', ret);
                console.log('提案陪审员为', proposedJurors);
            }
            dispatch({
                type: PROPOSED_JURORS,
                proposedJurors: proposedJurors,
            });
        });
    }

}

//查询提案陪审员的投票
export function getProposedVote(marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'jurorVotes',
        type: 'function',
        inputs: []
    }, []);

    return dispatch => {
        smartupWeb3.eth.call({
            to: marketAddress,
            data: encodeFunc
        }, function (err, ret) {
            let proposedVotes;
            if (err) {
                proposedVotes = null;
            } else {
                proposedVotes = smartupWeb3.eth.abi.decodeParameter('uint8[]', ret);
                console.log('陪审员投票为', proposedVotes);
            }
            dispatch({
                type: PROPOSED_VOTES,
                proposedVotes: proposedVotes,
            });
        });
    }

}

//投票完结
export function proposedVoteDone(account, marketAddress) {
    const encodeFunc = smartupWeb3.eth.abi.encodeFunctionCall({
        name: 'conclude',
        type: 'function',
        inputs: []
    }, []);

    return dispatch => {
        smartupWeb3.eth.sendTransaction({
            from: account,
            to: marketAddress,
            value: '0x0',
            data: encodeFunc
        }, function (err, ret) {
            let proposedVoteDoneHash;
            if (err) {
                proposedVoteDoneHash = null;
            } else {
                proposedVoteDoneHash = ret;
                console.log('提案投票完结，交易hash为：', ret);
            }
            dispatch({
                type: PROPOSED_VOTE_DONE,
                proposedVoteDoneHash: proposedVoteDoneHash,
            });
        });
    }

}





