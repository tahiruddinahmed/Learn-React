import './App.css'
import CartPage from './components/CartPage'
import Navbar from './components/Navbar'
import Products from './components/Products'
import { CartProvider } from './context/CartContext'


function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Products />
        <CartPage />
      </CartProvider>
    </>
  )
}

export default App
