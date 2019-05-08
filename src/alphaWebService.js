import fetch, {toParams} from './lib/util/fetch'
import { copy } from './lib/util'

const webUrl = 'http://39.105.101.248'
const shareUrl = '/node/share/medium?url=/'

export function checkVersion() {
  if(process.env.NODE_ENV === 'production') {
    fetch.get('/node/get/ipfs/hash', {}, webUrl)
    .then(r => 
      !window.location.pathname.includes(r) && 
      (window.location.href = `${webUrl}${shareUrl}#/`)
    )
  }
}

export function share(params) {
  let hash = window.location.hash
  if(params) {
    hash = window.location.hash.replace(/\?.+/, '')
    hash += toParams(params)
  }
  const shareText = `${webUrl}${shareUrl}${hash}`
  copy(shareText)
  console.log(shareText)
  return shareText
}