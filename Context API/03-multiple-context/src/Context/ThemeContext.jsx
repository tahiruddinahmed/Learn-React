import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(undefined)


export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light")

    function toggleTheme() {
        setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


// create custom hook 
export function useTheme() {
    const context = useContext(ThemeContext)

    if(context === undefined) {
        throw new Error("useTheme must be used within ThemeProvider")
    }

    return context;
}