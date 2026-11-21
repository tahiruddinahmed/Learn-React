import useToggle from "../Hooks/useToggle"

function Card() {

    // use the custom hook 
    const [toggle, SetToggle] = useToggle(false)
    
    console.log(toggle)

    return (
        <>
            <button
                onClick={SetToggle}
            >{toggle ? 'OFF' : 'ON'}</button>
        </>
    )
}

export default Card