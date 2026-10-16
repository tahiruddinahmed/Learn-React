import { useEffect } from "react"

{/*
Use useEffect to log a message to the console whenever the component mounts (i.e., when it’s rendered the first time).    
*/}

function YtExcercise() {
    useEffect(() => {
        console.log('Basic use Effect')
    }, []); // empty dependency array means the effect will run once, when the component is first rendered
    return (
        <h1>From component</h1>
    )
}


export default YtExcercise