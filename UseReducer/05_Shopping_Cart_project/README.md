# Day 10 -- Shopping Cart: Add and Remove Products

## Learning goals

-   Add products to a shopping cart.
-   Remove products from a shopping cart.
-   Clear the cart.
-   Update arrays and objects immutably.
-   Manage cart state with `useReducer`.
-   Share cart state through Context API and a custom hook.

All exercises used **JavaScript + React**, not TypeScript.

## 1. Immutable array updates

React state should not be directly mutated. Create a new array or object
when updating state.

### Add a product

``` jsx
const updatedCart = [
  ...cart,
  { id: 4, name: "Monitor", price: 15000 }
];
```

`...cart` copies the existing elements into a new array, then the new
product is appended. The original `cart` is unchanged.

### Remove a product

``` jsx
const updatedCart = cart.filter(
  item => item.id !== 2
);
```

`filter()` returns a new array containing only items that pass the
condition. Here, all products except those with ID `2` remain.

  Method           Mutates original array?
  -------------- -------------------------
  `push()`                             Yes
  `pop()`                              Yes
  `splice()`                           Yes
  `filter()`                            No
  `map()`                               No
  `[...array]`                          No

`push()` is valid JavaScript, but directly using it to mutate an array
held in React state is not the right state-update approach.

### Reference equality

``` jsx
const updatedCart = [...cart];

console.log(cart === updatedCart); // false
```

The arrays may contain the same elements, but they are different array
references.

With three original products and one added product:

``` jsx
cart === updatedCart       // false
cart.length                // 3
updatedCart.length         // 4
```

## 2. Understanding useReducer

``` jsx
const [state, dispatch] = useReducer(
  cartReducer,
  initialState
);
```

-   `state` is the current reducer state.
-   `dispatch` sends an action to the reducer.
-   `cartReducer` determines the next state.
-   `initialState` is the starting state.

### Dispatching an action

``` jsx
dispatch({
  type: "ADD_TO_CART",
  payload: {
    id: 1,
    name: "Laptop",
    price: 50000
  }
});
```

The action object contains:

-   `type`: tells the reducer what operation to perform.
-   `payload`: contains the data needed for that operation.

In this example, `action.payload` is the one product object being added,
not the entire cart.

The reducer checks `action.type` in a `switch` statement. If no case
matches, the `default` case returns the existing state.

A component calls `dispatch()` rather than manually calling the reducer.
React's `useReducer` manages the reducer and state-update process.

Conceptually: 1. A component calls `dispatch(action)`. 2. React passes
the current state and action to the reducer. 3. The reducer returns the
next state. 4. React updates the reducer state and schedules rendering
where needed.

## 3. Cart reducer

The reducer developed during Day 10 supports adding, removing, and
clearing products.

``` jsx
const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [
          ...state.items,
          action.payload
        ]
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          item => item.id !== action.payload
        )
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
}

export { initialState, cartReducer };
```

### ADD_TO_CART

``` jsx
return {
  ...state,
  items: [...state.items, action.payload]
};
```

Two levels are copied: 1. `...state` creates a new state object. 2.
`...state.items` creates a new items array.

If only `...state` were used, the existing `items` array would be
carried over unchanged; the new product would not be added.

### REMOVE_FROM_CART

``` jsx
return {
  ...state,
  items: state.items.filter(
    item => item.id !== action.payload
  )
};
```

-   `item` is one individual product in the array.
-   `item.id` is the current product's ID.
-   `action.payload` is the ID to remove.
-   Products with a different ID are kept.

If the requested ID is not in the array, no item is removed. `filter()`
still returns a new array, and the reducer returns a new state object.

**Duplicate-ID behavior:** If multiple products have the same ID, this
filter removes all of them. The current implementation assumes product
IDs uniquely identify products in the cart.

### CLEAR_CART

``` jsx
return {
  ...state,
  items: []
};
```

This creates a new state object and assigns a new empty array.

Avoid:

``` jsx
state.items.length = 0;
```

That directly mutates the existing array.

### default

``` jsx
default:
  return state;
```

Returning the current state ensures an unrecognized action does not
accidentally change the state.

## 4. Context API integration

The cart state is managed in one provider and shared with components
through Context.

### CartContext.jsx

The implementation developed during the exercise:

``` jsx
import {
  createContext,
  useContext,
  useReducer
} from "react";

import {
  CartReducer,
  initialItems
} from "../reducers/cartReducer";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    CartReducer,
    initialItems
  );

  const values = {
    state,
    dispatch
  };

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      "useCart must be used within CartProvider."
    );
  }

  return context;
}

export { CartProvider, useCart };
```

**Naming note:** This code preserves the names used in the original
exercise (`CartReducer` and `initialItems`). A conventional naming style
would be `cartReducer` and `initialState`. The import/export names must
match the actual reducer file.

### Important correction

An initial attempt used:

``` jsx
const context = useContext(CartProvider);
```

This was incorrect because `useContext()` must receive the Context
object, not the custom provider component.

Correct:

``` jsx
const context = useContext(CartContext);
```

  -----------------------------------------------------------------------
  Name                                Purpose
  ----------------------------------- -----------------------------------
  `CartContext`                       Context object created by
                                      `createContext()`

  `CartContext.Provider`              Provider that supplies the context
                                      value

  `CartProvider`                      Custom component that wraps the app
                                      and initializes the reducer

  `useContext(CartContext)`           Reads the value supplied by the
                                      matching provider

  `useCart()`                         Custom hook for consuming the cart
                                      context
  -----------------------------------------------------------------------

The `null` default value allows the custom hook to detect use outside
the provider and throw a helpful error.

## 5. App integration

``` jsx
import "./App.css";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <ProductList />
      <Cart />
    </CartProvider>
  );
}

export default App;
```

Both components are descendants of the same provider, so they access the
same reducer state and dispatch function.

## 6. ProductList component

The product list reads the shared `dispatch` function and sends an
`ADD_TO_CART` action when a button is clicked.

``` jsx
import { useCart } from "../contexts/CartContext";
import { Products } from "../products";

function ProductList() {
  const { dispatch } = useCart();

  return (
    <>
      <h1>All Products:</h1>

      {Products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>

          <button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: product
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  );
}

export default ProductList;
```

Key ideas: - `map()` renders each product. - `key={product.id}` gives
each rendered item a stable key, assuming IDs are unique. - The click
handler dispatches an action. - `payload: product` sends the selected
product object. - `ProductList` does not own the cart state; the
provider's reducer manages it.

## 7. Cart component

``` jsx
import { useCart } from "../contexts/CartContext";

function Cart() {
  const { state, dispatch } = useCart();

  return (
    <>
      <h1>Your Cart Items</h1>
      <p>Your cart has {state.items.length} items.</p>

      <div>
        {state.items.length > 0 ? (
          state.items.map(product => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>Price: {product.price}</p>

              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product.id
                  })
                }
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
    </>
  );
}

export default Cart;
```

Key ideas: - `state.items.length` displays the number of cart entries. -
Conditional rendering shows either the products or an empty-cart
message. - The Remove button sends the product ID as the action
payload. - The reducer performs the actual state update.

## 8. Application architecture

``` text
App
└── CartProvider
    ├── ProductList
    │   └── dispatch(ADD_TO_CART)
    │
    └── Cart
        ├── Reads state.items
        └── dispatch(REMOVE_FROM_CART)
```

  Part             Responsibility
  ---------------- ---------------------------------------------------
  `cartReducer`    Defines how cart state changes
  `CartProvider`   Initializes reducer and shares its values
  `useCart`        Provides convenient access to Context
  `ProductList`    Displays products and dispatches add actions
  `Cart`           Displays cart items and dispatches remove actions
  `App`            Wraps the application in the provider

## 9. Mistakes and corrections from Day 10

### Mistake 1: Accessing the wrong property

Incorrect:

``` jsx
items => items.payload.id != state.items.id
```

Correct:

``` jsx
item => item.id !== action.payload
```

Why: - The filter callback receives one individual product. - The
product has an `id` property. - The action payload contains the ID to
remove. - `state.items` is an array, not an individual product.

### Mistake 2: Passing the provider component to useContext

Incorrect:

``` jsx
useContext(CartProvider);
```

Correct:

``` jsx
useContext(CartContext);
```

Why: `useContext()` consumes the Context object created by
`createContext()`.

### Mistake 3: Understanding the payload

``` jsx
dispatch({
  type: "ADD_TO_CART",
  payload: product
});
```

Here, `action.payload` contains the selected product object, not the
entire cart.

### Improvement to consider later

The current reducer permits duplicate product entries. Also, removing by
product ID removes every matching entry. A more realistic cart can store
a quantity for each unique product.

## 10. Revision questions

Try answering these without looking at the notes.

1.  What is the difference between `useState` and `useReducer`?
2.  Why should we avoid directly mutating React state?
3.  What does the spread operator do in `ADD_TO_CART`?
4.  Why is `filter()` useful for removing products?
5.  What is the responsibility of a reducer?
6.  What information does `dispatch()` send?
7.  What is the difference between `action.type` and `action.payload`?
8.  Why do we use Context API with `useReducer`?
9.  What is the difference between `CartContext` and `CartProvider`?
10. Why did we create a custom `useCart()` hook?
11. Why does `useContext()` receive `CartContext` rather than
    `CartProvider`?
12. What happens if we try to remove a product ID that doesn't exist?
13. What happens if two cart entries have the same ID with the current
    removal logic?
14. Why does the `default` case return `state`?

## 11. Day 10 completion checklist

-   [x] Understand immutable array updates.
-   [x] Add products using the spread operator.
-   [x] Remove products using `filter()`.
-   [x] Clear cart using an empty array.
-   [x] Implement a reducer with three actions.
-   [x] Connect `useReducer` to Context API.
-   [x] Create a custom `useCart()` hook.
-   [x] Wrap the app with `CartProvider`.
-   [x] Build `ProductList`.
-   [x] Build `Cart`.
-   [x] Test adding and removing products.

## 12. Next: Day 11

**Topic: Shopping Cart -- Quantity Management**

Planned concepts: - Increase product quantity. - Decrease product
quantity. - Handle quantity reaching zero. - Calculate item subtotals. -
Calculate the cart total. - Continue using immutable reducer updates.

**Day 10 takeaway:** The reducer manages how the cart changes, Context
makes the reducer state and dispatch available to components, and
components dispatch actions rather than directly modifying the cart
state.