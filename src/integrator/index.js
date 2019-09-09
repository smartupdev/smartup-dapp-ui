import { getAccount, checkIsSupportWeb3 } from './wallet'
// import { getRawLang } from '../language'
import { USER_PERSON_SIGN_FAILED } from '../actions/actionTypes'

export const NOT_LOGIN = 'notLogin'
export const NO_WALLET = 'noWallet'
export const NO_ACCOUNT = 'noAccount'

export async function checkAuth() {
  if(!checkIsSupportWeb3()) throw new Error(NO_WALLET)
  else if(!await getAccount()) throw new Error(NO_ACCOUNT)
}

export function asyncFunction(
  func,
  requestType, responseType, errorType,
  options = {} // isWeb3, params, responsePayload, meta
) {
  return async dispatch => {
    requestType && dispatch({ type: requestType, meta: options.meta })
    try {
      if (options.isWeb3 && !checkIsSupportWeb3()) throw new Error(NO_WALLET)
      if(options.loginRequired && !await getAccount()) throw new Error(NOT_LOGIN)
      let response = await func(...[options.params, options.params2])
      response = options.responsePayload ? options.responsePayload(response) : response
      responseType && dispatch({
        type: responseType,
        payload: response,
        meta: options.meta
      })
      return [null, response]
    }
    catch (error) {
      console.error(error, options.params)
      errorType && dispatch({
        type: errorType,
        payload: error, //error.message.include('{"') ? new Error(JSON.parse(error.message.match(/{.+}/g)[0]).message) : error,
        meta: options.meta,
        error: true
      })
      return [error]
    }
  }
}

export function callbackFunction(
  func,
  requestType, responseType, errorType,
  options = {} // isWeb3, params, responsePayload, params2, meta, loginRequired
) {
  return async dispatch => {
    const promise = () => new Promise((resolve, reject) => {
      const f = () => func(...[options.params, options.params2], (error, response) => {
        if (error) reject(error)
        resolve(response)
      })
      if(func instanceof Promise) return f().catch(e => reject(e) )
      return f()
    }
    )
    return await dispatch(asyncFunction(promise, requestType, responseType, errorType, options))
  }
}

export * from './api'
export * from './massager'
export * from './wallet'