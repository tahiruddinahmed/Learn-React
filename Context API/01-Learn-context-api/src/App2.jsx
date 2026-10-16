import { createContext, useState } from "react"
import Dashboard from "./Components/ContextUpdateState/Dashboard";

export const userContext = createContext()

function App2() {
    const [user, setUser] = useState({name: 'Tahir'});


    return (
        <>
            <userContext.Provider value={{user, setUser}}>
                <Dashboard />
            </userContext.Provider>
        </>
    )
}

export default App2


// Combine Context API with useState