import { memo } from "react"
import { useTheme } from "../contexts/SampleContext"

const Dashboard = memo(function Dashboard() {
    const {theme, setTheme} = useTheme()
    console.log("Dashboard Component rendered....")
  return (
    <div>
        <h2>Dashboard</h2>
        <p>{theme}</p> 


        <button
            onClick={() => setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")}    
        >
            switch to {theme === "light" ? "dark" : "light"}
        </button>
    </div>
  )
})

export default Dashboard
