import { memo, useMemo, useState } from "react"


// React.memo can't along prevent re-render the the props are objects or arrays
// in that case we also need to use useMemo 
const Profile = memo(function Profile({info}) {
  console.log("profile component rendered....")
  return (
    <>
      <h3>Hello, {info.user}</h3>

      <button
        onClick={() => info.setCount(prevCount => prevCount + 1)}
      >
        Like {info.count}
      </button>
    </>

  )
})

function App() {
  const [count, setCount] = useState(0)
  const [increment, setIncrement] = useState(0)
  const [user, setUser] = useState("Tahir")

  const values = useMemo(() => {
   return {count, user, setCount} // 

  }, [count, user])

  console.log("App Rendered")
  return (
    <>
      <h1>Context API Performance & Memoization</h1>

      <button
        onClick={() => setIncrement(prev => prev + 1)}
      >
        Click : Count{increment}
      </button>
      <Profile info={values} />
    </>
  )
}

export default App
