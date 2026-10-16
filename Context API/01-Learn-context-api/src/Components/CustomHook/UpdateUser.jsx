import { useUser } from "../../Context/UserContext";

function UpdateUser() {
    const {user, setUser} = useUser()

    const UpdateAge = () => {
        setUser({
            ...user,
            age: ++user.age
        })
    }


    const ChangeName = () => {
        setUser({
            ...user,
            name: 'Peter'
        })
    }

    return (
        <>
            <button
                onClick={UpdateAge}
            >
                Increment Age
            </button>

            <button
                onClick={ChangeName}
            >
                Change name to Peter
            </button>
        </>
    )
}

export default UpdateUser;