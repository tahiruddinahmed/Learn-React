import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider({children}) {
    const [user, setUser] = useState({
        name: 'Tahir Ahmed',
        age: 23,
        role: 'admin'
    });

    // logout 
    function logout() {
        setUser(null)
    }

    const values = {
        user, 
        setUser,
        logout
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


// create a custom hook 
export function useAuth() {
    const context = useContext(AuthContext)

    if(context === null) {
        throw new Error("useAuth must be used within the AuthProvider.")
    }


    return context;
}