import { 
  // BOOKMARK_GET_MARKET_LIST_REQUESTED, BOOKMARK_GET_MARKET_LIST_SUCCEEDED, BOOKMARK_GET_MARKET_LIST_FAILED, 
} from './actionTypes';
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

// export function getMarketList(isLoadMore, pageNumb, pageSize) {
//   return getList(
//     'market', 
//     isLoadMore, pageNumb, pageSize, 
//     BOOKMARK_GET_MARKET_LIST_REQUESTED, BOOKMARK_GET_MARKET_LIST_SUCCEEDED, BOOKMARK_GET_MARKET_LIST_FAILED, 
//   )
// }

// //收藏列表
export function getList(type, isLoadMore, pageNumb, pageSize, resquestType, responseType, errorType) {
  return (dispatch, getState) => {
    const { pageNumb, pageSize } = getState().bookmark
    // return dispatch(
    //   asyncFunction(
    //     // apiGetCollectList('market', isLoadMore ? pageNumb + 1 : 1, pageSize),
    //     // BOOKMARK_GET_MARKET_LIST_REQUESTED, BOOKMARK_GET_MARKET_LIST_SUCCEEDED, BOOKMARK_GET_MARKET_LIST_FAILED, 
    //     {
    //       meta: { isLoadMore }
    //     }
    //   )
    // )
  }
}