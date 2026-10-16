import { createContext } from "react";
import UserProfile from "./UserProfile";

export const UserProvider = createContext();

function ExcerciseUserContext() {
    const user = "Tahir Ahmed";
    
    return (
    <>
        <UserProvider.Provider value={user}>
            <UserProfile />
        </UserProvider.Provider>
    </>
 )
}

export default ExcerciseUserContext;