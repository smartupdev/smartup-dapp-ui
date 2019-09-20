import fetch, {toParams} from './lib/util/fetch'
import { copy, log } from './lib/util'
import { ENV } from './config'

const webUrl = ENV.alphaUrl
const shareUrl = ENV.shareApi

export function checkVersion() {
  if(ENV.autoUpdate) {
    log.info('Checking new version and auto redirect to new version if any')
    fetch.get(ENV.versionApi, {}, webUrl)
    .then(r => {
      if(!window.location.pathname.includes(r))
        window.location.href = `${webUrl}${shareUrl}#/`
    })
  }
}

export function share(params, path) {
  let hash = window.location.hash
  if(params) {
    hash = hash.replace(/\?.+/, '')
    hash += toParams(params)
  }
  if(path) {
    hash = hash.replace(/[^?#]+/, path)
  }
  const shareText = `${webUrl}${shareUrl}${hash}`
  copy(shareText)
  return shareText
}