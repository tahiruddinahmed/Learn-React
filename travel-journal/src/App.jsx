import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Entry from './components/Entry.jsx'

function App() {
  return (
    <>
     <Header />
     <div className='container'>
        <Entry />
        <Entry />
     </div>
    </>
  )
}

export default App
