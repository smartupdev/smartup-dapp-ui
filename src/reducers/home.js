import {
    HOME_PAGE_LOADED, SET_EXPANDED_RECORDS, SET_ACTIVE_TAB,
    GET_TOTAL_RESULT, TABLE_HEADER_CLICK,
} from '../actions/actionTypes';
import FakeIcon from '../images/035-sun.svg'
import FakeImage from '../images/037-ufo.svg'

const markets = [
    { id: '1', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Your musical ideas into reality, using the one instrument you’ve been practising since birth— the voice.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '2', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '3', icon: FakeIcon, name: 'DUBLER STUDIO KIT', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '4', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '5', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '6', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '7', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '8', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '9', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '10', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '11', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '12', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '13', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '14', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '15', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [40, 50, 45, 60, 57, 66, 70], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
];

export const initialState = {
    markets: markets,
    expandedRecords: [],
    activeTab: null,
    totalResults: 255,
    sortBy: 'price',
    orderBy: 'desc',
    networkStatus: null,   //loading,success,error
    errorInfo: null,       // if networkStatus is error, show errorInfo.
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HOME_PAGE_LOADED:
            return {
                ...state,
                tags: action.payload[0].tags
            }
        case SET_EXPANDED_RECORDS: {
            // const { record: { id }, isExpanded } = { ...action.recordData };
            // const tempExpandeds = isExpanded ?
            //     state.expandedRecords.filter(r => r !== id) : [...state.expandedRecords, id];
            return Object.assign({}, state, { expandedRecords: action.expandedRecords });
        }
        case SET_ACTIVE_TAB: {
            return Object.assign({}, state, {
                activeTab: action.activeTab,
                expandedRecords: [],
                sortBy: '',
                orderBy: 'desc',
            });
        }
        case GET_TOTAL_RESULT: {
            return Object.assign({}, state, { totalResults: action.totalResults });
        }
        case TABLE_HEADER_CLICK: {
            if (state.sortBy !== action.headerName) {
                return Object.assign({}, state, {
                    sortBy: action.headerName,
                    orderBy: 'desc',
                });
            } else {
                return Object.assign({}, state, {
                    orderBy: state.orderBy === 'desc' ? 'asc' : 'desc',
                });
            }
        }
        default:
            return state;
    }
}