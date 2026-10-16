import { createContext, useContext, useState } from "react";

// create createContext
const userContext = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState({
        name: 'Tahir',
        age: 23,

    })

    const value = {
        user,
        setUser
    }

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}


// create a custom hook to use the context
// we can create a custom hook in jsx using the `use` in the beginning of the function name  
export function useUser() {
    const context = useContext(userContext)

    if(context === undefined) {
        throw new Error("useUser must be used within UserProvider")
    }

    return context;
}



/*
Notes: 
THIS IS THE MOST IMPORTANT FILE. 
So let's understand it carefully. 


#1. What is UserProvider ? 
UserProvider is a regular React Component that owns the shared state and provides to its descendants. 

e.g: 
<UserProvider>
    <Component /> 
</UserProvider>

Why create a separate Provider Component ? 
Because we can now reuse <UserProvider> wherever we want to make the user state available, rather than wiring the same provider setup 
repeatedly. 

#2. What is useUser ? 
This is a custom hook. 

A custom hook in a javascript function whose name starts with `use` and that can use React hook according to the Rules of Hook 

Our custom hook does 3 things: 
    1. calls useContext(userContext) to read the context. 
    2. Check whether the component is missing the expected provider. 
    3. return the context value. 


Why this is useful? 
Instead of writing this everywhere: 

    const {name, setName} = useContext(userContext)

We can simply write: 

    const {name, setName} = useUser();  // our own custom hook 

This custom hook also provides a clearer error if someone forgots to wrap a components with UseProvider. 


 */