import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null)


// initial cart state 
const initialState = {
    items: []
}

// cart reducer 
function cartReducer(state, action) {
    switch(action.type) {
        case 'ADD_TO_CART': 
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case 'CLEAR_CART': 
            return {
                ...state,
                items: []
            }
        default: 
            return state
    }
}

export function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const values = {
        state, 
        dispatch
    }

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}

// custom useCart hook 
export function useCart() {
    const context = useContext(CartContext)

    if(context === null) {
        throw new Error("useCart must be used within CartProvider.")
    }

    return context;
}