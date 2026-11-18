import { useCart } from "../contexts/CartContext";

function Cart() {
    const {state, dispatch} = useCart();

    // calculate subtotal 
    const subtotal = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)


    return (
        <>
            <h1>Your Cart Items</h1>
            <p>Your cart has {state.items.length} items.</p>  

            <div>
                {state.items.length > 0 ? 

                    state.items.map(product => (
                        <>
                        <div key={product.id}>
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <div>Quantity:
                                <button
                                    onClick={() => dispatch({type: 'DECREMENT_QUANTITY', payload: product.id})}
                                >-</button> 
                                {product.quantity}
                                <button
                                    onClick={() => dispatch({type: 'INCREMENT_QUANTITY', payload: product.id})}
                                >+</button>
                            </div>
                            <button
                                onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: product.id})}
                            >remove</button>
                        </div>

                        
                        </>
                    ))

                   
                : 
                    <p>No items on the cart</p>
                }


                {state.items.length > 0 && (
                    <div>
                        SubTotal: {subtotal} 
                    </div>
                )}
                 
            </div>      
        </>
    )
}

export default Cart;