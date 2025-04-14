import './App.css'
import Header from './components/Header'
import HeaderImg from './assets/chef-claude.png'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  return (
    <>
     <Header 
      img={HeaderImg}
      title="Chef Claude"
     />

     <Main />
     <Footer />
    </>
  )
}

export default App
