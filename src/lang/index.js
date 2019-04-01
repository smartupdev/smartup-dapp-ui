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
      change: name('23H CHANGE'),
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
        volume: name('Volume(%)')
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
    term: name('Terms of Service')
  }
}