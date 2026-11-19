import './App.css'
import NavBar from './components/Navbar'
import Product from './components/Product'
import Cart from './components/Cart'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <CartProvider>
      <NavBar />
      <Product />
      <Cart />
    </CartProvider>
  )
}

export default App
