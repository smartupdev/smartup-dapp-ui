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
  TRADE_HIGH_LOW_REQUESTED, TRADE_HIGH_LOW_SUCCEEDED, TRADE_HIGH_LOW_FAILED,
  TRADE_CHANGE_CT_AMOUNT,
  MARKET_DETAIL_GET_CT_REQUESTED, MARKET_DETAIL_GET_CT_SUCCEEDED, MARKET_DETAIL_GET_CT_FAILED,
  TRADE_SAVE_SUCCEEDED,
} from '../actions/actionTypes';

function tradeMassage(trade) {
  return {
    ...trade, 
    id: trade.txHash,
    avgAmount: trade.sutAmount / trade.ctAmount,
    userIcon: trade.user.avatarIpfsHash,
    username: trade.user.name || trade.user.userAddress
  }
}

export const initialState = {
  tabIndex: 0,

  isSell: false,
  agreeTnc: false,

  sut: '',
  gettingSUT: false,
  sutError: null,
  getSUTCount: 0,

  userCt: 0, // TODO, change when trade
  ct: '',
  gettingCT: false,
  ctError: null,

  isTrading: false,
  tradingError: null,

  trades: [],
  pageSize: 20,
  pageNumb: 0,
  hasNextPage: false,
  gettingTrades: false,
  getTradesError: null,

  klineData: [],
  gettingKline: false,
  getKlineError: null,

  highLowData: [],
  gettingHighLow: false,
  getHighLowError: null,

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
    case TRADE_SAVE_SUCCEEDED: 
      return {
        ...state,
        trades: [
          tradeMassage(action.payload),
          ...state.trades,
        ]
      }
    // case MARKET_DETAIL_GET_CT_REQUESTED: 
    //   return {
    //     ...state,

    //   }
    case MARKET_DETAIL_GET_CT_SUCCEEDED: 
      return {
        ...state,
        userCt: +action.payload
      }
    // case MARKET_DETAIL_GET_CT_FAILED: 
    //   return {
    //     ...state,

    //   }

    case TRADE_CHANGE_SUT:
      return {
        ...state,
        sut: action.payload.startsWith('.') ? '0' + action.payload : action.payload,
        tradingError: initialState.tradingError
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
    case TRADE_CHANGE_CT: {
      const ct =  action.payload.startsWith('.') ? '0' + action.payload : action.payload
      return {
        ...state,
        ct,
        tradingError: initialState.tradingError
      }
    }

    case TRADE_GET_SUT_REQUESTED:
      return {
        ...state,
        gettingSUT: true,
        getSUTCount: action.meta.getSUTCount
      }
    case TRADE_GET_SUT_SUCCEEDED:
      if (action.meta && state.getSUTCount !== action.meta.getSUTCount) return state
      return {
        ...state,
        gettingSUT: false,
        sut: action.payload,
        sutError: initialState.sutError
      }
    case TRADE_GET_SUT_FAILED:
      if (action.meta && state.getSUTCount !== action.meta.getSUTCount) return state
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
      // const { hash, isSell, username, userIcon, sut: sutAmount , ct: ctAmount } = action.payload

      return {
        ...state, ct, sut, tradingError, isTrading,
        userCt: state.isSell ? state.userCt - state.ct : state.userCt + +state.ct
        // trades: [
        //   {
        //     id: hash,
        //     type: isSell ? 'sell' : 'buy',
        //     avgAmount: sutAmount / ctAmount,
        //     sutAmount,
        //     ctAmount,
        //     userIcon,
        //     username,
        //     createTime: Date.now()  
        //   },
        //   ...state.trades
        // ]
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

    case TRADE_HIGH_LOW_REQUESTED:
      return {
        ...state,
        gettingHighLow: true,
      };
    case TRADE_HIGH_LOW_SUCCEEDED: {
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
        highLowData: tempLines,
        gettingHighLow: false,
        getHighLowError: initialState.getHighLowError
      };
    }
    case TRADE_HIGH_LOW_FAILED:
      return {
        ...state,
        gettingHighLow: false,
        getHighLowError: action.payload,
      };

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

      if (tempLines.length === 1) {
        tempLines.push({
          ...tempLines[0],
          open: 0,
          close: 0,
          high: 0,
          low: 0,
          volume: 0,
        })
      }

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
      const {list, pageNumb, pageSize, hasNextPage} = action.payload;
      const tradeList = list.map(tradeMassage).filter(t => t.stage === 'success' || t.stage === 'pending')
      return {
        ...state,
        trades: action.meta.isLoadMore ? [...state.trades, ...tradeList] : tradeList,
        pageNumb, pageSize, hasNextPage,
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