import { useCart } from "../context/CartContext.jsx"
import { Data } from "../data.js"

function Products() {
    const {state, dispatch} = useCart()
    // console.log(Data)
    return (
        <section>
            <h2>All Products: </h2>
            <div style={{display: 'flex', gap: '12px'}}>
                {Data.map(product => (
                    <div style={{
                        border: '1px solid #78787882',
                        padding: '6px 15px'
                    }} 
                        key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                        <button 
                            onClick={() => dispatch({type: 'ADD_TO_CART', payload: product})}
                        >
                            Add To Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>



    )
}

export default Products