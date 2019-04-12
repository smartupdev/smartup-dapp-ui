const apiBaseUrl = 'http://39.105.101.248:86';
const fetchTimeout = 20000

function toParams(params = {}) {
  return Object.keys(params).reduce((p, key, i) =>
    `${p}${i ? '&' : '?'}${key}=${params[key]}`
    , '')
}

export default {
  get: (api, params) => {
    return cmFetch('GET', api + toParams(params))
  },
  post: (api, params) => {
    return cmFetch('POST', api, params)
  },
  put: (api, params) => {
    return cmFetch('PUT', api, params)
  },
  delete: (api, params) => {
    return cmFetch('DELETE', api, params)
  }
}

function timeoutWrapper (promise, timeout = fetchTimeout) {
  return Promise.race([
      promise(),
      new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), timeout)
      )
  ]);
}

async function cmFetch(method, api, params) {
  const r = await timeoutWrapper( () => fetch(apiBaseUrl + (api[0] === '/' ? api : '/'+api), getOptions(method, params)) )
  if(!r.ok) throw new Error(r.status)
  return await r.json()
}

function getOptions(method = 'GET', params) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      token: window.localStorage.getItem('token')
    },
    // mode: 'cors',
    // cache: 'no-cache',
    body: JSON.stringify(params)
  }
}
