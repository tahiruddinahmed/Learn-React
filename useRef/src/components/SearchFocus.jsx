import { useRef } from "react"

function SearchFocus() {
    const searchRef = useRef(null)


    return (
        <>
            <input ref={searchRef} type="text" placeholder="search..." />

            <div
                style={{display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '6px'}}
            >
                <button
                    onClick={() => searchRef.current?.focus()}
                >Focus Input</button>
                <button
                    onClick={() => searchRef.current?.blur()}
                >Focus Blur</button>

                <button
                    onClick={() => searchRef.current.value = ""}
                >
                    Clear
                </button>
            </div>
        </>
    )
}


export default SearchFocus