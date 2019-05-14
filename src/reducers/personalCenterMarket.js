import {
  PERSONAL_CENTER_RESET,
  USER_TRANSACTION_LIST_REQUESTED, USER_TRANSACTION_LIST_SUCCEEDED, USER_TRANSACTION_LIST_FAIL,
  USER_MARKET_CREATED_REQUESTED, USER_MARKET_CREATED_SUCCEEDED, USER_MARKET_CREATED_FAIL,
  USER_MARKET_TRADED_REQUESTED, USER_MARKET_TRADED_SUCCEEDED, USER_MARKET_TRADED_FAIL,
  USER_MARKET_COLLECTED_REQUESTED, USER_MARKET_COLLECTED_SUCCEEDED, USER_MARKET_COLLECTED_FAIL,
} from '../actions/actionTypes';

import { marketMassage, updateLoadMore } from '../integrator/massager'

export const initialState = {

  pageSize: 10,

  transactions: [],
  gettingTrancation: false,
  trancationError: null,
  transPageNumb: 0,
  transHasNextPage: false,
  /*交易列表
  type = CreateMarket, detail = {sut}
 type = BuyCT, detail = {sut, ct}
 type = SellCT, detail = {sut(stage==fail ? null:sut), ct}
  [
      {
        "txHash": "0x6cd23afbadf99b82075eb2e79bce253d234c93f477acfd85899d35e8e6077368",
        "stage": "success",
        "type": "CreateMarket",
        "userAddress": "0x8028012ef4b5Aceba7778aFbdF1757018Af1eEe8",
        "marketId": "2l93abj7zsw",
        "marketAddress": "0xFe404e75bfAceF095F7F7180484b0E1a651d967A",
        "marketName": "Market 3",
        "detail": {
          "sut": 2500
        },
        "createTime": "2019-04-28 15:13:27",
        "blockTime": "2019-04-28 15:14:36"
      }
    ]
  */

  createdMarkets: [],
  gettingCreatedMarmkets: false,
  createdMarketsError: null,
  createdMarketsPageNumb: 1,
  createdMarketsHasNextPage: false,

  tradedMarkets: [],
  gettingTradedMarmkets: false,
  tradedMarketsError: null,
  tradedMarketsPageNumb: 1,
  tradedMarketsHasNextPage: false,

  collectedMarkets: [],
  gettingCollectedMarmkets: false,
  collectedMarketsError: null,
  collectedMarketsPageNumb: 1,
  collectedMarketsHasNextPage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_TRANSACTION_LIST_REQUESTED:
      return {
        ...state,
        gettingTrancation: true,
      }
    case USER_TRANSACTION_LIST_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload;
      return {
        ...state,
        transactions: updateLoadMore(state.transactions, list, action.meta.isLoadMore, 'txHash'),
        gettingTrancation: false,
        transPageNumb: pageNumb,
        transHasNextPage: hasNextPage,
        trancationError: initialState.trancationError,
      }
    }
    case USER_TRANSACTION_LIST_FAIL:
      return {
        ...state,
        gettingTrancation: false,
        trancationError: action.payload,
      }
    case USER_MARKET_CREATED_REQUESTED:
      return {
        ...state,
        gettingCreatedMarmkets: true,
      }
    case USER_MARKET_CREATED_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload
      const markets = list.map(marketMassage)
      return {
        ...state,
        createdMarkets: updateLoadMore(state.createdMarkets, markets, action.meta.isLoadMore),
        gettingCreatedMarmkets: false,
        createdMarketsPageNumb: pageNumb,
        createdMarketsHasNextPage: hasNextPage,
        createdMarketsError: initialState.createdMarketsError,
      }
    }
    case USER_MARKET_CREATED_FAIL:
      return {
        ...state,
        gettingCreatedMarmkets: false,
        createdMarketsError: action.payload,
      }
    case USER_MARKET_COLLECTED_REQUESTED:
      return {
        ...state,
        gettingCollectedMarmkets: true
      }
    case USER_MARKET_COLLECTED_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload;
      const markets = list.map(marketMassage)
      return {
        ...state,
        gettingCollectedMarmkets: false,
        collectedMarkets: updateLoadMore(state.collectedMarkets, markets, action.meta.isLoadMore),
        collectedMarketsPageNumb: pageNumb,
        collectedMarketsHasNextPage: hasNextPage,
        collectedMarketsError: initialState.collectedMarketsError
      }
    }
    case USER_MARKET_COLLECTED_FAIL:
      return {
        ...state,
        gettingCollectedMarmkets: false,
        collectedMarketsError: action.payload
      }


    case USER_MARKET_TRADED_REQUESTED:
      return {
        ...state,
        gettingTradedMarmkets: true,
      }
    case USER_MARKET_TRADED_SUCCEEDED: {
      const { list, pageNumb, hasNextPage } = action.payload;
      const markets = list.map(marketMassage)
      return {
        ...state,
        tradedMarkets: updateLoadMore(state.tradedMarkets, markets, action.meta.isLoadMore),
        gettingTradedMarmkets: false,
        tradedMarketsPageNumb: pageNumb,
        tradedMarketsHasNextPage: hasNextPage,
        tradedMarketsError: initialState.tradedMarketsError,
      }
    }
    case USER_MARKET_TRADED_FAIL:
      return {
        ...state,
        gettingTradedMarmkets: false,
        tradedMarketsError: action.payload,
      }

    case PERSONAL_CENTER_RESET:
      return initialState
    default:
      return state;
  }
};