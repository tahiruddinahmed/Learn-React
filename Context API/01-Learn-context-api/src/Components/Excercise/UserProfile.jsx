import { useContext } from "react";
import { UserProvider } from "./ExcerciseUserContext";

function UserProfile() {
    const user = useContext(UserProvider);

    return (
        <h1>Hello, {user}</h1>
    )
}

export default UserProfile;