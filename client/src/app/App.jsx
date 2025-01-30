import { useState } from 'react'

import './App.css'
import Header from './shared/header/header'
import Footer from './shared/footer/footer'

import Main from './pages/main'
import Iniciar from './shared/login/Iniciar'
export default function App() {
    return (
      <>
        <Header />
        <Iniciar />
        <Main />
        <Footer />
      </>
    );
}

