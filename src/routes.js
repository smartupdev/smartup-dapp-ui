// import Icon1 from './images/menu1.svg'
// import Icon2 from './images/menu2.svg'
// import Icon3 from './images/menu3.svg'
// import Icon4 from './images/menu4.svg'
import { withRouter } from 'react-router-dom'
import { toParams } from './lib/util/fetch'

import { Menu1, Menu2, Menu3, Menu4 } from './components/Icon/index'

import Home from './containers/Home'
import CreateMarket from './containers/CreateMarket'
import Market from './containers/Market'
import Trading from './containers/Market/Trading'
import General from './containers/Market/General'
import Discussion from './containers/Market/Discussion'
import DiscussionDetail from './containers/Market/DiscussionDetail'
import DiscussionCreate from './containers/Market/DiscussionCreate'
import Proposal from './containers/Market/Proposal'
import Flag from './containers/Market/Flag'
import Account from './containers/Account'
import Dispute from './containers/Dispute'


// ORDER MATTER
let routes = [
  { id: 'home', path: '/', component: Home, icon: Menu1, selected: true, exact: true },
  { id: 'createMarket', path: '/create/market', component: CreateMarket, icon: Menu2 },
  { id: 'account', path: '/account', component: Account, icon: Menu3 },
  { id: 'dispute', path: '/dispute', component: Dispute, icon: Menu4 },

  // market, must hv id as params
  { id: 'market', path: '/market', component: Market, from: 'home', },
  { id: 'trading', path: '/market/trading', component: Trading, from: 'home' },
  { id: 'general', path: '/market/general', component: General, from: 'home' },
  { id: 'discussion', path: '/market/discussion', component: Discussion, from: 'home', exact: true },
  { id: 'discussionDetail', path: '/market/discussion/details', component: DiscussionDetail, from: 'home' },
  { id: 'discussionCreate', path: '/market/discussion/create', component: DiscussionCreate, from: 'home' },
  { id: 'proposal', path: '/market/proposal', component: Proposal, from: 'home' },
  { id: 'flag', path: '/market/flag', component: Flag, from: 'home' },
]

routes = routes.map(r => ({
  ...r,
  includePaths: routes.filter(x => x.from === r.id).map(x => x.path)
}))

// from will map to includePaths
export default routes

// export const MarketTab

// TODO add params checking
export const Link = withRouter( ({ history, location, children }) => children({
  goto: routes.reduce( (p, c) => ({
    ...p,
    [c.id]: (params) => history.push(c.path + toParams(params) )
  }), {}),
  history,
  location
}) )