import { useState } from 'react'

import './App.css'
import Header from './shared/header/header'
import Login from './shared/login/componentsLoginfalso/Login/login'
import Footer from './shared/footer/footer'

import Main from './pages/main'

import TarjetaPago from './shared/login/componentsLoginfalso/Login/Tarjeta'
export default function App() {
    return (
      <>
        <Header />
        <Login />
        <TarjetaPago />
        <Main />
        <Footer />
      </>
    );
}

