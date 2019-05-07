import ipfsClient from 'ipfs-http-client';
import toBuffer from 'blob-to-buffer';

const client = ipfsClient('ipfs-api.smartup.global', '80', { protocol: 'http' });

export const ipfsHost = 'https://ipfs.smartup.global/ipfs/';
export function onClickTnc() {
  window.open(ipfsHost + 'QmWsxWygt8khjBkWwUoniLFPq5HU9nteJRxarPGUbWLJFV', '_blank');
}

//IPFS写入图片
export function postIpfsImg(file) {
  return new Promise((resolve, reject) => {
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



