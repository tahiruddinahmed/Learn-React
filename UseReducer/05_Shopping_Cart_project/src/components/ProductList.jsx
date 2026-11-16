
import { useCart } from "../contexts/CartContext";
import { Products } from "../products"

function ProductList() {
    const {state, dispatch} = useCart();
    return (
        <>
        <h1>All Products: </h1>

        {Products.map(product => (
            <div key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <button 
                    onClick={() => dispatch({type: 'ADD_TO_CART', payload: product})}
                >Add to Cart</button>
            </div>
        ))}
        
        </>
    )
}


export default ProductList