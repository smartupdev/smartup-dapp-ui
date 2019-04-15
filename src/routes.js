// import Icon1 from './images/menu1.svg'
// import Icon2 from './images/menu2.svg'
// import Icon3 from './images/menu3.svg'
// import Icon4 from './images/menu4.svg'
import { Menu1, Menu2, Menu3, Menu4 } from './components/Icon/index'

import Home from './containers/Home'
import CreateMarket from './containers/CreateMarket'
import Market from './containers/MarketDetail'
import Account from './containers/Account'
import Dispute from './containers/Dispute'

export default [
  { id: 'Home', path: '/', component: Home, icon: Menu1, selected: true, includePaths: ['/market'], exact: true },
  { id: 'CreateMarket', path: '/create_market', component: CreateMarket, icon: Menu2 },
  { id: 'Market', path: '/market', component: Market },
  { id: 'Account', path: '/account', component: Account, icon: Menu3 },
  { id: 'Dispute', path: '/dispute', component: Dispute, icon: Menu4 },
]
