import theme from './reducers/theme';
import user from './reducers/user';
import home from './reducers/home';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    theme,
    user,
    home,
    router: routerReducer
});