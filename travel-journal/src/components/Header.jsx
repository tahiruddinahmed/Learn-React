// import './App.css'
import HeaderImg from '../assets/globe.png'

function Header() {
    return (
        <header className='header'>
            <img src={HeaderImg} className='header-logo' alt="logo" />
            <h1>my travel journal</h1>
        </header>
    )
}

export default Header;