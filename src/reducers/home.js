import { HOME_PAGE_LOADED } from '../constants/actionTypes';
import FakeIcon from '../images/035-sun.svg'
import FakeImage from '../images/037-ufo.svg'

const markets = [
    { id: '1', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Your musical ideas into reality, using the one instrument you’ve been practising since birth— the voice.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '2', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '3', icon: FakeIcon, name: 'DUBLER STUDIO KIT', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '4', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '5', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '6', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '7', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '8', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '9', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '10', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '11', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '12', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '13', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '14', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
    { id: '15', icon: FakeIcon, name: 'SMART', createdDateTime: 1553740797139, changeAvg24h: 0.18, price: 59.37, volumeAvg24h: 29002872, pool: 2682237283, priceIn7d: [ 40, 50, 45, 60, 57, 66, 70 ], overview: 'Let’s explain what is going on here.', image: FakeImage, numberOfComments: 2000, numberOfSub: 1000 },
];

export const initialState = {
    markets:markets,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HOME_PAGE_LOADED:
            return {
                ...state,
                tags: action.payload[0].tags
            }
        default:
            return state;
    }
}