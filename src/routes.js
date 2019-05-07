// import Icon1 from './images/menu1.svg'
// import Icon2 from './images/menu2.svg'
// import Icon3 from './images/menu3.svg'
// import Icon4 from './images/menu4.svg'
import { withRouter } from 'react-router-dom'
import { toParams } from './lib/util/fetch'

import { MainPageButton as Menu1, ViewMarketButton as Menu2, CreateMarketButton as Menu3, FindMarketButton as Menu4, Faq as FaqButton, FeedbackEmail as FeedbackButton } from './components/Icon/index'

import Home from './containers/Home'
import CreateMarket from './containers/CreateMarket'

import Market from './containers/Market'
import Trading from './containers/Market/Trading'
import General from './containers/Market/General'
import Discussion from './containers/Market/Discussion'
import DiscussionDetail from './containers/Market/Discussion/Detail'
import DiscussionCreate from './containers/Market/Discussion/Create'
import Proposal from './containers/Market/Proposal'
import Flag from './containers/Market/Flag'

import Account from './containers/Account'
import AccountTransaction from './containers/Account/Transaction'
import AccountMarket from './containers/Account/Market'
import AccountPost from './containers/Account/Post'
import AccountComment from './containers/Account/Comment'
import AccountSaved from './containers/Account/Saved'

import Dispute from './containers/Dispute'
import Faq from './containers/Faq'

import { connect } from 'react-redux'

// ORDER MATTER
// if has Icon, show in menu 
let routes = [
  { id: 'home', path: '/', component: Home, icon: Menu1, iconLabel: 'Home', selected: true, exact: true, isHeader: true },  
  { id: 'createMarket', path: '/create/market', component: CreateMarket, icon: Menu2, iconLabel: 'Create Market', isHeader: true },
  { id: 'account', path: '/account', component: Account },

  // market, must have id as params
  { id: 'market', path: '/market', component: Market, from: 'home', },
  { id: 'trading', path: '/market/trading', component: Trading, from: 'home' },
  { id: 'general', path: '/market/general', component: General, from: 'home' },
  { id: 'discussion', path: '/market/discussion', component: Discussion, from: 'home', exact: true },
  { id: 'discussionDetail', path: '/market/discussion/details', component: DiscussionDetail, from: 'home' },
  { id: 'discussionCreate', path: '/market/discussion/create', component: DiscussionCreate, from: 'home' },
  { id: 'proposal', path: '/market/proposal', component: Proposal, from: 'home' },
  { id: 'flag', path: '/market/flag', component: Flag, from: 'home' },

  // account
  { id: 'accountTransaction', label: 'Transaction', path: '/account/transaction', component: AccountTransaction, icon: Menu3, iconLabel: 'Personal Center', isHeader: true },
  { id: 'accountMarket', label: 'Market', path: '/account/market', component: AccountMarket, from: 'accountTransaction' },
  { id: 'accountPost', label: 'Post', path: '/account/post', component: AccountPost, from: 'accountTransaction' },
  { id: 'accountComment', label: 'Comment', path: '/account/comment', component: AccountComment, from: 'accountTransaction' },
  { id: 'accountSaved', label: 'Saved', path: '/account/saved', component: AccountSaved, from: 'accountTransaction' },

  { id: 'dispute', path: '/dispute', component: Dispute, icon: Menu4, iconLabel: 'Dispute', isHeader: true },
  { id: 'feedback', path: '/feedback', component: Faq, icon: FeedbackButton, iconLabel: 'Feedback us', isFooter: true, onClick: () => {  window.location.href = "mailto:support@smartup.global?subject=See my feedback for SmartUp!"; } },
  { id: 'faq', path: '/faq', component: Faq, icon: FaqButton, iconLabel: 'FAQ', isFooter: true },
]

routes = routes.map(r => ({
  ...r,
  includePaths: routes.filter(x => x.from === r.id).map(x => x.path)
}))

// from will map to includePaths
export default routes

export const routeMap = routes.reduce((p, c) => ({...p, [c.id]: c}), {})

export function getPath() {
  return window.location.hash.replace(/#/, '').replace(/\?.+/, '')
}


export function getUrlParams() {
  return window.location.hash.replace(/#.+\?/, '')
    .split('&')
    .reduce( (p, keyVal) => {
      const [key, val] = keyVal.split('=')
      return { ...p, [key]: val }
    }, {})
}

// TODO add params checking
const mapStateToProps = state => ({
  marketId: state.market.currentMarketId,
});

export const Link = connect(mapStateToProps)(withRouter( 
  ({ history, location, children, marketId }) => children({
    goto: routes.reduce( (p, c) => ({
      ...p,
      [c.id]: (params) => history.push(c.path + toParams({id: marketId, ...params}) )
    }), {}),
    history,
    location
  }) 
))
