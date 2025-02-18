// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

// createRoot(document.getElementById('root')).render(
//     <h1 className="header">Hello there</h1>
// )

/*
Challenge - recreate the above line of code in vanilla JS by creating and appending an h1
to our div#root(without using innerHTML)

 - Create a new h1 element
 - Give it some textContent 
 - Give it a class name of "header"
 - append it as a child (using `appendChild`) of the div#root
 */

//  My Code 👇
const div = document.getElementById('root');
const creatEl = document.createElement("h1");
creatEl.textContent = "Hello, I am doing this using vanilla JS"
creatEl.setAttribute("class", "header");
div.appendChild(creatEl);


// Instructor Soluation 👇
const h1 = document.createElement("h1");
h1.textContent = "This is imperative coding";
h1.clasName = "header";
div.appendChild(h1);