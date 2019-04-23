import {
  CREATE_MARKET_PAY_REQUESTED, CREATE_MARKET_PAY_SUCCEEDED, CREATE_MARKET_PAY_FAILED,
  GET_MARKET_LIST_REQUESTED, GET_MARKET_LIST_SUCCEEDED, GET_MARKET_LIST_FAILED,
  CT_ACCOUNT_IN_MARKET_REQUESTED, CT_ACCOUNT_IN_MARKET_SUCCEEDED, CT_ACCOUNT_IN_MARKET_FAILED,
  GET_MARKET_GLOBAL_REQUESTED, GET_MARKET_GLOBAL_SUCCEEDED, GET_MARKET_GLOBAL_FAILED,
  TRADE_SUCCEEDED,
  GET_MARKET_DETAIL_REQUESTED, GET_MARKET_DETAIL_SUCCEEDED, GET_MARKET_DETAIL_FAILED,
} from '../actions/actionTypes';
import { markets } from '../devData/marketDetail/'

function marketMassage(m) {
  return {
    ...m,
    ...m.data,
    id: m.marketId,
    address: m.marketAddress,
    icon: null,
    priceIn7d: [40, 50, 45, 60, 57, 66, 70],
    overview: 'Let’s explain what is going on here.',
    numberOfComments: 2000,
    numberOfSub: 1000,
    following: false,
  }
}

export const initialState = {

  marketName: null,
  marketDesc: null,
  createMarketHash: null,
  creatingMarket: false,
  createMarketError: null,

  markets: [],
  gettingMarketList: false,
  marketListError: null,
  /*
  [
      {
        "marketId": "1p0re3to9og",
        "txHash": "0x19bcfbaa866e4d86fe5fa9cf8fd33696e3941529104bb159a94ade48044bd19a",
        "creatorAddress": "0xB44940Be0eeA81a3D0dA22CC15208AF4744BeA8E",
        "marketAddress": "0x4b331d6AdCdBE3d9228c2BbA113b93681958263F",
        "name": "ZZ",
        "description": "Test for ZZ",
        "type": null,
        "stage": "built",
        "createTime": "2019-04-19 14:25:52",
        "data": {
          "marketAddress": "0x4b331d6AdCdBE3d9228c2BbA113b93681958263F",
          "latelyChange": null,
          "last": 0.0006585051657205122,
          "latelyVolume": 4.124292006115548,
          "amount": 4.124292006115548,
          "ctAmount": 7000,
          "ctTopAmount": 7000,
          "count": 3
        }
      }
    ]
  */
  totalResults: 0,

  ctInMarket: [],
  gettingCtInMarket: false,
  ctInMarketError: null,

  marketGlobal: {},
  gettingMarketGlobal: false,
  marketGlobalError: null,

  currentMarket: null,
  gettingMarket: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MARKET_DETAIL_REQUESTED: 
      return {
        ...state,
        gettingMarket: true
      }
    case GET_MARKET_DETAIL_SUCCEEDED: 
      return {
        ...state,
        currentMarket: marketMassage(action.payload),
        gettingMarket: false
      }
    case GET_MARKET_DETAIL_FAILED: 
      return {
        ...state,
        gettingMarket: false
      }

    case TRADE_SUCCEEDED: {
      const { id, username, userIcon, time, avg, ct, isSell } = action.payload
      const marketIndex = state.markets.findIndex(m => m.id === id)
      if (marketIndex < 0) return state
      return {
        ...state,
        markets: [
          ...state.markets.slice(0, marketIndex),
          {
            ...state.markets[marketIndex],
            transations: [
              {
                id: state.markets[marketIndex].transations.length + 100,
                type: isSell ? 'SELL' : 'BUY',
                username, userIcon,
                time, avg, ct
              },
              ...state.markets[marketIndex].transations
            ]
          },
          ...state.markets.slice(marketIndex + 1),
        ]
      }
    }
    case CREATE_MARKET_PAY_REQUESTED:
      return {
        ...state,
        creatingMarket: true,
      };
    case CREATE_MARKET_PAY_SUCCEEDED:
      return {
        ...state,
        createMarketHash: action.payload,
        creatingMarket: false,
        createMarketError: initialState.loginError
      };
    case CREATE_MARKET_PAY_FAILED:
      return {
        ...state,
        creatingMarket: false,
        createMarketError: action.payload,
      };

    case GET_MARKET_LIST_REQUESTED:
      return {
        ...state,
        gettingMarketList: true,
      };
    case GET_MARKET_LIST_SUCCEEDED: {
      let tempMarkets = action.payload.map(marketMassage);
      return {
        ...state,
        markets: tempMarkets,
        gettingMarketList: false,
        marketListError: initialState.marketListError
      };
    }
    case GET_MARKET_LIST_FAILED:
      return {
        ...state,
        gettingMarketList: false,
        marketListError: action.payload,
      };
    case CT_ACCOUNT_IN_MARKET_REQUESTED:
      return {
        ...state,
        gettingCtInMarket: true,
      };
    case CT_ACCOUNT_IN_MARKET_SUCCEEDED:
      return {
        ...state,
        ctInMarket: action.payload,
        gettingCtInMarket: false,
        ctInMarketError: initialState.ctInMarketError
      };
    case CT_ACCOUNT_IN_MARKET_FAILED:
      return {
        ...state,
        gettingCtInMarket: false,
        ctInMarketError: action.payload,
      };
    case GET_MARKET_GLOBAL_REQUESTED:
      return {
        ...state,
        gettingMarketGlobal: true,
      };
    case GET_MARKET_GLOBAL_SUCCEEDED:
      return {
        ...state,
        marketGlobal: action.payload,
        gettingMarketGlobal: false,
        marketGlobalError: initialState.marketGlobalError
      };
    case GET_MARKET_GLOBAL_FAILED:
      return {
        ...state,
        gettingMarketGlobal: false,
        marketGlobalError: action.payload,
      };

    case 'BOOKMARK_MARKET': {
      const { id } = action.recordData;
      const currentMarkets = state.markets;
      let tempMarkets = currentMarkets.map(market => market.id === id ? {
        ...market, following: !market.following
      } : market);
      return Object.assign({}, state, {
        markets: tempMarkets,
      })
    }

    default:
      return state;
  }
}