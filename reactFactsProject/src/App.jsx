import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import reactImg from './assets/react-logo.png'
import './App.css'


function Page() {
  return (
    <div>
      <header>
        <img src={reactImg} width={40} />
      </header>
      <main>
        <h1>Fun facts about React!</h1>

        <ul>
          <li>Was first relaese in 2013</li>
          <li>Was originally created by Jordan Walke</li>
          <li>Has well over 200k stars on GitHub</li>
          <li>Powers thousands of enterprise apps, including mobile apps</li>
          <li>Is maintained by Meta</li>
        </ul>
      </main>

      <footer>
        <small>&copy;2025 Tahir Ahmed development. All rights reserved</small>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Page />
  )

}

export default App
