const initialItems = {
    items: [] // empty items 
};

// reducer function 
function CartReducer(state, action) {
    switch(action.type) {
        case 'ADD_TO_CART': 
            return {
                ...state,
                items: state.items.some(item => item.id === action.payload.id) ? 
                            state.items.map(item => {
                                if (item.id === action.payload.id) {
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
                items: state.items.filter(items => items.id !== action.payload)
            }

        case 'INCREMENT_QUANTITY': 
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } 

                    return item;
                })
            }

        case 'DECREMENT_QUANTITY': 
            return {
                ...state,
                items: state.items.map(item => {
                    if(item.id === action.payload) {
                        return {
                            ...item,
                            quantity: Math.max(1, item.quantity - 1)
                        }
                    }

                    return item;
                })
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