import Icon1 from './images/menu1.svg'
import { Menu1, Menu2, Menu3, Menu4 } from './components/Icon/index'
import Icon2 from './images/menu2.svg'
import Icon3 from './images/menu3.svg'
import Icon4 from './images/menu4.svg'

import Home from './containers/Home'
import CreateMarket from './containers/CreateMarket'
import Account from './containers/Account'
import Dispute from './containers/Dispute'

export default [
  { id: 'Home', path: '/', component: Home, icon: Menu1, selected: true },
  { id: 'CreateMarket', path: '/create_market', component: CreateMarket, icon: Menu2 },
  { id: 'Account', path: '/account', component: Account, icon: Menu3 },
  { id: 'Dispute', path: '/dispute', component: Dispute, icon: Menu4 },
]
