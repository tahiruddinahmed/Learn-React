
import { useReducer } from 'react';
import './App.css'
import Counter from './components/Counter';

function reducer(state, action) {
  if(action.type === 'increment') {
    return state + 1;
  }

  if(action.type === 'decrement') {
    return state - 1;
  }

  return state;
}

// console.log(reducer(10, "increment"))

console.log("component rendered....")

function App() {
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <>
      <h1>Learning useReducer</h1>
      <p>{count}</p>
      <button
        onClick={() => dispatch({type: 'increment'})}
        style={{marginBottom: '10px'}}
      >
        increment
      </button>
      <button
        onClick={() => dispatch({type: 'decrement'})}
      >
        decrement
      </button>


      <Counter />
    </>
  )
}

export default App
