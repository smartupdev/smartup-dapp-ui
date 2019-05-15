import React, { memo } from 'react'
// import Icon1 from './images/menu1.svg'
// import Icon2 from './images/menu2.svg'
// import Icon3 from './images/menu3.svg'
// import Icon4 from './images/menu4.svg'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
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
import NotFound from './containers/NotFound'

import { connect } from 'react-redux'

// ORDER MATTER
let mainRoutes = [ // main routes, excludsive, using switch
  { id: 'home', path: '/', component: Home, icon: Menu1, iconLabel: 'Home', selected: true, exact: true, isHeader: true },  
  { id: 'market', path: '/market', component: Market, from: 'home', },
  { id: 'createMarket', path: '/create/market', component: CreateMarket, icon: Menu2, iconLabel: 'Create Market', isHeader: true },
  { id: 'account', path: '/account', component: Account, icon: Menu3, iconLabel: 'Personal Center', isHeader: true },
  { id: 'dispute', path: '/dispute', component: Dispute, icon: Menu4, iconLabel: 'Dispute', isHeader: true },

  { id: 'feedback', path: '/feedback', component: Faq, icon: FeedbackButton, iconLabel: 'Feedback us', isFooter: true, onClick: () => {  window.location.href = "mailto:support@smartup.global?subject=See my feedback for SmartUp!"; } },
  { id: 'faq', path: '/faq', component: Faq, icon: FaqButton, iconLabel: 'FAQ', isFooter: true },
  { id: 'notFound', path: '*', component: NotFound, },
]

let marketRoutes = [
  { id: 'trading', path: '/market/trading', component: Trading, from: 'home' },
  { id: 'general', path: '/market/general', component: General, from: 'home' },
  { id: 'discussion', path: '/market/discussion', component: Discussion, from: 'home', exact: true },
  { id: 'discussionDetail', path: '/market/discussion/details', component: DiscussionDetail, from: 'home' },
  { id: 'discussionCreate', path: '/market/discussion/create', component: DiscussionCreate, from: 'home' },
  { id: 'proposal', path: '/market/proposal', component: Proposal, from: 'home' },
  { id: 'flag', path: '/market/flag', component: Flag, from: 'home' },
]

let accountRoutes = [
  { id: 'accountTransaction', label: 'Transaction', path: '/account/transaction', component: AccountTransaction, from: 'account' },
  { id: 'accountMarket', label: 'Market', path: '/account/market', component: AccountMarket, from: 'account' },
  { id: 'accountPost', label: 'Post', path: '/account/post', component: AccountPost, from: 'account' },
  { id: 'accountComment', label: 'Comment', path: '/account/comment', component: AccountComment, from: 'account' },
  { id: 'accountSaved', label: 'Saved', path: '/account/saved', component: AccountSaved, from: 'account' },
]

const routes = [...mainRoutes, ...marketRoutes, ...accountRoutes].map( r => {
  r.value = r.id // mutations
  return r
})
mainRoutes = mainRoutes.map(r => ({
  ...r,
  includePaths: routes.filter(x => x.from === r.id).map(x => x.path)
}))

function MainRoutes() {
  return (
    <Switch>
      {
        mainRoutes.map(({id, path, component, exact}) =>
          <Route key={id} exact={exact} path={path} component={component} />
        )
      }
    </Switch>
  )
}

function MarketRoutes() {
  return (
    <Switch>
      {
        marketRoutes.map(({id, path, component, exact}) =>
          <Route key={id} exact={exact} path={path} component={component} />
        )
      }
    </Switch>
  )
}

function AccountRoutes() {
  return (
    <Switch>
      {
        accountRoutes.map(({ id, exact, path, component }) => 
          <Route key={id} exact={exact} path={path} component={component} />
        )
      }
      <Redirect from={routeMap.account.path} to={routeMap.accountTransaction.path} />
    </Switch>
  )  
}

// mainRoutes from will map to includePaths
export { 
  mainRoutes, marketRoutes, accountRoutes, 
  MainRoutes, MarketRoutes, AccountRoutes,
}
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

function linkProps(history, location, marketId) {
  return {
    goto: routes.reduce( (p, c) => ({
      ...p,
      [c.id]: (params) => history.push(c.path + toParams({id: marketId, ...params}) )
    }), {}),
    history,
    location
  }
}

export function withLink(Component) {
  return connect(mapStateToProps)(withRouter( 
    memo(
      ({ history, location, marketId, ...props }) => 
        <Component {...props} {...linkProps(history, location, marketId)} />
    ))  
  )
}

export const Link = connect(mapStateToProps)(withRouter( 
  ({ history, location, children, marketId }) => children(linkProps(history, location, marketId)) 
))
