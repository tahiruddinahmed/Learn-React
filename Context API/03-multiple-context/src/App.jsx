import Dashboard from "./Components/Dashboard"
import LandingPage from "./Components/LandingPage"
import { AuthProvider } from "./Context/AuthContext"
import { ThemeProvider } from "./Context/ThemeContext"

function App() {

  return (
    <>
      <LandingPage />

      <AuthProvider>
        <ThemeProvider>
          <Dashboard />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
