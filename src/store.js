import React, {createContext, useContext, useReducer} from 'react'
import { Provider } from './context'
import userReducer, {initialState as user} from './reducers/user'
import themeReducer, {initialState as theme} from './reducers/theme'

export const cmProvider = ({children}) => 
    <Provider reducer={useReducer} initialState={user}>
        <Provider reducer={themeReducer} initialState={theme}>
            {children}
        </Provider>
    </Provider>


const mainReducer = ({ user, theme }, action) => {
  // middleware goes here, i.e calling analytics service, etc.
  return {
    user: userReducer(user, action),
    theme: themeReducer(theme, action)
  };
}

export const StateContext = createContext()
export const StateProvider = ({children}) =>(
  <StateContext.Provider value={useReducer(mainReducer, { user, theme })}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
