export const currentLang = 'en' // TODO

function name(en, tc, sc) {
  return {
    en,
    tc: tc || sc || en,
    sc: sc || tc || en
  }
}

export default {
  result: name('RESULTS'),
  search: name('Search'),
  trade: name('Trade'),
  home: {
    tab: {
      all: name('All'),
      hot: name('Hottest'),
      new: name('Newest'),
      pop: name('Populous'),
      rich: name('Richest'),
    },
    table: {
      name: name('NAME'),
      change: name('24H CHANGE'),
      price: name('SPOT PRICE'),
      volume: name('24H VOLUME'),
      cap: name('FUNDING POOL'),
      graph: name('7D GRAPH')
    }
  },
  panel: {
    tab: {
      portfolio: name('Portfolio'),
      notification: name('Notifications'),
      setting: name('Settings')
    },
    portfolio: {
      wallet: {
        title: name('Market Wallet'),
        id: name('IDEA'),
        ct: name('TOKENS'),
        volume: name('CHANGE')
      },
      marketInfo: {
        title: name('Global Market Information'),
        totalSmartup: name('Total SMARTUP invested'),
        totalMarket: name('Total number of markets'),
        totalDiscussion: name('Total number of ongoing discussions')
      },
      bookmark: {
        title: name('Bookmarks')
      }
    },
    connectButton: name('Connect'),
    term: name('Terms of Service'),
  },
  portfolio: {
    wallet: name('Market Wallet'),
    table: {
      idea: name('IDEA'),
      ct: name('TOKEN'),
      volumn: name('VOLUME')
    },
    global: name('Global Market Information'),
    sutInv: name('Total SMARTUP invested'),
    mktNumber: name ('Total number of markets'),
    disNumber: name('Total number of ongoing discussions'),
    bookmark: name('Bookmarks')
  },
  notification:{
    day: name('d ago'),
    hour: name('h ago')
  },
  setting: {
    avatar: name('Avatar photo'),
    dragFile: name('Drag file here'),
    changeFile: name('Change file to upload'),
    submit: name('Submit'),
    cancel: name('Cancel'),
    deactivate: name('Deactivate account')
  },
  marketTab: {
    trade: name('Trading'),
    general: name('General'),
    discussion: name('Discussions'),
    proposal: name('Proposals'),
    flag: name('Dispute'),
    search: name('Search'),
  },
  trading: {
    period: name('7D'),
    low: name('low'),
    high: name('high'),
    change: name('24H CHANGE'),
    price: name('LAST PRICE'),
    volume: name('24H VOLUME'),
    cap: name('FUNDING POOL'),
    ct: name('NUMBER OF IDEA TOKEN MINTED'),
    tradeTitle: name('Trade Token(s)'),
    tradeText: name('You are performing token trading.'),
    tradePay: name('PAY With'),
    tradeReceive: name('RECEIVE'),
    tradeButton: name('Trade'),
    trans: name('Recent Transactions'),
    table: {
      buySell: name('BUY/ SELL'),
      user: name('USER'),
      time: name('TIME'),
      avgPrice: name('AVG PRICE IN SMARTUP'),
      ct: name('TOKEN'),
      buy: name('BUY'),
      sell: name('SELL'),
      stage: name('STATUS')
    }
  },
  discussion: {
    post: name('Posted by'),
    day: name('d ago'),
    hour: name('h ago'),
    reply: name('reply'),
    feedback: name('feedback'),
    like: name('like'),
    dislike: name('dislike'),
    share: name('share'),
    save: name('save'),
    replies: name('more replies'),
    vote: name('VOTE'),
  },
  general: {
    info: name('Information'),
    createTime: name('Create time'),
    creator: name('Creator'),
    overview: name('Overview'),
    rule: name('Rules'),
    sub: name('Subscribers'),
    table: {
      name: name('NAME'),
      rank: name('RANK'),
      time: name('JOINED DATE'),
      ct: name('TOKEN OWNED'),
    }
  },
  proposal: {
    createTime: name('Create time'),
    creator: name('Creator'),
    remain: name('Remaining time'),
    desp: name('description'),
    option: name('Options'),
    vote: name('VOTE'),
    amt: name('Amount'),
    approve: name('APPROVE'),
    decline: name('DECLINE'),
    para: name('Parameters'),
    from: name('from'),
    to: name('to'),
  },
  faq: {
    title: name('FAQ'),
  }
}