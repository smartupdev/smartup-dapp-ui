import {
  TRADE_RESET,
  TRADE_SET_TAB,  
  TRADE_TOGGLE_IS_SELL, TRADE_TOGGLE_AGREE_TNC,
  TRADE_CHANGE_CT, TRADE_CHANGE_SUT,
  TRADE_GET_CT_REQUESTED, TRADE_GET_CT_SUCCEEDED, TRADE_GET_CT_FAILED,
  TRADE_GET_SUT_REQUESTED, TRADE_GET_SUT_SUCCEEDED, TRADE_GET_SUT_FAILED,
  TRADE_REQUESTED, TRADE_SUCCEEDED, TRADE_FAILED,
  TRADE_BID_CT_REQUESTED, TRADE_BID_CT_SUCCEEDED, TRADE_BID_CT_FAILED,
  TRADE_BID_QUOTE_REQUESTED, TRADE_BID_QUOTE_SUCCEEDED, TRADE_BID_QUOTE_FAILED,
  TRADE_ASK_CT_REQUESTED, TRADE_ASK_CT_SUCCEEDED, TRADE_ASK_CT_FAILED,
  TRADE_ASK_QUOTE_REQUESTED, TRADE_ASK_QUOTE_SUCCEEDED, TRADE_ASK_QUOTE_FAILED,
  TRADE_LIST_REQUESTED, TRADE_LIST_SUCCEEDED, TRADE_LIST_FAILED,
  TRADE_DETAIL_REQUESTED, TRADE_DETAIL_SUCCEEDED, TRADE_DETAIL_FAILED,
  TRADE_KLINE_REQUESTED, TRADE_KLINE_SUCCEEDED, TRADE_KLINE_FAILED,
  TRADE_CHANGE_CT_AMOUNT,
} from '../actions/actionTypes';

export const initialState = {
  tabIndex: 0,

  isSell: false,
  agreeTnc: false,

  sut: '',
  gettingSUT: false,
  sutError: null,
  getSUTCount: 0,

  ct: '',
  gettingCT: false,
  ctError: null,

  isTrading: false,
  tradingError: null,

  trades: [],
  pageSize: 10,
  pageNumb: 0,
  hasNextPage: true,
  gettingTrades: false,
  getTradesError: null,

  klineData: [],
  /*
  [
    {
      "marketAddress": "0xf6f7c3cdba6ef2e9fff12b1702481f99ca6cd38c",
      "timeId": "2019_04_16",
      "segment": "1day",
      "high": 0.0008893047281869845,
      "low": 0.0008875846265085669,
      "start": 0.0008875846265085669,
      "end": 0.0008893047281869845,
      "amount": 3.187307075635292,
      "count": 6,
      "time": "2019-04-16 12:00:00"
    }
  ]
  */
  gettingKline: false,
  getKlineError: null,

  oneDetail: null,
  gettingOneDetail: false,
  getOneTradeError: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRADE_RESET:
      return initialState
    case TRADE_SET_TAB: 
      return {
        ...state,
        tabIndex: action.payload.index
      }
    case TRADE_CHANGE_SUT:
      return {
        ...state,
        sut: action.payload
      }
    case TRADE_GET_CT_REQUESTED:
      return {
        ...state,
        gettingCT: true
      }
    case TRADE_GET_CT_SUCCEEDED:
      return {
        ...state,
        gettingCT: false,
        ct: action.payload,
        ctError: initialState.ctError
      }
    case TRADE_GET_CT_FAILED:
      return {
        ...state,
        gettingCT: false,
        ctError: action.payload
      }
    case TRADE_CHANGE_CT:
      return {
        ...state,
        ct: action.payload
      }
    case TRADE_GET_SUT_REQUESTED:
      return {
        ...state,
        gettingSUT: true,
        getSUTCount: action.meta.getSUTCount
      }
    case TRADE_GET_SUT_SUCCEEDED:
      if(action.meta && state.getSUTCount !== action.meta.getSUTCount) return state
      return {
        ...state,
        gettingSUT: false,
        sut: action.payload,
        sutError: initialState.sutError
      }
    case TRADE_GET_SUT_FAILED:
      if(action.meta && state.getSUTCount !== action.meta.getSUTCount) return state
      return {
        ...state,
        gettingSUT: false,
        sutError: action.payload
      }
    case TRADE_REQUESTED:
      return {
        ...state,
        isTrading: true
      }
    case TRADE_SUCCEEDED: {
      const { ct, sut, tradingError, isTrading } = initialState
      const { hash, isSell, username, userIcon, sut: sutAmount , ct: ctAmount } = action.payload

      return {
        ...state, ct, sut, tradingError, isTrading,
        trades: [
          {
            id: hash,
            type: isSell ? 'sell' : 'buy',
            avgAmount: sutAmount / ctAmount,
            sutAmount,
            ctAmount,
            userIcon,
            username,
            createTime: Date.now()  
          },
          ...state.trades
        ]
      }
    }
    case TRADE_FAILED:
      return {
        ...state,
        isTrading: false,
        tradingError: action.payload
      }

    case TRADE_TOGGLE_AGREE_TNC: 
      return {
        ...state,
        agreeTnc: !state.agreeTnc,
      }
    

    case TRADE_TOGGLE_IS_SELL: 
      return {
        ...state,
        isSell: !state.isSell,
      }
    

    case TRADE_KLINE_REQUESTED:
      return {
        ...state,
        gettingKline: true,
      };
    case TRADE_KLINE_SUCCEEDED: {
      let tempLines = action.payload.map(line => {
        return {
          ...line,
          open: line.start,
          close: line.end,
          volume: line.amount,
          date: new Date(line.time),
        }
      });

      return {
        ...state,
        klineData: tempLines,
        gettingKline: false,
        getKlineError: initialState.getKlineError
      };
    }
    case TRADE_KLINE_FAILED:
      return {
        ...state,
        gettingKline: false,
        getKlineError: action.payload,
      };
    case TRADE_DETAIL_REQUESTED:
      return {
        ...state,
        gettingOneDetail: true,
      };
    case TRADE_DETAIL_SUCCEEDED:
      return {
        ...state,
        oneDetail: action.payload,
        gettingOneDetail: false,
        getOneTradeError: initialState.getOneTradeError
      };
    case TRADE_DETAIL_FAILED:
      return {
        ...state,
        gettingOneDetail: false,
        getOneTradeError: action.payload,
      };
    case TRADE_LIST_REQUESTED:
      return {
        ...state,
        gettingTrades: true,
      };
    case TRADE_LIST_SUCCEEDED: {
      const {list: tradeList, pageNumb, pageSize, hasNextPage} = action.payload;

      return {
        ...state,
        trades: tradeList.map( trade => ({
          ...trade, 
          id: trade.txHash,
          avgAmount: trade.sutAmount / trade.ctAmount,
          userIcon: trade.user.avatarIpfsHash,
          username: trade.user.name
        })).filter(t => t.stage === 'success'),
        pageNumb,pageSize,hasNextPage,
        gettingTrades: false,
        getTradesError: initialState.getTradesError
      };
    }
    case TRADE_LIST_FAILED:
      return {
        ...state,
        gettingTrades: false,
        getTradesError: action.payload,
      };
    default:
      return state;
  }
}