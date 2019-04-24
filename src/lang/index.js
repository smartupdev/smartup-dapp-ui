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
      pop: name('Popolous'),
      rich: name('Richest'),
    },
    table: {
      name: name('NAME'),
      change: name('24H CHANGE'),
      price: name('LAST PRICE'),
      volume: name('24H VOLUME'),
      cap: name('FUNDING CAP'),
      graph: name('7D GRAPH')
    }
  },
  panel: {
    tab: {
      portfilio: name('Portfilio'),
      notification: name('Notifications'),
      setting: name('Settings')
    },
    portfilio: {
      wallet: {
        title: name('Market Wallet'),
        id: name('Idea ID'),
        ct: name('# of CT'),
        volume: name('Change(%)')
      },
      marketInfo: {
        title: name('Global market info'),
        totalSmartup: name('Total SMARTUP invested'),
        totalMarket: name('Total number of markets'),
        totalDiscussion: name('Total number of ongoing discussion')
      },
      bookmark: {
        title: name('Bookmark')
      }
    },
    connectButton: name('Connect'),
    term: name('Terms of Service'),
  },
  portfolio: {
    wallet: name('Market Wallet'),
    table: {
      idea: name('Idea ID'),
      ct: name('# of CT'),
      volumn: name('Volume (%)')
    },
    global: name('Global market info'),
    sutInv: name('Total SMARTUP invested'),
    mktNumber: name ('Total number of markets'),
    disNumber: name('Total number of ongoing discussion'),
    bookmark: name('Bookmark')
  },
  notification:{
    day: name('d ago'),
    hour: name('h ago')
  },
  setting: {
    avatar: name('Avatar photo'),
    dragFile: name('Drag files here'),
    changeFile: name('Change files to upload'),
    submit: name('Submit'),
    cancel: name('Cancel'),
    deactivate: name('Deactivate account')
  },
  marketTab: {
    trade: name('Trading'),
    general: name('General'),
    discussion: name('Discussion'),
    proposal: name('Proposal'),
    flag: name('Flag'),
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
    ct: name('NUMBER OF COMMUNITY TOKEN'),
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
      avgPrice: name('AVERAGE PRICE IN SMARTUP'),
      ct: name('CT'),
      buy: name('BUY'),
      sell: name('SELL')
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
      level: name('LEVEL'),
      time: name('JOINED DATE'),
      ct: name('CT OWNED'),
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
  }
}