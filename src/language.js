import React, {createContext, useContext, useState} from 'react'
import { languages } from './lang'

export const languageOptions = [
  { label: 'English', labelShort: 'Eng', value: 'en' },
  { label: '繁體中文', labelShort: '繁體', value: 'tc' },
  { label: '简体中文', labelShort: '简体', value: 'sc' },
]

const LANG_STORAGE_KEY = 'lang'
const tcList = ['zh-TW', 'zh-HK', 'zh']
const scList = ['zh-CN', 'zh-SG']
function setLangStore(langText) {
  window.localStorage.setItem(LANG_STORAGE_KEY, langText)
  return langText
}
export function getLang() {
  const browserLang = navigator.language
  const storedLang = window.localStorage.getItem(LANG_STORAGE_KEY)
  if(storedLang) return storedLang
  return setLangStore((
    tcList.includes(browserLang) ? 'tc' : 
    scList.includes(browserLang) ? 'sc' :
    'en'
  ))
}
export const LangContext = createContext()

export const LangProvider = ({children}) => {
  const [lang, setLang] = useState(getLang())
  function changeLang(langText) {
    setLang(langText)
    setLangStore(langText)
  }
  return (
    <LangContext.Provider value={[languages[lang], lang, changeLang]}>
      {children}
    </LangContext.Provider>
  );
}
export const getRawLang = () => languages[getLang()]
export const useLang = () => useContext(LangContext)
export const LangConsumer = LangContext.Consumer