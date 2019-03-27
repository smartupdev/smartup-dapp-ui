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
    term: name('Terms of Service')
  }
}