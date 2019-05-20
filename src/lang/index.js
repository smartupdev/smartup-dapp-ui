import { nextTick } from "q";

function name(en, tc, sc) {
  return {
    en,
    tc: tc || sc || en,
    sc: sc || tc || en
  }
}

const main = {
  dispute: {
    notReady: name('Dispute function is under development, coming soon in later 2019!', '檢舉功能正在建設中，將於2019年底推出。', '检举功能正在建设中，将于2019年底推出。'),
  },

  result: name('RESULTS', '個搜尋結果', '个搜寻结果'),
  search: name('Search', '搜尋', '搜寻'),
  noResult: name('No result found.', '找不到搜尋結果。', '找不到搜寻结果。'),
  trade: name('Trade', '交易', '交易'),
  loadMore: name('Load More', '更多'),

  dragFile: {
    dragFile: name('Drag file here', '拖放圖片至此', '拖放图片至此'),
    chooseFile: name('Choose file to upload', '上載更改圖片', '上载更改图片'),
    uploading: name('Uploading file', '上載中', '上载中'),
    fileSize: name('File size exceeds the limit allowed(5MB).', '檔案大小超過5MB限制。', '档案大小超过5MB限制'),
    fileType: name('Invalid file type. Only png, gif and jpg is allowed.', '上載檔案只限png, gif 及jpg。', '上载档案只限png，gif和jpg。'),
  },

  time: {
    min: name('m ago', '分鐘前'),
    day: name('d ago', '日前'),
    hour: name('h ago', '小時前', '小时前'),
    now: name('now', '剛剛', '刚刚'),
    months: name(['Jan', 'Feb' , 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']),
    weekdays: name(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'])
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
    
    setting: {
      avatar: name('Avatar photo', '個人圖片', '个人图片'),
      userName: name('User Name', '用戶名稱', '用户名称'),
      nameReq: name('Capital sensitive, 6-15 characters.', '區分大小寫，6-15字符。', '区分大小写，6-15字符。'),
      nameLock: name('Username is confirmed and locked.', '用戶名稱已更改並鎖定。', '用户名称已更改并锁定。'),
      languages: name('Languages', '語言','语言'),
      submit: name('Submit', '提交'),
      confirm: name('Confirm', '確定', '确定'),
      cancel: name('Cancel', '取消'),
      deactivate: name('Deactivate account', '停用帳戶', '停用帐户')
    },
    
    connectButton: name('Connect', '連接', '连接'),
  },

  createMarket: {
    tab: {
      basicInfo: name('Basic Information', '基本資料', '基本资料'),
      equation: name('Price Equation', '價格方程', '价格方程'),
      deposit: name('Deposit', '按金')
    },
    createMarket: name('CREATE MARKET', '創建巿場', '创建巿场'),
    createDeposit: name('Market creation deposit', '創建巿場按金', '创建巿场按金'),
    marketName: name('Market Name', '巿場名稱', '巿场名称'),
    marketOverview: name('Market Overview', '巿場概要', '巿场概要'),
    nameDes: name('Capital sensitive, 3-40 characters, market name cannot be changed.', '區分大小寫，3-40字符。創建後不可更改。', '区分大小写，3-40字符。创建后不可更改。'),
    overviewDes: name('150 characters to help new members get to know your market. Overview cannot be changed.', '以150字簡單介紹你的項目。巿場概要在創建巿場後無法更改。', '以150字简单介绍你的项目。巿场概要在创建巿场后无法更改。'),
    marketAvatar: name('Market Avatar', '巿場圖像' , '巿场图像'),
    marketCover: name('Market Cover Photo', '巿場封面圖', '巿场封面图'),
    priceEquation: name('Price equation of idea token', '巿場代幣方程', '巿场代币方程'),
    previewCurve: name('Preview', '預覽', '预览'),
    creating: name('MAKRET IS CREATING!', '巿場正在創建！', '巿场正在创建！'),
    preview: name('Preview The New Market', '預覽新巿場', '预览新巿场'),
    next: name('Next', '下一步'),
    back: name('Back', '返回'),
    create: name('Create', '創建', '创建')
  },
  
  term: name('Terms of Service', '服務條款', '服务条款'),

  routes: { // must match with src/routes
    home: name('Home', '主頁', '主页'),
    createMarket: name('Create Martket', '創建巿場'),
    account: name('Personal Centre', '個人中心', '个人中心'),
    dispute: name('Dispute', '檢舉'),
    faq: name('FAQ', '常見問題'),
    feedback: name('Feedback Us', '意見回饋'),

    accountTransaction: name('Transaction', '交易'),
    accountMarket: name('Market', '巿場', '巿场'),
    accountPost: name('Post', '帖子'),
    accountComment: name('Comment', '留言'),
    accountSaved: name('Saved', '保存'),
  },

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
    hour: name('1hour', '1小時', '1小时'),
    day: name('1day', '1天'),
    week: name('1week', '1周'),
    cost: name('Cost', '支付'),
    toReceive: name('To receive', '收取'),
    agreeTo: name('Agree to ', '同意 '),
    needMoreSUT: name('You need more SmartUp to buy Idea tokens.', 'SmartUp幣餘額不足，無法交易。', 'SmartUp币余额不足，无法交易。'), 
    needMoreCT: name('You do not have enough token to sell.', '你的巿場代幣餘額不足，無法交易。', '你的巿场代币余额不足，无法交易。'),
    transactionRecord: name('Transaction record will be available after the first transaction made.', '交易紀錄於第一單交易完成後顯示。', '交易纪录于第一单交易完成后显示。'),
    chart: name('Graph will be vailable after transactions made', '交易圖表將於交易完成後顯示', '交易图表将于交易完成后显示'),

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
    about: name('about', '約'),
    reply: name('reply', '回覆', '回复'),
    feedback: name('feedback', '回應', '回应'),
    like: name('like', '讚好', '赞好'),
    dislike: name('dislike', '不讚', '不赞'),
    share: name('share', '分享'),
    save: name('save', '存儲', '存储'),
    replies: name('more replies', '更多回覆', '更多回复'),
    vote: name('VOTE', '投票'),
    noResult: name('No result found.', '找不到搜尋結果。', '找不到搜寻结果。'),
    loginToComment: name('Please login to comment.', '請先登入回覆主題。', '请先登入回覆主题。'),
    preview: name('(Function will be enabled after market created successfully)', '(功能將於巿場成功創建後開通。)', '(功能将于巿场成功创建后开通。)'),
    create: {
      title: name('Title', '標題', '标题'),
      text: name('Text','內文'),
      photo: name('Photo', '圖片', '图片'),
      submit: name('Submit', '提交'),
      cancel: name('Cancel', '取消'),
      click: name('Click', '按'),
      newPost: name('to create a new post.', '發布新帖子。', '发布新帖子。'),
    }
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
    notReady: name('Proposal function is under development, coming soon in later 2019!', '提案功能正在建設中，將於2019年底推出。', '提案功能正在建设中，将于2019年底推出。'),
  },

  personalCentre: {
    inTransaction: {
      createMarket: name('Paid 2500 SmartUp token to create a market', '支付2500個SmartUp幣創建巿場', '支付2500个SmartUp币创建巿场'),
    },
    inMarket: {
      created: name('Created Markets', '已創建的巿場', '已创建的巿场'),
      saved:name('Saved Markets', '已保存的巿場', '已保存的巿场'),
      subscribed:name('Subscribed Markets', '已參與的巿場', '已参与的巿场'),
    },
    inPost: {
      created: name('Created Posts', '已創建的帖子', '已创建的帖子'),
      saved: name('Saved Posts', '已保存的帖子', '已保存的帖子'),
    },
    inComment: {
      created: name('Created Comments', '已創建的留言', '已创建的留言'),
      saved: name('Saved Comments', '已保存的留言'),
    },
    connectMetaMask: name('You have to connect to Metamask.', '請先連接MetaMask錢包。', '请先连接MetaMask钱包。'),
    personalCentre: name('Personal Centre', '個人中心', '个人中心'),
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