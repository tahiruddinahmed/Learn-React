import { useContext } from "react";
import { userContext } from "../../App2";

function ChangeName() {
    const {setUser} = useContext(userContext)

    return (
        <>
            <button
                onClick={() => setUser({name: "John"})}
            >
                Set John
            </button>

            <button
                onClick={() => setUser({name: "Tahir"})}
            >
                Reset Tahir
            </button>
        </>
    )
}

export default ChangeName;