import { asyncFunction } from '../integrator'
import { apiAddCollect, apiDelCollect } from '../integrator/api'

// type: market | post | reply
export function addCollect(type, id) {
  return asyncFunction(
    apiAddCollect(type, id)
  )
}

// type: market | post | reply
export function delCollect(type, id) {
  return asyncFunction(
    apiDelCollect(type, id)
  )
}