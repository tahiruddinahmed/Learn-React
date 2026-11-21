import { useState } from "react";

function useToggle(initialValue) {
    const [val, setVal] = useState(initialValue)

    function toggle() {
        setVal(prev => !prev)
    }

    return [val, toggle]
}

export default useToggle