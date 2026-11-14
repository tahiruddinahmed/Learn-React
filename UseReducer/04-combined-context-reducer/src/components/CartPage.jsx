import { useCart } from "../context/CartContext"

function CartPage() {
    const {state, dispatch} = useCart()

    console.log(state.items)
    return (
        <>
            <h1>Your Cart</h1>

            <div>

                {state.items.length === 0 ? (
                    <p>Cart is empty.</p>
                )
                :
                state.items.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>price: {product.price}</p>
                    </div>
                ))
                
                }

                <button
                    onClick={() => dispatch({type: 'CLEAR_CART'})}
                >Clear {state.items.length}</button>

            </div>
        </>
    )
}

export default CartPage