export const apiBaseUrl = 'http://39.105.101.248:86';
const fetchTimeout = 20000

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

export function post(api, params, host) {
  return cmFetch('POST', api, params, host)
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

export const NOT_LOGIN = 'You had not logged in yet.'

async function cmFetch(method, api, params, host) {
  const r = await timeoutWrapper( () => fetch((host || apiBaseUrl) + (api[0] === '/' ? api : '/'+api), getOptions(method, params)) )
  if(!r.ok) throw new Error(r.status)
  const json = await r.json()
  if(json.code === '1') throw new Error('System Error')
  if(json.code === '2') throw new Error(json.msg || 'Custom Error')
  if(json.code === '3') throw new Error(NOT_LOGIN)
  return json.obj
}

function getOptions(method = 'GET', params) {
  const r =  {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // Origin: 'http://localhost:3000',
      // baseURL: apiBaseUrl,
      'token': window.localStorage.getItem('token')
    },
    mode: 'cors',
    // credentials: 'include',
    // cache: 'no-cache',
  }
  if(params) {
    r.body = toParams(params).slice(1)
  }
  // console.log(r)
  return r
}
