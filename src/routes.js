import React, { memo, lazy, Suspense } from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { toParams } from './lib/util/fetch'

import { MainPageButton as Menu1, ViewMarketButton as Menu2, CreateMarketButton as Menu3, FindMarketButton as Menu4, Faq as FaqButton, FeedbackEmail as FeedbackButton, Language, UserGuide as UserGuideLogo } from './components/Icon/index'

import { connect } from 'react-redux'

import { LanguageMenu, FeedbackMenu } from './components/Header/Menu'

// For delaying the component created
const Home = lazy(() => import('./containers/Home'))
const CreateMarket = lazy(() => import('./containers/CreateMarket'))
const Market = lazy(() => import('./containers/Market'))
const Trading = lazy(() => import('./containers/Market/Trading'))
const General = lazy(() => import('./containers/Market/General'))
const Discussion = lazy(() => import('./containers/Market/Discussion'))
const DiscussionDetail = lazy(() => import('./containers/Market/Discussion/Detail'))
const DiscussionCreate = lazy(() => import('./containers/Market/Discussion/Create'))
const Proposal = lazy(() => import('./containers/Market/Proposal'))
const Flag = lazy(() => import('./containers/Market/Flag'))
const Account = lazy(() => import('./containers/Account'))
const AccountTransaction = lazy(() => import('./containers/Account/Transaction'))
const AccountMarket = lazy(() => import('./containers/Account/Market'))
const AccountPost = lazy(() => import('./containers/Account/Post'))
const AccountComment = lazy(() => import('./containers/Account/Comment'))
const AccountSaved = lazy(() => import('./containers/Account/Saved'))
const Dispute = lazy(() => import('./containers/Dispute'))
const Faq = lazy(() => import('./containers/Faq'))
const userGuide = lazy(() => import('./containers/userGuide'))
const NotFound = lazy(() => import('./containers/NotFound'))

// ORDER MATTER
let mainRoutes = [ // main routes, exclusive, using switch
  { id: 'home', path: '/', component: Home, icon: Menu1, selected: true, exact: true, isHeader: true },  
  { id: 'market', path: '/market', component: Market, from: 'home', },
  { id: 'createMarket', path: '/create/market', component: CreateMarket, icon: Menu2, isHeader: true },
  { id: 'account', path: '/account', component: Account, icon: Menu3, isHeader: true },
  { id: 'dispute', path: '/dispute', component: Dispute, icon: Menu4, isHeader: true },
  { id: 'faq', path: '/faq', component: Faq, icon: FaqButton, isHeader: true },
  { id: 'userGuide', path: '/user-guide', component: userGuide, icon: UserGuideLogo, isHeader: true },

  { id: 'language', icon: Language, isFooter: true, menuComponent: LanguageMenu },
  { id: 'feedback', icon: FeedbackButton, isFooter: true, menuComponent: FeedbackMenu, startFromBottom: true },
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

function RouteComponent(r, defaultFrom, defaultTo) {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        {
          r.map(({id, path, component, exact}) =>
            <Route key={id} exact={exact} path={path} component={component} />
          )
        }
        { defaultFrom && defaultTo && <Redirect from={defaultFrom} to={defaultTo} /> }
      </Switch>
    </Suspense>
  )
}

function MainRoutes() {
  return RouteComponent(mainRoutes)
}

function MarketRoutes() {
  return RouteComponent(marketRoutes)
}

function AccountRoutes() {
  return RouteComponent(accountRoutes, routeMap.account.path, routeMap.accountTransaction.path)
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

export const goto = routes.reduce( (p, c) => ({
  ...p, 
  [c.id]: params => window.location.href = `${window.location.origin}${window.location.pathname}#${c.path}${toParams({params})}`
}), {})

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
  return connect(mapStateToProps)(
    withRouter( 
      memo(
        ({ history, location, marketId, ...props }) => 
          <Component {...props} {...linkProps(history, location, marketId)} />
      )
    )  
  )
}


export const Link = connect(mapStateToProps)(withRouter( 
  ({ history, location, children, marketId }) => children(linkProps(history, location, marketId)) 
))
