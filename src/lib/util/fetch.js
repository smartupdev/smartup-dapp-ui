import { ENV, fetchTimeout } from '../../config'
import { NOT_LOGIN } from '../../integrator'
import { log } from './index'
export const apiBaseUrl = ENV.apiHost

export function fakeApi(delayMs, response) {
  log.casual('Calling local fake api. Please fix this api later')
  return delay(delayMs).then(() => response)
}

export function delay(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// TODO: if the first params is null or undefined, there is error
export function toParams(params = {}) {
  return Object.keys(params).reduce((p, key, i) =>
    [null, undefined].includes(params[key]) ? p :
    `${p}${i ? '&' : '?'}${key}=${encodeURIComponent(params[key])}`
    , '')
}

export function get(api, params, host) {
  return cmFetch('GET', api + toParams(params), null, host)
}

export function post(api, params, host, contentType) {
  return cmFetch('POST', api, params, host, contentType)
}

export function put(api, params, host) {
  return cmFetch('PUT', api, params, host)
}

export function remove(api, params, host) {
  return cmFetch('DELETE', api, params, host)
}

export default { get, post, put, remove }

function timeoutWrapper (promise, timeout = fetchTimeout) {
  return Promise.race([
      promise(),
      new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), timeout)
      )
  ]);
}

async function cmFetch(method, api, params, host, contentType) {
  const r = await timeoutWrapper( () => fetch((host || apiBaseUrl) + (api[0] === '/' ? api : '/'+api), getOptions(method, params, contentType)) )
  if(!r.ok) throw new Error(r.status)
  const json = await r.json()
  if(json.code === '1') throw new Error('System Error')
  if(json.code === '2') throw new Error(json.msg || 'Custom Error')
  if(json.code === '3') throw new Error(NOT_LOGIN)
  if(json.code === '4') throw json.obj // can't throw error object with object as argument
  if(json.code !== '0') throw new Error(json.code)  
  return json.obj
}

const langMap = {
  en: 'en',
  tc: 'zh-TW',
  sc: 'zh-CN',
}
function getOptions(method = 'GET', params, contentType) {
  const r =  {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
      // Origin: 'http://localhost:3000',
      // baseURL: apiBaseUrl,
      // import { useLang, getLang } from '../../language'
      'sn-language': langMap[window.localStorage.getItem('lang')], // TODO: Remove
      'token': window.localStorage.getItem('token') // TODO: Remove
    },
    mode: 'cors',
    // credentials: 'include',
    // cache: 'no-cache',
  }
  if(params) {
    r.body = contentType === 'json' ? 
      JSON.stringify(params)
    : toParams(params).slice(1)
  }
  return r
}
