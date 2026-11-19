const initialState = {
    items: [] // empty array 
}


function cartReducer(state, action) {
    switch(action.type) {
        case 'ADD_TO_CART': 
            return {
                ...state,
                items: state.items.some((item) => item.id === action.payload.id) ? 
                    // if the item is already exist then increment the quantity by 1 
                    state.items.map((item) => {
                        if(item.id === action.payload.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }

                        return item;
                    })
                : [
                    ...state.items,
                    {
                        ...action.payload,
                        quantity: 1
                    }
                ]   
            }

        case 'REMOVE_FROM_CART': 
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload) // in the payload we catch the product.id 
            }

        case 'INCREMENT_QUANTITY': 
            return {
                ...state,
                items: state.items.map((item) => item.id === action.payload ? 
                    {...item, quantity: item.quantity + 1}
                : 
                    item
                )
            }
        
        case 'DECREMENT_QUANTITY': 
            return {
                ...state,
                items: state.items.map((item) => item.id === action.payload ? 
                    {...item, quantity: Math.max(1, item.quantity - 1)}
                : 
                    item
                ) 
            }
        
        case 'CLEAR_CART': 
            return {
                ...state,
                items: []
            }

        default: 
            return state;
    }
}

export { initialState, cartReducer }