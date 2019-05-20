import Logo from './images/logo.png'
import LogoGif from './images/logo_edu.gif'

export const ENV_MAP = {
  production: { 
    id: 'production', 
    apiHost:  'https://node.smartup.global',  ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'https',
    alphaUrl: 'https://www.smartup.global',   shareApi: '/node/share/medium?url=/', versionApi: '/node/get/ipfs/hash',
    smartupContractAddress: '0x184a3dad8912a81ab393b83892f2039ec0297132', networkVersion: '3',
    logo: Logo
  }, 
  beta: { 
    id: 'beta', 
    apiHost:  'https://node-beta.smartup.global', ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'https',
    alphaUrl: 'https://www.smartup.global',       shareApi: '/node/share/medium?type=beta&url=/', versionApi: '/node/get/ipfs/hash?type=beta',
    smartupContractAddress: '0x184a3dad8912a81ab393b83892f2039ec0297132', networkVersion: '3',
    logo: Logo
  }, 
  dev: { 
    id: 'dev', 
    apiHost:  'http://39.105.101.248:86', ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'http',
    alphaUrl: 'http://39.105.101.248',    shareApi: '/node/share/medium??type=beta&url=/', versionApi: '/node/get/ipfs/hash?type=beta',
    smartupContractAddress: '0x184a3dad8912a81ab393b83892f2039ec0297132', networkVersion: '3',
    logo: LogoGif
  }, 
  // uni: { 
  //   id: 'dev', 
  //   apiHost:  'http://39.105.101.248:86', ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'http',
  //   alphaUrl: 'http://39.105.101.248',    shareApi: '/node/share/medium??type=beta&url=/', versionApi: '/node/get/ipfs/hash?type=beta',
  //   smartupContractAddress: '0xfee003d3cac834b1a8d285252e22c8bb08563b8c', networkVersion: '4',
  //   logo: LogoGif
  // }, 
}

export const fetchTimeout = 20000
export const TNC_HASH = 'QmUXE6LhAVCJKFYY3DsRYnxwopp5Ub94sAjVfgx73zp7zr'

export const ENV = ENV_MAP.dev

console.log(`Using ${ENV.id}, apiHost: ${ENV.apiHost}, alphaUrl: ${ENV.alphaUrl}`)