# Creating my first React Project 

## Step 1
create a image element and render a react logo to it. 


Hints: 
    - The React Logo is a file in the project tree, so you can access it by using `src=/src/logo-name.png` in your image element 
    - You can also set the `width` attribute of the image element just like in HTML. set its width to 40px

```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <main>
    <img src="/src/assets/react-logo.png" alt="" width={40} />
    <h1>Fun facts about React!</h1>
    <ul>
      <li>Was first relaese in 2013</li>
      <li>Was originally created by Jordan Walke</li>
      <li>Has well over 200k stars on GitHub</li>
      <li>Powers thousands of enterprise apps, including mobile apps</li>
      <li>Is maintained by Meta</li>
    </ul>
  </main>
)

```