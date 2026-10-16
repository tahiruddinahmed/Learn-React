import { useEffect, useState } from "react";

function CounterEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count ${count}`
    }, [count]);

    return (
        <>
            <h1>Counter Effect </h1>
            <button
                onClick={() => setCount(prev => prev + 1)}
            >
                Click to change the title
            </button>
        </>
    )
}

export default CounterEffect;


{/**
useEffect with Dependencies

Create a new file called CounterEffect.jsx.
Inside this file, create a functional component called CounterEffect.
Use useEffect to update the document title whenever a counter value changes.
Initialize a count state with 0 using useState.
Render a button that increments the count.
Use useEffect to update the document title whenever count changes.
    
*/}