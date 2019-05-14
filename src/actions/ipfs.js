import ipfsClient from 'ipfs-http-client'
import toBuffer from 'blob-to-buffer'
import { TNC_HASH, ENV } from '../config'

const client = ipfsClient('ipfs-api.smartup.global', ENV.protocol === 'http' ? '80' : '443', { protocol: ENV.protocol })

export const ipfsHost = ENV.ipfsHost;
export function onClickTnc() {
  window.open(ipfsHost + TNC_HASH, '_blank')
}

//IPFS写入图片
export function postIpfsImg(file) {
  return new Promise((resolve, reject) => {
    if(file.size > 5e+6) 
      return reject(new Error('File size exceeds the limit allowed(5MB).'))
    if(!['image/png', 'image/x-png','image/gif','image/jpeg'].includes(file.type)) 
      return reject(new Error('Invalid file type. Only png, gif, jpg is allowed.'))
    const blob = new Blob([file], { type: file.type });
    toBuffer(blob, (bufferError, buffer) => {
      if (bufferError) {
        reject(bufferError);
      } else {
        client.add(buffer, null, function (err, ret) {
          if (err) {
            reject(err);
          } else {
            if (ret && ret[0] && ret[0].hash) {
              resolve(ret[0].hash);
              // postResult = ret[0].hash;
            } else {
              reject('unknown error');
            }
          }
        })
      }
    });
  })
}



