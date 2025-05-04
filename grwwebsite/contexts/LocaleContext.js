// contexts/LocaleContext.js
import { createContext, useContext, useState, useEffect } from 'react'

const LocaleContext = createContext({
  locale: 'en',
  toggle: () => {}
})

export function LocaleProvider({ children }) {
  // always start with a safe default
  const [locale, setLocale] = useState('en')

  // only read from localStorage in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('locale')
      if (stored === 'en' || stored === 'fr') {
        setLocale(stored)
      }
    }
  }, [])

  const toggle = () => {
    setLocale(prev => {
      const next = prev === 'en' ? 'fr' : 'en'
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('locale', next)
      }
      return next
    })
  }

  return (
    <LocaleContext.Provider value={{ locale, toggle }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
