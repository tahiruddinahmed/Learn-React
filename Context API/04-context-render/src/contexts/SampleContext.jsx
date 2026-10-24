import { createContext, useContext, useMemo, useState } from "react";

const themeContext = createContext(undefined)



// provider 
export function ContextProvider({children}) {
    const [theme, setTheme] = useState("light")
    const [count, setCount] = useState(0);

    const values = useMemo(() => {
        console.log("creating context value")

        return {theme, setTheme}
    }, [theme])

    console.log("provider rendered...")
    return (
        <themeContext.Provider value={values}>
            <button
            onClick={() => setCount(prev => prev + 1)}
            >
                Count {count}
            </button>


            {children}
        </themeContext.Provider>
    )
}

// custom hook 
export function useTheme() {
    const context = useContext(themeContext)

    if(context === undefined) {
        throw new Error("useTheme must be within contextProvider");
    }

    return context;
}