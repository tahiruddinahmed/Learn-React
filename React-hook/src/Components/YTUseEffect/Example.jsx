import { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("effect started")

    return () => {
      console.log('effect clean up')
    }
  }, [count]);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(prev => prev + 1)}>
        +
      </button>
    </>
  );
}


export default Example;