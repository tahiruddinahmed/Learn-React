import { StrictMode } from "react";
import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

/**
 * Challenge:
 * Create your very first custom React Component
 * Call it "MainContent" and have it return a simple
 * h1 element that says "React is great!"
 * 
 * Afterward, render it
 */

function MainContent() {
    return (
        <h1>React is great!</h1>
    )
}

createRoot(document.getElementById('root')).render(
    <div>
        <MainContent/>
    </div>
)