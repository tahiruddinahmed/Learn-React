import Dashboard from "./components/Dashboard"
import { ContextProvider } from "./contexts/SampleContext"

function App() {

  console.log("app is rendered....")
  return (
    <ContextProvider>
      <Dashboard />

    </ContextProvider>
  )
}

export default App
