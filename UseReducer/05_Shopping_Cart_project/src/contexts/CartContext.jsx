import { createContext, useContext, useReducer } from "react";
import { CartReducer, initialItems } from "../reducers/cartReducer";

const CartContext = createContext(null)


// provider 
export function CartProvider({children}) {
    const [state, dispatch] = useReducer(CartReducer, initialItems)

    const values = {
        state, dispatch
    };

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
        throw new Error("useCart must be used within CartProvider.")
    }

    return context;
}