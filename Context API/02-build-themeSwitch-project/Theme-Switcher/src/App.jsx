import { ThemeProvider, useTheme } from "./Context/ThemeContext"
import Dashboard from "./Components/Dashboard"
import ThemeToggle from "./Components/ThemeToggle";

function App() {
  const {theme} = useTheme()

  // set a boolean isDark 
  const isDark = theme === "dark";

  const styles = {
    backgroundColor: isDark ? "black": "white",
    color: isDark ? "white" : "black",
    minHeight: "100vh",
    padding: "1rem 2rem",
    transition: "background-color 200ms, color 200ms"
  }
  return (
    <main style={styles}>
      <ThemeToggle />
      <h1>Hello there</h1>
      <Dashboard />

    </main>
  )
}

export default App
