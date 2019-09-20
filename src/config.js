import Logo from './images/logo.png'
import LogoLarge from './images/logoMobile.svg'
import LogoGif from './images/logo_edu.gif'

export const ENV_MAP = {
  // Website title in package.json
  production: { 
    id: 'production', 
    apiHost:  'https://node.smartup.global',  ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'https',
    alphaUrl: 'https://www.smartup.global',   shareApi: '/node/share/medium?url=/', versionApi: '/node/get/ipfs/hash',
    smartupContractAddress: '0x184a3dad8912a81ab393b83892f2039ec0297132', networkVersion: '3',
    txHashUrl: 'https://etherscan.io/tx/',
    gasWeiPrices: [5, 10, 20],
    logo: Logo, logoFull: LogoLarge,
    showRedux: false,
    autoUpdate: true,
  }, 
  beta: { 
    id: 'beta', 
    apiHost:  'https://node-beta.smartup.global', ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'https',
    alphaUrl: 'https://www.smartup.global',       shareApi: '/node/share/medium?type=beta&url=/', versionApi: '/node/get/ipfs/hash?type=beta',
    smartupContractAddress: '0x184a3dad8912a81ab393b83892f2039ec0297132', networkVersion: '3',
    txHashUrl: 'https://ropsten.etherscan.io/tx/',
    gasWeiPrices: [10, 30, 50],
    logo: Logo, logoFull: LogoLarge,
    showRedux: true,
    autoUpdate: true,
  }, 
  dev: { 
    id: 'dev', 
    apiHost:  'http://39.105.101.248:86', ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'http',
    alphaUrl: 'http://39.105.101.248',    shareApi: '/node/share/medium?type=beta&url=/', versionApi: '/node/get/ipfs/hash?type=beta',
    smartupContractAddress: '0x184a3dad8912a81ab393b83892f2039ec0297132', networkVersion: '3',
    txHashUrl: 'https://ropsten.etherscan.io/tx/',
    gasWeiPrices: [10, 30, 50],
    logo: Logo, logoFull: LogoLarge,
    showRedux: true,
    autoUpdate: false,
  }, 
  uni: { 
    id: 'uni', 
    apiHost:  'https://node-university.smartup.global', ipfsHost: 'https://ipfs.smartup.global/ipfs/', protocol: 'https',
    alphaUrl: 'https://www.smartup.global',       shareApi: '/node/share/medium?type=university&url=/', versionApi: '/node/get/ipfs/hash?type=university',
    smartupContractAddress: '0xfee003d3cac834b1a8d285252e22c8bb08563b8c', networkVersion: '4',
    txHashUrl: 'https://ropsten.etherscan.io/tx/',
    gasWeiPrices: [10, 30, 50],
    logo: LogoGif, logoFull: LogoLarge,
    showRedux: false,
    autoUpdate: true,
  }, 
}

export const fetchTimeout = 20000
export const TNC_HASH = 'QmUXE6LhAVCJKFYY3DsRYnxwopp5Ub94sAjVfgx73zp7zr'
// smartupContractAddress in ENV_MAP
export const sutContractAddress = '0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03'
export const nttContractAddress = '0x846ce03199a759a183cccb35146124cd3f120548'
export const exchangeContractAddress = '0xabaed2d6b739cd7b9c54c818300520592344fd96'

export const marketDeposit = 2500
export const createMarketGasLimit = 3000000
export const buyCtStage1GasLimit = 320000

const processEnv = process.env.REACT_APP_ENV

export const ENV =  ENV_MAP[processEnv] || ENV_MAP.dev

console.log(`Using ${ENV.id}, apiHost: ${ENV.apiHost}, alphaUrl: ${ENV.alphaUrl}`)