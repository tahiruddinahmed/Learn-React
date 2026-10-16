import { useContext } from "react"
import UserProfile from "./UserProfile"
import { UserContext } from "../../App"

function Profile() {
    const user = useContext(UserContext)
    return (
        <>
            <p>{user} : Profile Page</p>
            
            <UserProfile />
        </>
    )
}

export default Profile