import React, {createContext, useContext, useState} from 'react'
import { initialLang, languages } from './lang'

export const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '繁體中文', value: 'tc' },
  { label: '简体中文', value: 'sc' },
]

const LANG_STORAGE_KEY = 'lang'
const tcList = ['zh-TW', 'zh-HK', 'zh']
const scList = ['zh-CN', 'zh-SG']
function getInitLang() {
  const browserLang = navigator.language
  return window.localStorage.getItem(LANG_STORAGE_KEY) || 
  tcList.includes(browserLang) ? 'tc' : 
  scList.includes(browserLang) ? 'sc' :
  'en'
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