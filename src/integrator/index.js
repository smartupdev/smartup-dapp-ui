import { getAccount, checkIsSupportWeb3 } from './wallet'
import { getRawLang } from '../language'
import { NOT_LOGIN, get } from '../lib/util/fetch'
import { USER_PERSON_SIGN_FAILED } from '../actions/actionTypes'

const NO_ACCOUNT = 'Please connect to metamask.'

export function asyncFunction(
  func,
  requestType, responseType, errorType,
  options = {} // isWeb3, params, responsePayload, meta
) {
  return async dispatch => {
    const lang = getRawLang()
    requestType && dispatch({ type: requestType, meta: options.meta })
    try {
      if (options.isWeb3 && !checkIsSupportWeb3()) throw new Error('Web3 or ethereum is not supported.')
      if(options.loginRequired && !await getAccount()) throw new Error(lang.error.noAccount)
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
      if(error.message === NOT_LOGIN || error.message === NO_ACCOUNT) 
        if(error.message === NOT_LOGIN) error.message = lang.error.notLogin // Update error msg to other language
        dispatch({ 
          type: USER_PERSON_SIGN_FAILED, 
          meta: options.meta, 
          payload: error, 
          error: true
        })
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