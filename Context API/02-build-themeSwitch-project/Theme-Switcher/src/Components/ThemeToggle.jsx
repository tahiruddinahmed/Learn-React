import { useTheme } from "../Context/ThemeContext";

function ThemeToggle() {
    const {theme, toggleTheme } = useTheme()

    return (
        <button 
            onClick={toggleTheme}
        >
            Switch to {theme === "light" ? "dark" : "light"}
        </button>
    )
}

export default ThemeToggle