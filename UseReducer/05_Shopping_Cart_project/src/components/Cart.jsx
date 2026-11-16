import { useCart } from "../contexts/CartContext";

function Cart() {
    const {state, dispatch} = useCart();
    return (
        <>
            <h1>Your Cart Items</h1>
            <p>Your cart has {state.items.length} items.</p>  

            <div>
                {state.items.length > 0 ? 
                    state.items.map(product => (
                        <div key={product.id}>
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <button
                                onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: product.id})}
                            >remove</button>
                        </div>
                    ))
                : 
                    <p>No items on the cart</p>
                }    
            </div>      
        </>
    )
}

export default Cart;