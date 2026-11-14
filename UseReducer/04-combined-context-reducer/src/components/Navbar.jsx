import { useCart } from "../context/CartContext"

function Navbar() {
    const {state} = useCart();
    return (
        <nav 
            style={{display:'flex', justifyContent: 'space-between'}}
        >
            <h2>My Shopping App</h2>
            
            <p>Cart ({state.items.length}) items</p>
        </nav>
    )
}

export default Navbar