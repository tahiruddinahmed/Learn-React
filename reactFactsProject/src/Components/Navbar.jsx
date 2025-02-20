import reactImg from '../assets/react-logo.png'

function Navbar() {
  return (
      <header className='header'>
        <nav>
          <img src={reactImg} className='header-logo' alt='react-logo' />
          <span className='header-title'>ReactFacts</span>
        </nav>
      </header>
  )
}

export default Navbar