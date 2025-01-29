import { useState } from 'react'

import './App.css'
import Header from './shared/header/header'
import Login from './shared/login/loginFalso'
import Footer from './shared/footer/footer'

import Main from './pages/main'

export default function App() {
    return (
      <>
        <Header />
        <Login />
        <Main />
        <Footer />
      </>
    );
}



/*
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
*/
