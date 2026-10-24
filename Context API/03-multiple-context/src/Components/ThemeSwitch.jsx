import { useTheme } from "../Context/ThemeContext"

function ThemeSwitch() {
    const {theme, toggleTheme} = useTheme()

    return (
        <button
            onClick={toggleTheme}
        >
            Switch To {theme === 'dark' ? "light" : "dark"}
        </button>
    )
}

export default ThemeSwitch