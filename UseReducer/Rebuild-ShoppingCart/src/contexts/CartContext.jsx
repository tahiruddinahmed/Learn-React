import { createContext, useContext, useReducer } from "react";
import { cartReducer, initialState } from "../reducer/CartReducer";

const CartContext = createContext(null)


export function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const values = {state, dispatch}

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}


// custom hook 
export function useCart() {
    const context = useContext(CartContext)

    if(context === null) {
        throw new Error("useCart should be within the cartProvider context")
    }

    return context;
}