// pages/_app.js
import '../styles/globals.css'
import { LocaleProvider } from '../contexts/LocaleContext'

export default function App({ Component, pageProps }) {
  return (
    <LocaleProvider>
      <Component {...pageProps} />
    </LocaleProvider>
  )
}
