# Create ReactFats 

## Project Setup 

 - Create an app component in a seprate App.jsx file which is a sibling to this index.jsx file. 
 - Create a `component` folder
 - create the following components in a seprate files inside the components folder. In each one, just render an `h1` with the name of the component (e.g, return `<h1> navbar goes here<h1/>`);
     - Navbar
     - Main
 
 - Have App component import and render the `Navbar` and `Main` components
 - Import and render the App component inside of index.jsx using ReactDOM 
    - At this point you should hvae your `Navbar goes here` etc. Showing up in the browser.

 - Go to goole fonts and get the "inter" font with the weights 400, 600, and 700. Put the `<link />` to those fonts ABOVE the style.css link in index.html. You may need to do some extra research to figure out how this works if you haven't done it before.


## Styling Navbar 

 - for semantic HTML purposes, the Navbar should render a `<header>` with a `<nav>` nested inside. The image and "ReactFacts" text elements can both be rendered as children inside the `<nav>`

## Styling Main Content 
 - For now, skip 2 aspects of the design and we'll work on them later: 
    1. The colored bullets in the list
    2. The larger gray Ract logo on the side

## Coloring the bullets point: In the list 

```
.facts-list > li {
  padding-block: 10px;
  line-height: 19px;
}

.facts-list > li::marker {
  color: #61DAFB;
  font-size: 1.5rem;
}
```


## Add Background Image 

Don't use an `img` element, but rather set it as the `background-image` of the main element. 

Hint: you'll need to use the following properties: 
    - background-image: url(...)
    - background-repeat
    - background-position