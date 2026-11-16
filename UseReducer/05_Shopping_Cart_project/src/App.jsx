import './App.css'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import { CartProvider } from './contexts/CartContext'

function App() {
 
 return (
  <CartProvider>
    <ProductList />
    <Cart />
  </CartProvider>


 )
}

export default App
