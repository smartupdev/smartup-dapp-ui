import {
    IPFS_POST_STRING, IPFS_GET_FILE,IPFS_POST_FILE,
} from '../constants/actionTypes';
import ipfsClient from 'ipfs-http-client';
import blobinfo from 'blobinfo';
import toBuffer from 'blob-to-buffer';

const Buffer = require('buffer/').Buffer;
const client = ipfsClient('ipfs-api.smartup.global', '80', { protocol: 'http' });

//IPFS写入字符串
export function postIpfsString(jsonStr) {
    return dispatch => {
        const bufferStr = new Buffer(jsonStr, 'utf8');
        client.add(bufferStr, null, function (err, ret) {
            let postResult;
            if (err) {
                postResult = null;
            } else {
                postResult = ret[0].hash;
            }
            dispatch({
                type: IPFS_POST_STRING,
                postStringHash: postResult,
            });
        });
    }
}

//IPFS获取字符串
export function getIpfsFile(hash) {
    return dispatch => {
        client.get(hash, function (err, ret) {
            let fileContent;
            if (err) {
                fileContent = null;
            }
            if (ret) {
                if (ret[0] && ret[0].content) {
                    fileContent = ret[0].content.toString('utf-8');
                } else {
                    //目录怎么处理？？？？
                    console.log('get success ', ret);
                    fileContent = null;
                }
            } else {
                fileContent = null;
            }
            dispatch({
                type: IPFS_GET_FILE,
                fileContent: fileContent,
            });
        });
    }
}

//IPFS写入图片
export function postIpfsImg(img) {
    const file = img.files[0];
    return dispatch => {
        const blob = new Blob([file], { type: file.type });
        toBuffer(blob, (err, buffer) => {
            if(err){
                dispatch({
                    type: IPFS_POST_FILE,
                    postFileHash: null,
                });
            }else{
                client.add(buffer, null, function (err, ret) {
                    let postResult;
                    if (err) {
                        postResult = null;
                    } else {
                        if(ret && ret[0] && ret[0].hash){
                            postResult = ret[0].hash;
                        }else{
                            postResult = null;
                        }
                    }
                    dispatch({
                        type: IPFS_POST_FILE,
                        postFileHash: postResult,
                    });
                })
            }
        });
    }
}

