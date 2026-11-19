import { useCart } from "../contexts/CartContext";

function Cart() {
    const {state, dispatch} = useCart()

    // subtotal 
    const subTotal = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)

    // Indian Rupees (automatically uses lakh/crore grouping)
    const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    });

    return (
        <div className="container cart-page">
            <h2>Your Cart</h2>
            {state.items.length > 0 && (
                <p className="info italic">You've ({state.items.length}) {state.items.length > 1 ? 'items' : 'item'} in your cart</p>
            )}

            {/* cart items */}
            <div className="cart-items">
                {state.items.length > 0 ? 
                    state.items.map(item => (
                        <div className="cart-item" key={item.id}>
                            <div>
                                <h3>{item.name}</h3>
                                <p>{inrFormatter.format(item.price)}</p>
                                
                            </div>

                            <div className="cart-actions">
                                <div className="quantity-stepper">
                                    <button
                                        onClick={() => dispatch({type: 'DECREMENT_QUANTITY', payload: item.id})}    
                                    >-</button>
                                    <div>{item.quantity}</div>
                                    <button
                                        onClick={() => dispatch({type: 'INCREMENT_QUANTITY', payload: item.id})}
                                    >+</button>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => dispatch({type: 'REMOVE_FROM_CART', payload: item.id})}
                                >Remove</button>
                            </div>

                        </div>
                    ))
                    
                : 
                    <p className="align-center italic">No product is added to cart.</p>
                }
            </div>

            {state.items.length > 0 && (
                <div className="cart-details">
                    
                    <h3>Sub Total</h3>
                    <p>{inrFormatter.format(subTotal)}</p>
                </div>

            )}
        </div>
    )
}

export default Cart;