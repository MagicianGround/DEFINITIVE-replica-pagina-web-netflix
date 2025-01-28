import { useState } from 'react'

import './App.css'
import Header from './shared/header/header'
import Login from './shared/login/loginFalso'
import Footer from './shared/footer/footer'
export default function App() {
    return (
      <div>
        <Header />
        <Login />
        <div>App</div>
        <Footer />
      </div>
    );
}



/*
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
*/
