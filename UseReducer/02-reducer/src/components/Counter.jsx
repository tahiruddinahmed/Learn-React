import { useReducer } from "react";

function counterReducer(state, action) {
    switch(action.type) {
        case 'increment':
            return state + 1;
        case 'decrement': 
            return state - 1;
        case 'incrementBy': 
            return state + action.payload;
        case 'reset': 
            return 0;
        default: 
            return state;
    }

}

console.assert(
    counterReducer(5, {type: "increment"}) === 6,
    "Increment test failed" 
);

// write tests 
// 1. Reset a state of 100 and expect 0.
console.assert(
    counterReducer(100, {type: "reset"}) === 0,
    "Reset test failed"
)

// 2. Pass an unknown action type with a state of 12 and expect 12.
console.assert(
    counterReducer(12, {type: "unknown"}) === 12,
    "Unknown action type test failed"
)

// 3. Increment a state of 0 by a payload of 7 and expect 7.
console.assert(
    counterReducer(0, {type: "incrementBy", payload: 7}) === 7,
    "increment payload test failed"
);

function Counter() {
    const [count, dispatch] = useReducer(counterReducer, 0)

    return (
        <>
            <h1>Counter</h1>
            <p>count: {count}</p>

            <div>
                <button onClick={() => dispatch({type: 'increment'})}>increment</button>
                <button onClick={() => dispatch({type: 'decrement'})}>decrement</button>
                <button onClick={() => dispatch({type: 'incrementBy', payload: 5})}>Increment by 5</button>
                <button onClick={() => dispatch({type: 'reset'})}>reset</button>
            </div>    
        </>
    )
}

export default Counter;