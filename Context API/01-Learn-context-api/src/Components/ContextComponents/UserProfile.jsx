import { useContext } from "react"
import { UserContext } from "../../App"

function UserProfile() {
    // 3. use/read the context value 
    return (
        <UserContext.Consumer>
            {(name) => {
                return (
                    <p>Greetings, {name}</p>
                )
            }}
        </UserContext.Consumer>
    )
}

export default UserProfile