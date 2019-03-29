import Icon1 from './images/menu1.svg'
import Icon2 from './images/menu2.svg'
import Icon3 from './images/menu3.svg'
import Icon4 from './images/menu4.svg'

import Home from './containers/Home'
import Market from './containers/Market'
import Account from './containers/Account'
import Dispute from './containers/Dispute'


export default [
  { id: 'Home', path: '/', component: Home, icon: Icon1, selected: true },
  { id: 'Market', path: '/market', component: Market, icon: Icon2 },
  { id: 'Account', path: '/account', component: Account, icon: Icon3 },
  { id: 'Dispute', path: '/dispute', component: Dispute, icon: Icon4 },
]
