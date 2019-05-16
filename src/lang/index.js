function name(en, tc, sc) {
  return {
    en,
    tc: tc || sc || en,
    sc: sc || tc || en
  }
}

const main = {
  dispute: {
    notReady: name('Dispute function is under development, coming soon in later 2019!', 'XXX'),
  },

  result: name('RESULTS', '個搜尋結果', '个搜寻结果'),
  search: name('Search', '搜尋', '搜寻'),
  trade: name('Trade', '交易', '交易'),
  loadMore: name('Load More', '更多'),

  timeAgo: {
    day: name('d ago', '日前'),
    hour: name('h ago', '小時前', '小时前')
  },

  home: {
    tab: {
      all: name('All', '全部'),
      hot: name('Hottest', '最熱門', '最热门'),
      new: name('Newest', '最新'),
      pop: name('Populous', '最人氣', '最人气'),
      rich: name('Richest', '最富有'),
    },
    table: {
      name: name('NAME', '名稱', '名称'),
      change: name('24H CHANGE', '24小時漲跌', '24小时涨跌'),
      price: name('SPOT PRICE', '現貨價格', '现货价格'),
      volume: name('24H VOLUME', '24小時成交量', '24小时成交量'),
      cap: name('FUNDING POOL', '總資金量', '总资金量'),
      graph: name('7D GRAPH', '7天圖表', '7天图表')
    }
  },

  panel: {
    tab: {
      portfolio: name('Portfolio', '資料', '资料'),
      notification: name('Notifications', '通知'),
      setting: name('Settings', '設定', '设定')
    },
    portfolio: {
      wallet: {
        title: name('Market Wallet', '巿場錢包', '巿场钱包'),
        id: name('IDEA', '巿場', '巿场'),
        ct: name('TOKENS', '代幣'),
        volume: name('CHANGE', '漲跌', '涨跌')
      },
      marketInfo: {
        title: name('Global Market Information', '全部巿場資訊', '全部巿场信息'),
        totalSmartup: name('Total SMARTUP invested', '總SMARTUP投資額', '总SMARTUP投资额'),
        totalMarket: name('Total number of markets', '全部巿場總數', '全部巿场总数'),
        totalDiscussion: name('Total number of ongoing discussions', '正在討論的帖子數', '正在讨论的帖子数')
      },
      bookmark: {
        title: name('Bookmarks', '書籤', '书签')
      },
      login: {
        checkMetamash: name('Please check Metamask.', '請檢查MetaMask。', '请检查MetaMask。')
      },
    },
    connectButton: name('Connect', '連接', '连接'),
  },

  setting: {
    avatar: name('Avatar photo', '個人圖片', '个人图片'),
    dragFile: name('Drag file here', '拖放圖片至此', '拖放图片至此'),
    changeFile: name('Change file to upload', '上載更改圖片', '上载更改图片'),
    submit: name('Submit', '提交'),
    cancel: name('Cancel', '取消'),
    deactivate: name('Deactivate account', '停用帳戶', '停用帐户')
  },

  
  term: name('Terms of Service', '服務條款', '服务条款'),


  marketTab: {
    trade: name('Trading', '交易'),
    general: name('General', '一般'),
    discussion: name('Discussions', '討論', '讨论'),
    proposal: name('Proposals', '提案'),
    flag: name('Dispute', '檢舉', '检举'),
    search: name('Search', '搜尋', '搜寻'),
  },

  trading: {
    period: name('7D', '7天'),
    low: name('low', '低位'),
    high: name('high', '高位'),
    change: name('CHANGE (SINCE LAST 00:00)', '漲跌(自00:00)', '涨跌(自00:00)'),
    price: name('SPOT PRICE', '現貨價格', '现货价格'),
    volume: name('VOLUME (SINCE LAST 00:00)', '成交量(自00:00)'),
    cap: name('FUNDING POOL', '總資金量', '总资金量'),
    ct: name('NUMBER OF MARKET TOKEN MINTED', '巿場代幣已發行量', '巿场代币已发行量'),
    tradeTitle: name('Trade Token(s)', '代幣交易', '代币交易'),
    tradeText: name('You are performing token trading.', '你正在進行交易', '你正在进行交易'),
    tradePay: name('PAY With', '付款'),
    tradeReceive: name('RECEIVE', '收取'),
    tradeButton: name('Trade', '交易'),
    trans: name('Recent Transactions', '最新交易'),

    table: {
      buySell: name('BUY/ SELL', '買入/賣出', '买入/卖出'),
      user: name('USER', '用戶', '用户'),
      time: name('TIME', '時間', '时间'),
      avgPrice: name('AVG PRICE IN SMARTUP', 'SMARTUP平均價', 'SMARTUP平均价'),
      ct: name('TOKEN', '代幣', '代币'),
      buy: name('BUY', '買入', '买入'),
      sell: name('SELL', '賣出', '卖出'),
      stage: name('STATUS', '狀態', '状态')
    }
  },

  discussion: {
    post: name('Posted by', '發布自', '发布自'),
    day: name('d ago', '日前'),
    hour: name('h ago', '小時前', '小时前'),
    reply: name('reply', '回覆', '回复'),
    feedback: name('feedback', '回應', '回应'),
    like: name('like', '讚好', '赞好'),
    dislike: name('dislike', '不讚', '不赞'),
    share: name('share', '分享'),
    save: name('save', '存儲', '存储'),
    replies: name('more replies', '更多回覆', '更多回复'),
    vote: name('VOTE', '投票'),
  },

  general: {
    info: name('Information', '資訊', '信息'),
    createTime: name('Create time', '創建時間', '创建时间'),
    creator: name('Creator', '創建者', '创建者'),
    overview: name('Overview', '概要'),
    rule: name('Rules', '規則', '规则'),
    sub: name('Subscribers', '訂戶', '订户'),
    table: {
      name: name('NAME', '名稱', '名称'),
      rank: name('RANK', '排名'),
      time: name('JOINED DATE', '加入日期'),
      ct: name('TOKEN OWNED', '持有代幣', '持有代币'),
    }
  },

  proposal: {
    createTime: name('Create time', '創建時間', '创建时间'),
    creator: name('Creator', '創建者', '创建者'),
    remain: name('Remaining time', '剩餘時間', '剩余时间'),
    desp: name('description', '描述'),
    option: name('Options', '選項', '选项'),
    vote: name('VOTE', '投票'),
    amt: name('Amount', '數量', '数量'),
    approve: name('APPROVE', '通過', '通过'),
    decline: name('DECLINE', '否決'),
    para: name('Parameters', '參數', '参数'),
    from: name('from', '由'),
    to: name('to', '至'),
  },

  faq: {
    title: name('FAQ', '常見問題', '常见问题'),
  }
}

const stringMain = JSON.stringify(main)
const en = JSON.parse(stringMain)
const tc = JSON.parse(stringMain)
const sc = JSON.parse(stringMain)

function setObjectValueByKeys(o, keys = [], value) {
  keys.reduce((p, c, i, arr) => {
    if (arr.length === i + 1) {
      p[c] = value
      return p
    }
    return p[c]
  }, o)
  return o
}


function f(o, keys = []) {
  for (const [key, value] of Object.entries(o)) {
    const cKey = [...keys, key]
    if ('en' in value && 'tc' in value && 'sc' in value) {
      setObjectValueByKeys(en, cKey, value.en)
      setObjectValueByKeys(tc, cKey, value.tc)
      setObjectValueByKeys(sc, cKey, value.sc)
    } else {
      f(value, cKey)
    }
  }
}
f(main)
export const languages = { en, tc, sc }
export const currentLang = 'en' // TODO
export const initialLang = 'en'

export default main