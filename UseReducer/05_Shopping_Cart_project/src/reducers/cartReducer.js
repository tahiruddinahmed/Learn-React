const initialItems = {
    items: [] // empty items 
};

// reducer function 
function CartReducer(state, action) {
    switch(action.type) {
        case 'ADD_TO_CART': 
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(items => items.id !== action.payload)
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

export {initialItems, CartReducer}