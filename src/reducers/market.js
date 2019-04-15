import {
  GET_MARKET_LIST, GET_MARKET_CREATED_LIST, GET_MARKET_DETAIL, CREATE_MARKET, BOOKMARK_MARKET,
  CREATE_MARKET_REQUESTED, CREATE_MARKET_SUCCEEDED, CREATE_MARKET_FAILED, CREATE_MARKET_SMARTUP_SUCCEEDED
} from '../actions/actionTypes';
import FakeIcon from '../images/035-sun.svg'
import FakeImage from '../images/037-ufo.svg'

const transations = [
  { type: 'BUY', username: 'hit_ko', time: 1553740797139, avg: 2833, ct: 8.69},
  { type: 'SELL', username: 'hit_ko', time: 1553740797139, avg: 2833, ct: 8.69},
  { type: 'SELL', username: 'hit_ko', time: 1553740797139, avg: 2833, ct: 8.69},
  { type: 'BUY', username: 'hit_ko', time: 1553740797139, avg: 2833, ct: 8.69},
  { type: 'BUY', username: 'hit_ko', time: 1553740797139, avg: 2833, ct: 8.69},
  { type: 'BUY', username: 'hit_ko', time: 1553740797139, avg: 2833, ct: 8.69},
  { type: 'BUY', username: 'hit_ko', time: 1553740797139, avg: 2833, ct: 8.69},
]

const markets = [
  { id: '1', icon: null, name: 'SMART',             createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Your musical ideas into reality, using the one instrument you’ve been practising since birth— the voice.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: true, transations },
  { id: '2', icon: null, name: 'SMART',             createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '3', icon: null, name: 'DUBLER STUDIO KIT', createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '4', icon: null, name: 'SMART',             createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '5', icon: null, name: 'SMART',             createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '6', icon: null, name: 'SMART',             createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '7', icon: FakeIcon, name: 'SMART',         createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '8', icon: null, name: 'SMART',             createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '9', icon: null, name: 'SMART',             createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '10', icon: null, name: 'SMART',            createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '11', icon: null, name: 'SMART',            createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '12', icon: null, name: 'SMART',            createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '13', icon: null, name: 'SMART',            createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '14', icon: null, name: 'SMART',            createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
  { id: '15', icon: null, name: 'SMART',            createdDateTime: 1553740797139, price24hHigh: 59.37, price24hLow: 35.97, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, totalCt: 100000, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false, transations },
];

export const initialState = {

  marketName: null,
  marketDesc: null,
  createMarketHash: null,
  creatingMarket: false,
  createMarketError: null,
  
  markets: markets,
  marketCreatedList: null,
  marketDetail: null,
  createMarketInfo: null,
  totalResults: 0,

  payload: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MARKET_REQUESTED:
      return {
        ...state,
        creatingMarket: true,
      };
    case CREATE_MARKET_SUCCEEDED:
      return {
        ...state,
        createMarketHash: action.payload,
        creatingMarket: false,
        createMarketError: initialState.loginError
      };
    case CREATE_MARKET_FAILED:
      return {
        ...state,
        creatingMarket: false,
        createMarketError: action.payload,
      };

    case GET_MARKET_LIST: {
      return Object.assign({}, state, {
        markets: action.payload.obj,
        totalResults: action.payload.obj.length,
        payload: action.payload,
      })
    }
    case GET_MARKET_CREATED_LIST: {
      let marketCreatedList =
        state.marketCreatedList.concat(action.payload.obj);
      return Object.assign({}, state, {
        marketCreatedList: marketCreatedList,
        payload: action.payload,
      })
    }
    case GET_MARKET_DETAIL: {
      return Object.assign({}, state, {
        marketDetail: action.payload.obj,
        payload: action.payload,
      })
    }
    case CREATE_MARKET: {
      return Object.assign({}, state, {
        createMarketInfo: action.payload.obj,
        payload: action.payload,
      })
    }
    case BOOKMARK_MARKET: {
      const { id } = action.recordData;
      const currentMarkets = state.markets;
      let tempMarkets = currentMarkets.map(market => market.id === id ? {
        ...market, following: !market.following
      } : market);
      return Object.assign({}, state, {
        markets: tempMarkets,
      })
    }
    case CREATE_MARKET_SMARTUP_SUCCEEDED: {
      return {
        ...state,
       markets: [
         ...state.markets,
         action.payload
       ] 
      }
    }

    default:
      return state;
  }
}