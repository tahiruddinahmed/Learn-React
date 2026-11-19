import { useCart } from "../contexts/CartContext"
import { Products } from "../Products"

function Product() {
    const {state, dispatch} = useCart()

    // Indian Rupees (automatically uses lakh/crore grouping)
    const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    });

    return (
        <div className="container product-page">
            <h2>All Product</h2>

            <div className="products">
                {Products.length > 0 ? 
                    Products.map(product => (
                        <div className="product-item" key={product.id}>
                           <div className="item-info">
                            <h3>{product.name}</h3>
                            <p>{inrFormatter.format(product.price)}</p>  
                           </div>
                            <button
                                onClick={() => dispatch({type: 'ADD_TO_CART', payload: product})}
                            >Add To Cart</button>
                        </div>
                    ))
            
                : 
                    <p className="align-center italic">No products available.</p>
                }
            </div>
        </div>
    )
}

export default Product