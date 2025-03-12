import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import HeaderImg from './assets/chef-claude.png'
import Main from './components/Main'

function App() {
  return (
    <>
     <Header 
      img={HeaderImg}
      title="Chef Claude"
     />

     <Main />
    </>
  )
}

export default App
