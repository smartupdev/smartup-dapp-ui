import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import { getRawLang } from './language'
import { NOT_LOGIN, NO_ACCOUNT, NO_WALLET } from './integrator'
import { action as actionHelper } from './actions/actionHelper'
import { USER_PERSON_SIGN_FAILED } from './actions/actionTypes'
import { ENV } from './config'
import { log } from './lib/util'

const errorHandlingMiddleware = ({ getState, dispatch }) => next => action => {
  if(action.error) {
    if(action.meta && action.meta._didUpdated) return
    const message = action.payload.message
    const error = // Update error msg to other language
      message === NOT_LOGIN ? action.payload = new Error(getRawLang().error.notLogin) 
    : message === NO_ACCOUNT ? action.payload = new Error(getRawLang().error.noAccount)
    : message === NO_WALLET ? action.payload = new Error(getRawLang().error.noWallet)
    : ['MarketNotExist', 'MarketIsCreating', 'MarketIdError', 'MarketIdRepeat', 'GasPriceError', 'NetWorkError', 'GasPriceError', 'EthNotEnough', 'SutNotEnough', 'SignError'].includes(message) ?
      getRawLang().error[message]
    : null
    if(error) dispatch(actionHelper(USER_PERSON_SIGN_FAILED, action.payload, {...action.meta, _didUpdated: true}))
  }
  next(action)
}

const getMiddleware = () => {
  return process.env.NODE_ENV === 'production' ?	
    applyMiddleware(thunk, errorHandlingMiddleware)
    :	
    composeWithDevTools(applyMiddleware(thunk, errorHandlingMiddleware))	
}

export const store = createStore(reducer, getMiddleware())
if(ENV.showRedux) {
  log.info('Store info in window.store')
  window.store = store
}
