// pages/_app.js
import "../styles/globals.css";
import { LocaleProvider } from "../contexts/LocaleContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <LocaleProvider>
      <Head>
        {/* Using the existing image files from public/images directory */}
        <link rel="icon" href="/images/iconlogo.jpg" />
        <link rel="icon" type="image/jpeg" href="/images/iconlogo.jpg" />
        <link rel="apple-touch-icon" href="/images/iconlogo.jpg" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}
