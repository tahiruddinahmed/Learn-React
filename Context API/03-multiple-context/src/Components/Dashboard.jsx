import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import ThemeSwitch from "./ThemeSwitch";

function Dashboard() {
    const {user, logout} = useAuth()
    const {theme} = useTheme()

    // store the isDark as boolean based on theme color 
    const isDark = theme === 'dark'

    const dashboardCard = {
        backgroundColor: isDark ? 'black' : 'white',
        padding: "4px 10px",
        color: isDark ? 'white' : 'black',
        borderRadius: "10px",
        boxShadow: `0px 0px 0px 2px ${isDark ? "#f28424" : "#efefef"}`,
        marginTop: "10px",
        transition: 'background-color 200ms, color 200ms, box-shadow 400ms'

    }

    const logoutBtn = {
        border: "none",
        padding: "6px 8px",
        borderRadius: "10px",
        cursor: "pointer",
        background: isDark ? "white" : "black",
        color: isDark ? "black" : "white",
        fontWeight: 700,
        transition: "background-color 200ms, color 200ms"
    }


    return (
        <section >
            <ThemeSwitch/>
            <div style={dashboardCard}>
                <h3>Dashboard</h3>

                <p>Hello, {user ? user.name : 'Guest'}</p>
                {user && (
                    <button style={logoutBtn}
                        onClick={logout}
                    >Logout</button>

                )}

            </div>
        </section>
        
    )
}

export default Dashboard;