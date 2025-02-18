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

## Step 2 (Custom Component)
### challenge (part 1)
 - create a custom `page` component
 - It should return an ordered list with the reasons why you're exited to be learning React
 - Render the page component

My solution 👇
in the `App.jsx' file I created a custom component called `Page`
```
function Page() {
  return (
    <ul>
      <li>Was first relaese in 2013</li>
      <li>Was originally created by Jordan Walke</li>
      <li>Has well over 200k stars on GitHub</li>
      <li>Powers thousands of enterprise apps, including mobile apps</li>
      <li>Is maintained by Meta</li>
    </ul>
  )
}

function App() {
 return (
  <Page />
 )
}
```

### Challenge (part 2)
 - Add a `<header>` element with an `<img />` element
 - Add an `<h1>` with some text describing the page. Place it above the ordered list, then wrap both the `<h1>` and `<ol>` inside a `<main>` element to keep our semantic structure flowing well. 
 - Add a `<footer>` after the list that says: 
    "©️ 2025 <last name here> development. All rights reserved"