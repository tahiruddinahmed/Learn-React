// it will be a files which shares the context among components, which needs it context data

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(undefined)

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light"); 


    function toggleTheme() {
        setTheme((currentTheme) => {
            if(currentTheme === "light") {
                return "dark"
            } else {
                return "light"
            }
        })
    }

    const value = {
        theme,
        toggleTheme
    }


    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}


// create a custom hook 
export function useTheme() {
    const context = useContext(ThemeContext)

    if(context == undefined) {
        throw new Error("useTheme must use within the ThemeProvider")
    }

    return context;
}