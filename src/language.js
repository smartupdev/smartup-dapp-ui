import React, {createContext, useContext, useState} from 'react'
import { initialLang } from './lang'

export const LangContext = createContext()

export const LangProvider = ({children}) => {
  const [lang, setLang] = useState(initialLang)
  return (
    <LangContext.Provider value={[lang, setLang]}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext)