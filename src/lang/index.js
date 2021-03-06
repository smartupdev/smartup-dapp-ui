import { toToken, clone } from '../lib/util'
import userGuide from './userGuide'
import api from './integratorRelated'

export function name(en, tc, sc) {
  return {
    en,
    tc: tc || sc || en,
    sc: sc || tc || en
  }
}

const main = {
  userGuide,
  api,
  sutSymbol: name('SmartUp'),
  error: {
    notLogin: name('You had not logged in yet.', '請先登入', '请先登入'),
    noWallet: name('Web3 or Ethereum is not supported. Please install MetaMask', '不支援Web3或Etherum，請安裝MetaMask' ,'不支援Web3或Etherum，请安装MetaMask'),
    noAccount: name('Please connect to MetaMask.', '請連結到MetaMask', '请连结到MetaMask'),
    requiredPhoto: name('This is required', '必須上載圖片', '必须上载图片'),
    // The following keys are map BE response. DON'T CHANGE!
    MarketNotExist: name('Market Not Exist', '巿場不存在', '巿场不存在'), 
    MarketIsCreating: name('Market Is Creating', '巿場創建中', '巿场创建中'), 
    MarketIdError: name('Market ID Error', '巿場ID錯誤', '巿场ID错', '巿场ID重复'), 
    NetWorkError: name('NetWork Error', '網絡出現錯誤', '网络出现错误'),
    GasPriceError: name('Gas Price Error', '礦工費出現錯誤', '矿工费出现错误'), 
    EthNotEnough: name('Not Enough Eth', '以太坊不足'), 
    SutNotEnough: name('Not Enough SmartUp', 'SmartUp不足'),
    SignError: name('Sign Error', '登入錯誤', '登入错误'),
  },
  notFound: {
    omg: name('OH MY GOSH! YOU FOUND IT!!!', '來自星際的神秘信號：你在找不明飛行物體嗎？', '噢！你被UFO带到404号星球了！'),
    notExist: name('Looks like the page you are trying to visit does not exists.', '你所瀏覽的頁面不存在', '你所浏览的页面不存在'),
    tryAgain: name('Please check the URL and try again. May the Force be with you.', '請檢查網址再嘗試吧！', '請检查网址再尝试吧！')
  },
  dispute: {
    notReady: name('Dispute function is under development, coming soon in later 2019!', '檢舉功能正在開發中，將於2019年底推出。', '检举功能正在开发中，将于2019年底推出。'),
  },

  result: name('RESULTS', '個搜尋結果', '个搜寻结果'),
  search: name('Search', '搜尋', '搜寻'),
  noResult: name('No record available', '沒有紀錄可顯示', '没有纪录可显示'),
  trade: name('Trade', '交易', '交易'),
  loadMore: name('Load More', '更多'),

  dragFile: {
    dragFile: name('Drag file here', '拖放圖片至此', '拖放图片至此'),
    chooseFile: name('Choose file to upload', '上載更改圖片', '上载更改图片'),
    uploading: name('Uploading file', '上載中', '上载中'),
    fileSizeError: name('File size exceeds the limit allowed(5MB).', '檔案大小超過5MB限制。', '档案大小超过5MB限制'),
    fileTypeError: name('Invalid file type. Only png, gif and jpg is allowed.', '上載檔案只限png, gif 及jpg。', '上载档案只限png，gif和jpg。'),
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
    // tab: {
    //   all: name('All', '全部'),
    //   hot: name('Hottest', '最熱門', '最热门'),
    //   new: name('Newest', '最新'),
    //   pop: name('Populous', '最人氣', '最人气'),
    //   rich: name('Richest', '最富有'),
    // },
    table: {
      name: name('NAME', '名稱', '名称'),
      change: name('24H CHANGE', '24小時漲跌', '24小时涨跌'),
      price: name('SPOT PRICE', '現貨價格', '现货价格'),
      volume: name('24H VOLUME', '24小時成交量', '24小时成交量'),
      cap: name('FUNDING POOL', '總資金量', '总资金量'),
      graph: name('7D GRAPH', '7天圖表', '7天图表'),
      raisedRate: name('FUND RAISED(%)', '已集資(%)', '已集资(%)'),
      time: name('REMINDING TIME', '淨餘時間', '净余时间'),
      fundRasied: name('FUND RASIED', '已集資', '已集资'),
      target:name('TARGET FUNDING POOL', '目標總資金', '目标总资金')
    }
  },

  panel: {
    tab: {
      portfolio: name('Portfolio', '資料', '资料'),
      notification: name('Notifications', '通知'),
      setting: name('Settings', '設定', '设定')
    },
    login: {
      installMetamask: name('Please install or enable the MetaMask browser plug-in from', '請安裝及啟用MetaMask瀏覽器擴充程式:','请安装及启用MetaMask浏览器扩充程式:'),
      login: name('Please login your MetaMask', '請登入MetaMask', '请登入MetaMask'),
      changeNetwork: name('Please change MetaMask network to', '請更改MetaMask網絡至','请更改MetaMask网络至'),
      sign: name('Please sign the message for login purpose', '請在MetaMask簽署登入', '请在MetaMask签署登入'),
      enable: name('Please enable MetaMask', '請啟用MetaMask', '请启用MetaMask'),
      fail: name('Login failed. Please try again later', '無法登入，請稍後再試', '无法登入，请稍后再试'),
      checkMetamask: name('Please check MetaMask.', '請查看MetaMask。', '请查看MetaMask。')
    },
    portfolio: {
      wallet: {
        title: name('Market Wallet', '我的錢包', '我的钱包'),
        id: name('IDEA', '巿場', '巿场'),
        ct: name('TOKENS', '代幣'),
        volume: name('CHANGE', '漲跌', '涨跌')
      },
      marketInfo: {
        title: name('Global Market Information', '平台巿場資訊', '平台巿场信息'),
        totalSmartup: name('Total SMARTUP invested', '總SMARTUP投資額', '总SMARTUP投资额'),
        totalMarket: name('Total number of markets', '巿場數目', '巿场总数目'),
        totalDiscussion: name('Total number of ongoing discussions', '正在討論的帖子', '正在讨论的帖子')
      },
      bookmark: {
        title: name('Bookmarks', '書籤', '书签')
      }

    },
    
    setting: {
      avatar: name('Avatar photo', '個人圖片', '个人图片'),
      userName: name('Username', '用戶名稱', '用户名称'),
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
      equation: name('Token Issue', '代幣發行', '代币发行'),
      deposit: name('Deposit', '按金')
    },
    createMarket: name('CREATE MARKET', '創建巿場', '创建巿场'),
    createDeposit: name('Market creation deposit', '創建巿場按金', '创建巿场按金'),
    marketName: name('Market Name', '巿場名稱', '巿场名称'),
    marketOverview: name('Market Overview', '巿場概要', '巿场概要'),
    marketDetail: name('Detail', '詳情', '详情'),
    symbol: name('Token Symbol', '代幣代碼', '代币代码'),
    period: name('Offering Period - day(s)', '認購期限 - 日數', '认购期限 - 日数'),
    issuePrice: name('Token Offering Price', '代幣發行價', '代币发行价'),
    issueUnit: name('Amount of Token Issue', '代幣發行量', '代币发行量'),
    reserveRatio: name('Token Reserve Ratio', '代幣儲備率', '代币储备率'),
    nameDes: name('Capital sensitive, 3-40 characters, market name cannot be changed.', '區分大小寫，3-40字元，創建後不可更改', '区分大小写，3-40字元，创建后不可更改'),
    overviewDes: name('2000 characters to help new members get to know your market. Overview cannot be changed.', '簡單介紹你的項目，限2000個字元，巿場概要在創建巿場後無法更改', '简单介绍你的项目，限2000个字元，巿场概要在创建巿场后无法更改'),
    detailDes: name('Describe you project in details, inculding plans, timeline, fund allocation, etc.', '詳細解釋你的項目，包括計劃、時間、資金分配等。', '详细解释你的项目，包括计划、时间、资金分配等。'), 
    symbolDes: name('Set a unique token symbol for the issued token. For example, BTC as Bitcoin, ETH as Ethereum, etc.', 'Set a unique token symbol for the issued token. For example, BTC as Bitcoin, ETH as Ethereum, etc.	為發行之代幣設定代幣代碼，如比特幣代碼為BTC、以太幣代碼ETH', '为发行之代币设定代币代码，如比特币代码为BTC、以太币代码ETH'),
    periodDes: name('Set up how many days for offering period', '設定認購期的日數', '设定认购期的日数'),
    issuePriceDes: name('The issue price of the market token', '發行巿場代幣的首次購買價', '发行巿场代币的首次购买价'),
    issueUnitDes: name('The total amount of Market Token is issuing', '發行巿場代幣的數量', '发行巿场代币的数量'),
    reserveRatioDes: name(`Reserve Part of the SmartUp for investors sell the token to the market. 
The buyback price will be the rock bottom price of the market token`, 
    `巿場將儲備部份SmartUp預留用作巿場回購投資者的巿場代幣。
代幣之回收價是此巿場代幣的最低底價。`,
`巿场将储备部份SmartUp预留用作巿场回购投资者的巿场代币。
代币之回收价是此巿场代币的最低底价。`),
    symbolError: name('Invalid', '輸入數值無效', '输入数值无效'),
    periodError: name('Invalid', '輸入數值無效', '输入数值无效'),
    issuePriceError: name('Invalid', '輸入數值無效', '输入数值无效'),
    issueUnitError: name('Invalid', '輸入數值無效', '输入数值无效'),
    reserveRatioError: name('Invalid', '輸入數值無效', '输入数值无效'),
    marketAvatar: name('Market Avatar', '巿場圖像' , '巿场图像'),
    marketCover: name('Market Cover Photo', '巿場封面圖', '巿场封面图'),
    priceEquation: name('Price equation of idea token', '巿場代幣方程', '巿场代币方程'),
    previewCurve: name('Preview', '預覽', '预览'),
    creating: name('MARKET IS CREATING!', '正在創建巿場！', '正在创建巿场！'),
    preview: name('Preview The New Market', '預覽新巿場', '预览新巿场'),
    next: name('Next', '下一步'),
    back: name('Back', '返回'),
    create: name('Create', '創建', '创建')
  },
  
  term: name('Terms of Service', '服務條款', '服务条款'),

  routes: { // must match with src/routes
    home: name('Home', '主頁', '主页'),
    createMarket: name('Create Market', '創建巿場', '创建巿场'),
    account: name('Personal Centre', '個人中心', '个人中心'),
    dispute: name('Dispute', '檢舉', '检举'),
    faq: name('FAQ', '常見問題', '常见问题'),
    userGuide: name('User Guide', '用戶手冊', '用戶手冊'),
    feedback: name('Feedback Us', '意見回饋', '意见回馈'),

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
    agreeTo: name('Agree to ', '同意'),
    needMoreSUT: name('You need more SmartUp to buy Idea tokens', 'SmartUp幣餘額不足，無法交易', 'SmartUp币余额不足，无法交易'), 
    needMoreCT: name('You do not have enough token to sell', '你的巿場代幣餘額不足，無法交易', '你的巿场代币余额不足，无法交易'),
    invalidTransaction: name('Invalid transaction. Please check your MetaMask and network status', '交易無效，請檢查MetaMask及網絡狀況', '交易无效，请检查MetaMask及网络状况'),
    transactionRecord: name('Transaction record will be available after the first transaction made.', '交易紀錄於第一單交易完成後顯示。', '交易纪录于第一单交易完成后显示。'),
    chartNoAvailable: name('Graph will be available after transactions made', '交易圖表將於交易完成後顯示', '交易图表将于交易完成后显示'),
    preview: name('It is for preview. Refresh the page upon you received notification "Market is created".', '這是預覽頁面。請在收到成功"成功創建巿場"通知後重新整理此頁進行交易。', '这是预览页面。请在收到成功“成功创建巿场”通知后重新整理此页进行交易。'),
    yourWallet: name('Your Market Wallet:', '你的巿場錢包', '你的巿场钱包'),
    buyOrder: name('Buy Order', '買入', '买入'),
    buyAmount: name('Amount to Buy', '買入數量', '买入数量'),
    est: name('Est.', '預計', '预计'),
    estGasFee: name('Est.', '預計礦工費', '预计矿工费'),
    presetSellOrder: name('Pre-set Sell Order', '預設賣單', '预设卖单'), 
    sellPrice: name('Sell Price per ', '賣價 每','卖价 每'), 
    orderBook: name('Order Book', '交易掛單', '交易挂单'),
    price: name('Price', '價格', '价格'),
    amount: name('Amount', '數量', '数量',),
    total:name('Total', '總值', '总值'),
    buyOrderAvaliability: name('Buy Order Will Be Avaliable After This Phase', '買單將於下一階段出現', '买单将于下一阶段出现'),
    buy: name('BUY', '買入', '买入'),
    table: {
      buySell: name('BUY/ SELL', '買入/賣出', '买入/卖出'),
      user: name('USER', '用戶', '用户'),
      time: name('TIME', '時間', '时间'),
      avgPrice: name('AVG PRICE IN SMARTUP', 'SMARTUP平均價', 'SMARTUP平均价'),
      ct: name('TOKEN', '代幣', '代币'),
      buy: name('BUY', '買入', '买入'),
      sell: name('SELL', '賣出', '卖出'),
      stage: name('STATUS', '狀態', '状态'),
      stageValue: {  
        pending: name('Pending', '處理中', '处理中'), 
        success: name('Success', '成功'), 
        fail: name('Fail', '失敗', '失败')
      },
    },
    phaseOne: {
      tokenOffering: name('Token Offering Phase', '代幣認購階段', '代币认购阶段'),
      raised: name('RAISED: ', '已集資: ', '已集资: '),
      targetFundingPool: name('TARGET FUNDING POOL', '目標總資金', '目标总资金'),
      offeringPrice: name('OFFERING PRICE', '認購價', '认购价'),
      totalCT: name('TOTAL AMOUNT', '總量', '总量'),
      communityMember: name('COMMUNITY MEMBER', '社群成員', '社群成员'),
      floorPrice: name('MARKET FLOOR PRICE', '巿場底價', '巿场底价'),
      withdrawableFunding: name('WITHDRAWABLE FUNDING', '可調用資金', '可调用资金'),
      hints: name('You will be refunded if this project does not reach its target funding by', `此項目需於限時內成功集資，否則投資將可獲歸還資本。此集資階段將於以下時間結束:`, `此项目需于限时内成功集资，否则投资将可获归还资本。此集资阶段将于以下时间结束:`),
      hintsTwo: name('This market will start trading on main board after meeting the target.', '此巿場在成功集資後將可於主板交易', '此巿场在成功集资后将可于主板交易')
    },
    myOrderBook:{
        myBuyOrder: name('My Buy Order', '我的買單', '我的买单'),
        mySellOrder: name('My Sell Order', '我的賣單', '我的卖单'),
        orderHistory: name('My Order History', '我的訂單紀錄', '我的订单纪录'),
        marketTransaction: name('Market Transaction', '巿場交易紀錄', '巿场交易纪录'),
        time: name('Time', '時間', '时间'),
        amount: name('Amount', '數量', '数量'),
        remained: name('Remainded', '淨餘', '净余'),
        sellPrice: name('Sell Price', '賣價','卖价'),
        buyPrice: name('Buy Price', '買價', '买价'),
        executedPrice: name('Avg. Executed Price', '平均成交價', '平均成交价'),
        estTotal: name('Est. Total', '預計總值', '预计总值'),
        status: name('Status', '狀態', '状态'),
        action: name('Action', '操作'),
        type: name('Type', '種類', '种类'),
        filled: name('Filled', '已成交'),
        price: name('Price', '價格', '价格'), 
        total: name('Total', '總值', '总值')
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
    notReady: name('Proposal function is under development, coming soon in later 2019!', '提案功能正在開發中，將於2019年底推出。', '提案功能正在开发中，将于2019年底推出。'),
  },
  personalCentre: {
    inTransaction: {
      typeTitle: { // MUST match with type
        FirstStageBuyCT: name((ct, sut) => `Buy ${ct} CT`),
        CreateMarket: name((ct, sut) => `Paid ${sut} SmartUp token to create a market`, (ct, sut) => `支付 ${sut} 個SmartUp幣創建巿場`, (ct, sut) => `支付 ${sut} 个SmartUp币创建巿场`),
        BuyCT: name((ct, sut) => `Bought ${ct} market token from ${toToken(sut)} SmartUp token`, (ct, sut) => `買入 ${ct} 巿場代幣，兌換了 ${toToken(sut)} SmartUp幣`, (ct, sut) => ` 买入 ${ct} 巿场代币，兑换了 ${toToken(sut)} SmartUp币`),
        SellCT: name((ct, sut) => `Sold ${ct} market token to ${toToken(sut)} SmartUp token`, (ct, sut) => `賣出 ${ct} 巿場代幣，兌換了 ${toToken(sut)} SmartUp幣`, (ct, sut) => `卖出 ${ct} 巿场代币，兑换了 ${toToken(sut)} SmartUp币`),
        ChargeSut: name( (ct, sut, eth) => `Deposit ${sut}sut` ),
        ChargeEth: name( (ct, sut, eth) => `Deposit ${eth}eth` ),
        WithdrawSut: name( (ct, sut, eth) => `Withdraw ${sut}sut` ),
        WithdrawEth: name( (ct, sut, eth) => `Withdraw ${eth}eth` ),
      },
      typeLabel: { // MUST match with type
        FirstStageBuyCT: name('Buy CT'),
        CreateMarket: name('Market created', '創建巿場', '创建巿场'),
        BuyCT: name('Trade placed (Buy)', '交易(買入)', '交易（买入）'),
        SellCT: name('Trade placed (Sell)', '交易(賣出)', '交易（卖出）'),
        ChargeSut: name(`Deposit sut` ),
        ChargeEth: name(`Deposit eth` ),
        WithdrawSut: name(`Withdraw sut` ),
        WithdrawEth: name(`Withdraw eth` ),
      },
      pending: name('PENDING', '處理中', '处理中'),
      success: name('SUCCESS', '成功'),
      fail: name('FAIL', '失敗', '失败'),
      txhash: name('TXHASH'),
      type: name('Type', '種類', '种类'),
      market: name('Market', '巿場', '巿场'),
      ct: name('Number of market token', '巿場代幣數目', '巿场代币数目'),
      createTime: name('Created on', '創建時間', '创建时间'),
      lastUpdate: name('Last update', '更新時間', '更新时间')
    },
    inMarket: {
      created: name('Created Markets', '你創建的巿場', '你创建的巿场'),
      saved:name('Saved Markets', '保存巿場', '保存市场'),
      subscribed:name('Subscribed Markets', '買入巿場', '买入巿场'),
    },
    inPost: {
      created: name('Your Posts', '你的帖子', '你的帖子'),
      saved: name('Saved Posts', '保存帖子', '保存帖子'),
    },
    inComment: {
      created: name('Your Comments', '你的留言', '你的留言'),
      saved: name('Saved Comments', '保存留言'),
    },
    connectMetaMask: name('You have to connect to MetaMask.', '請先連接MetaMask錢包。', '请先连接MetaMask钱包。'),
    personalCentre: name('Personal Centre', '個人中心', '个人中心'),
  },

  faq: {
    title: name('FAQ', '常見問題', '常见问题'),
  }
}

// const stringMain = JSON.stringify(main)
const en = clone(main)
const tc = clone(main)
const sc = clone(main)

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