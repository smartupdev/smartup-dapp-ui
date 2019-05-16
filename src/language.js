import React, {createContext, useContext, useState} from 'react'
import { initialLang, languages } from './lang'

const LANG_STORAGE_KEY = 'lang'
function getInitLang() {
  return window.localStorage.getItem(LANG_STORAGE_KEY) || initialLang
}
export const LangContext = createContext()

export const LangProvider = ({children}) => {
  const [lang, setLang] = useState(getInitLang())
  function changeLang(langText) {
    setLang(langText)
    window.localStorage.setItem(LANG_STORAGE_KEY, langText)
  }
  return (
    <LangContext.Provider value={[languages[lang], lang, changeLang]}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext)