import { useContext } from "react";
import { userContext } from "../../App2";
import ChangeName from "./ChangeName";

function UserProfile() {
    const {user} = useContext(userContext)
    return (
        <>
            <h3>Profile </h3>
            <p>Name: {user.name}</p>
            <ChangeName />
        </>
    )
}

export default UserProfile;
