const apiBaseUrl = 'http://39.105.101.248:86';
// const apiBaseUrl = 'https://jsonplaceholder.typicode.com';
const fetchTimeout = 20000

export function delay(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function toParams(params = {}) {
  return Object.keys(params).reduce((p, key, i) =>
    [null, undefined].includes(params[key]) ? p :
    `${p}${i ? '&' : '?'}${key}=${encodeURIComponent(params[key])}`
    , '')
}

export function get(api, params) {
  return cmFetch('GET', api + toParams(params))
}

export function post(api, params) {
  return cmFetch('POST', api + toParams(params))
}

export function put(api, params) {
  return cmFetch('PUT', api, params)
}

export function remove(api, params) {
  return cmFetch('DELETE', api, params)
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

async function cmFetch(method, api, params) {
  const r = await timeoutWrapper( () => fetch(apiBaseUrl + (api[0] === '/' ? api : '/'+api), getOptions(method, params)) )
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
    // body: JSON.stringify(params)
  }
  // console.log(r)
  return r
}
