import { useReducer } from "react";


// define the reducer function 
function reducer(state, action) {
    // Increment
    if(action.type === 'increment') {
        return state + 1;
    }

    // decrement 
    if(action.type === 'decrement') {
        return state - 1;
    }

    // reset 
    if(action.type === 'reset') {
        return 0;
    }

    return state;
}

function Counter() {
 const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
        <h2>Counter</h2>

        <p>Count: {count}</p>

        <div>
            <button
                onClick={() => dispatch({type: 'increment'})}
            >
                Increment
            </button>

            <button
                onClick={() => dispatch({type: 'decrement'})}
            >
                Decrement
            </button>

            <button onClick={() => dispatch({type: 'reset'})
            }>Reset</button>
        </div>
    </div>
  )
}


export default Counter;
