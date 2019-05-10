export const ENV_MAP = {
  production: { 
    id: 'production', 
    apiHost:  'https://node.smartup.global',  ipfsHost: 'https://ipfs.smartup.global/ipfs/', 
    alphaUrl: 'https://www.smartup.global',        shareApi: '/node/share/medium?url=/',      versionApi: '/node/get/ipfs/hash'
  }, 
  beta: { 
    id: 'beta', 
    apiHost:  'https://node-beta.smartup.global', ipfsHost: 'https://ipfs.smartup.global/ipfs/', 
    alphaUrl: 'https://www.smartup.global',       shareApi: '/node/share/medium?type=beta&url=/',       versionApi: '/node/get/ipfs/hash?type=beta'
  }, 
  dev: { 
    id: 'dev', 
    apiHost:  'http://39.105.101.248:86', ipfsHost: 'https://ipfs.smartup.global/ipfs/', 
    alphaUrl: 'http://39.105.101.248',    shareApi: '/node/share/medium??type=beta&url=/',       versionApi: '/node/get/ipfs/hash?type=beta' 
  }, 
}

export const fetchTimeout = 20000
export const TNC_HASH = 'QmUXE6LhAVCJKFYY3DsRYnxwopp5Ub94sAjVfgx73zp7zr'
export const ENV = ENV_MAP.dev
