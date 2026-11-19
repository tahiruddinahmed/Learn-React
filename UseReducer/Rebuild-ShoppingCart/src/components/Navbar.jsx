import { useCart } from "../contexts/CartContext"

function NavBar() {

    const {state} = useCart()

    return (
        <nav>
            <h3>Shopping Cart</h3>

            <div>
                Cart items({state.items.length})
            </div>
        </nav>
    )
}

export default NavBar