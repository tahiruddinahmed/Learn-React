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

```
function Page() {
  return (
    <>
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
    </>
  )
}
```

## Step 3: Custom Components Parant/Child Components
### Challenge (Part 1)
Move the `header` element from the page component into its own component called `Header`
Then render an instance of the Header Component inside the App component where the `Header` used to be. 


```
function Header() {
  return (
      <header>
        <img src={reactImg} width={40} />
      </header>
  )
}

function App() {
  return (
    <>
      <Header />
      <Page />
    </>
  )
}
```

### Challenge (part 2)
Move the `main` element into its own component called "MainContent" and render that component inside the App Component. 
Do the same with the `footer` element, moving it into a new component called `Footer`

```
function Header() {
  return (
      <header>
        <img src={reactImg} width={40} />
      </header>
  )
}

function MainContent() {
  return (
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
  )
}

function Footer() {
  return (
    <footer>
      <small>&copy;2025 Tahir Ahmed development. All rights reserved</small>
    </footer>
  )
}


function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  )

}
```

## Step 4: Styling with classes
### Mini Challenge
 - Add a `nav` > `ul` > `li` > (x3). The 3 items should say: 
 - `pricing`, `About`, and `Contact`

```
function Header() {
  return (
      <header>
        <img src={reactImg} width={40} />

        <nav>
          <ul>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
  )
}
```

### Challenge (part1): Styling the Navbar
 - using flexbox, line up the `li`s horizontally and put them inline with the react logo

 - Note: for practice's sake, don't select any elements, but use classes for all styling.


### Challenge (part2): style the nav logo 
move the `width` style off the JSX and into CSS with a dedicated className on the img element, and change the width to 55px instead


## Organizing Components
Move all the component to their separate files and import them in App.jsx
