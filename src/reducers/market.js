import {
    GET_MARKET_LIST, GET_MARKET_CREATED_LIST, GET_MARKET_DETAIL, CREATE_MARKET, BOOKMARK_MARKET,
} from '../actions/actionTypes';
import FakeIcon from '../images/035-sun.svg'
import FakeImage from '../images/037-ufo.svg'

const markets = [
    { id: '1', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Your musical ideas into reality, using the one instrument you’ve been practising since birth— the voice.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: true },
    { id: '2', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '3', icon: null, name: 'DUBLER STUDIO KIT', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '4', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '5', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '6', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '7', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '8', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '9', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '10', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '11', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '12', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '13', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '14', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
    { id: '15', icon: null, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000, following: false },
];

export const initialState = {
    markets: markets,
    marketCreatedList: null,
    marketDetail: null,
    createMarketInfo: null,
    totalResults: 0,

    payload: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}