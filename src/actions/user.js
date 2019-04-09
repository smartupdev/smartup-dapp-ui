import {
    ADD_USER,UPDATE_USER_NAME,UPDATE_USER_AVATAR,QUERY_USER_INFO
} from './actionTypes';
import {
    API_USER_ADD, API_USER_EXIST_ADDRESS, API_USER_QUERY, API_USER_UPDATE
} from './api';
import ipfsClient from 'ipfs-http-client';
import toBuffer from 'blob-to-buffer';
import { Net } from '../lib/util/request';

const Buffer = require('buffer/').Buffer;
const client = ipfsClient('ipfs-api.smartup.global', '80', { protocol: 'http' });

//login metamask and add user to server
export function loginMetaMask() {
    let isSupport = (typeof window.ethereum !== 'undefined'
        && typeof window.web3 !== 'undefined');
    if (!!isSupport) {
        return (dispatch, getState) => {
            window.ethereum.enable().then((accounts) => {
                window.account = accounts[0];
                dispatch({
                    type: ADD_USER,
                    loggedIn: false,
                    account: null,
                    metaMaskHint: 'MetaMask',
                    payload: {
                        status: 'loading',
                        obj: null,
                        msg: null,
                        code: null,
                    },
                });
                let params = {
                    address: window.account
                }
                Net(API_USER_ADD, params).then((res) => {
                    //getEthBalance(dispatch);
                    dispatch({
                        type: ADD_USER,
                        loggedIn: true,
                        account: window.account,
                        metaMaskHint: 'MetaMask',
                        payload: {
                            status: 'success',
                            obj: res.obj,
                            msg: res.msg,
                            code: res.code,
                        },
                    });
                }).catch(() => {
                    dispatch({
                        type: ADD_USER,
                        loggedIn: false,
                        account: null,
                        metaMaskHint: 'MetaMask',
                        payload: {
                            status: 'error',
                            obj: null,
                            msg: null,
                            code: null,
                        },
                    });
                });
            }).catch((e) => {
                dispatch({
                    type: ADD_USER,
                    loggedIn: false,
                    account: null,
                    metaMaskHint: 'MetaMask',
                    payload: {
                        status: 'error',
                        obj: null,
                        msg: null,
                        code: null,
                    },
                });
            });
        }
    } else {
        return {
            type: ADD_USER,
            loggedIn: false,
            account: null,
            metaMaskHint: 'MetaMask',
            payload: {
                status: 'error',
                obj: null,
                msg: null,
                code: null,
            },
        };
    }


}

//update user name
export function updateUserName(name) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_USER_NAME,
            payload: {
                status: 'loading',
                obj: null,
                msg: null,
                code: null,
            },
        });
        let params = {
            address: window.account,
            name: name
        }
        Net(API_USER_UPDATE, params).then((res) => {
            dispatch({
                type: UPDATE_USER_NAME,
                userName: name,
                payload: {
                    status: 'success',
                    obj: res.obj,
                    msg: res.msg,
                    code: res.code,
                },
            });
        }).catch(() => {
            dispatch({
                type: UPDATE_USER_NAME,
                payload: {
                    status: 'error',
                    obj: null,
                    msg: null,
                    code: null,
                },
            });
        });
    }
}

//update user avatar
export function updateUserAvatar(chooseImgs) {
    
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_USER_AVATAR,
            payload: {
                status: 'loading',
                obj: null,
                msg: null,
                code: null,
            },
        });
        const file = chooseImgs.files[0];
        const blob = new Blob([file], { type: file.type });
        toBuffer(blob, (err, buffer) => {
            if(err){
                dispatch({
                    type: UPDATE_USER_AVATAR,
                    payload: {
                        status: 'error',
                        obj: null,
                        msg: err,
                        code: null,
                    },
                });
            }else{
                client.add(buffer, null, function (err, ret) {
                    if (err) {
                        dispatch({
                            type: UPDATE_USER_AVATAR,
                            payload: {
                                status: 'error',
                                obj: null,
                                msg: err,
                                code: null,
                            },
                        });
                    } else {
                        if(ret && ret[0] && ret[0].hash){
                            let ipfsResult = ret[0].hash;
                            let params = {
                                address: window.account,
                                avatarIpfsHash: ipfsResult
                            }
                            Net(API_USER_UPDATE, params).then((res) => {
                                dispatch({
                                    type: UPDATE_USER_AVATAR,
                                    userAvatar: ipfsResult,
                                    payload: {
                                        status: 'success',
                                        obj: res.obj,
                                        msg: res.msg,
                                        code: res.code,
                                    },
                                });
                            }).catch(() => {
                                dispatch({
                                    type: UPDATE_USER_AVATAR,
                                    payload: {
                                        status: 'error',
                                        obj: null,
                                        msg: null,
                                        code: null,
                                    },
                                });
                            });
                        }else{
                            dispatch({
                                type: UPDATE_USER_AVATAR,
                                payload: {
                                    status: 'error',
                                    obj: null,
                                    msg: err,
                                    code: null,
                                },
                            });
                        }
                    }
                })
            }
        });
    }
}

//query user by address
export function queryUserInfo(account){
    return (dispatch, getState) => {
        dispatch({
            type: QUERY_USER_INFO,
            payload: {
                status: 'loading',
                obj: null,
                msg: null,
                code: null,
            },
        });
        let params = {
            address: account,
        }
        Net(API_USER_QUERY, params).then((res) => {
            dispatch({
                type: QUERY_USER_INFO,
                payload: {
                    status: 'success',
                    obj: res.obj,
                    msg: res.msg,
                    code: res.code,
                },
            });
        }).catch(() => {
            dispatch({
                type: QUERY_USER_INFO,
                payload: {
                    status: 'error',
                    obj: null,
                    msg: null,
                    code: null,
                },
            });
        });
    }
}

