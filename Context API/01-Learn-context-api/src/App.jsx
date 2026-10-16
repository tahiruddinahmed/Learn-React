import { useState, createContext } from "react"
import Dashboard from "./Components/ContextComponents/Dashboard"
import ExcerciseUserContext from "./Components/Excercise/ExcerciseUserContext";
// 1. Create Context 
export const UserContext = createContext()

function App() {
  const user = "Tahir";

  return (
    <>
    {/* 2. Provide the value  */}
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>

     <ExcerciseUserContext />
    </>
  )
}

export default App
