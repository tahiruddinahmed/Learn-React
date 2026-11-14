# React + JavaScript Learning Journey — Day 9

## Topic: Combining Context API and useReducer

**Week:** 2 — Context + Reducer  
**Estimated learning time:** 90 minutes  
**Status:** Completed

---

# 1. Learning Goal

Understand how to combine React Context API and `useReducer` to share complex state across multiple components without prop drilling.

**Hands-on milestone:** Create a `CartProvider` that exposes `state` and `dispatch` through a custom hook called `useCart()`.

---

# 2. Context API vs useReducer

These are two different React concepts that work together.

## Context API

Context API allows us to share values with descendant components without passing props through every intermediate component.

It helps solve **prop drilling**.

Example:

```jsx
const CartContext = createContext(null);
```

## useReducer

`useReducer` manages state transitions based on dispatched actions.

It returns two values:

```jsx
const [state, dispatch] = useReducer(
    reducer,
    initialState
);
```

- `state`: Current state.
- `dispatch`: Function used to send actions to the reducer.

## Why combine them?

In a shopping cart application:

- Context API shares cart data across components.
- `useReducer` manages how the cart data changes.
- `CartProvider` connects both concepts.

**Remember:**

> Context shares the state, while useReducer manages the state transitions.

---

# 3. Why use CartProvider?

Imagine three components:

- Navbar
- Products
- CartPage

All three need access to the same shopping cart.

If each component maintains its own cart state, we can encounter synchronization problems.

For example:

```text
Navbar       → Cart State A
Products     → Cart State B
CartPage     → Cart State C
```

These are independent states.

Instead, we create one shared reducer inside `CartProvider`.

```text
              CartProvider
              useReducer()
                   |
             Shared State
              /    |    \
          Navbar Products CartPage
```

All descendant components consume the same Context value.

**Important:** Calling `useCart()` in multiple components does not create multiple reducers.

---

# 4. Initial Cart State

Our initial state:

```jsx
const initialState = {
    items: []
};
```

Why use an array?

- A cart can contain multiple products.
- Each product is represented by an object.
- The number of products can change dynamically.

Example product:

```jsx
{
    id: 1,
    name: "Laptop",
    price: 50000,
    quantity: 1
}
```

Example cart state:

```jsx
const initialState = {
    items: [
        {
            id: 1,
            name: "Laptop",
            price: 50000,
            quantity: 1
        }
    ]
};
```

Initially, `items` is an empty array because the cart starts without products.

---

# 5. Cart Reducer

A reducer receives:

1. Current state.
2. An action.

It returns the next state.

Our reducer supports two actions.

## ADD_TO_CART

```jsx
case "ADD_TO_CART":
    return {
        ...state,
        items: [...state.items, action.payload]
    };
```

This creates a new array containing the existing products and the new product.

### Important mistake I made

Initially, I wrote:

```jsx
items: action.payload
```

This replaces the entire items array with the new product.

For example, if the cart contains a Laptop and we add a Mouse, the Laptop gets lost.

### Correct approach

```jsx
items: [...state.items, action.payload]
```

This preserves the existing products and appends the new one.

## CLEAR_CART

```jsx
case "CLEAR_CART":
    return {
        ...state,
        items: []
    };
```

This creates a new state object and clears the items array.

Why use `...state`?

It preserves other state properties that might be added in the future.

## Default case

```jsx
default:
    return state;
```

If an unknown action is dispatched, return the current state unchanged.

---

# 6. Understanding Immutability

We should not directly modify the existing reducer state.

Incorrect:

```jsx
state.items.push(action.payload);

return state;
```

Correct:

```jsx
return {
    ...state,
    items: [...state.items, action.payload]
};
```

The correct approach creates:

- A new state object.
- A new items array.
- An unchanged previous state.

**Key takeaway:** Return new objects and arrays instead of directly mutating existing state.

---

# 7. Creating CartContext

```jsx
const CartContext = createContext(null);
```

Why `null`?

`null` is the default Context value.

If a component consumes this Context without a matching Provider above it, it receives `null`.

Important distinction:

- `createContext()` creates the Context object.
- It does not create or manage the cart state.
- Importing Context alone does not make the cart state available.

A component must be inside the matching Provider and consume the Context using `useContext()` or our custom hook.

---

# 8. Building CartProvider

CartProvider is responsible for:

1. Owning the shared reducer state.
2. Making `state` and `dispatch` available through Context.
3. Wrapping its child components.

## Understanding children

Example:

```jsx
<CartProvider>
    <Navbar />
    <Products />
    <CartPage />
</CartProvider>
```

The components inside `CartProvider` are received through the `children` prop.

## Initializing useReducer

```jsx
const [state, dispatch] = useReducer(
    cartReducer,
    initialState
);
```

The reducer is initialized once per mounted CartProvider instance.

## Providing the values

```jsx
const values = {
    state,
    dispatch
};
```

Then:

```jsx
<CartContext.Provider value={values}>
    {children}
</CartContext.Provider>
```

Both `state` and `dispatch` are shared with descendant components.

---

# 9. Creating the Custom useCart Hook

Instead of writing this in every component:

```jsx
const { state, dispatch } = useContext(CartContext);
```

We create a custom hook:

```jsx
export function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error(
            "useCart must be used within CartProvider."
        );
    }

    return context;
}
```

## Benefits of a custom hook

1. **Less repetitive code:** Components can simply call `useCart()`.
2. **Error handling:** We can detect when the hook is used outside the Provider.
3. **Reusability:** Context access logic is written once and reused.
4. **Cleaner components:** Components don't need to import both `CartContext` and `useContext`.

Why return the entire context?

Because our Context value contains both:

```jsx
{
    state,
    dispatch
}
```

Returning the entire context makes both available.

---

# 10. Complete CartContext.jsx

This is the implementation completed during Day 9.

```jsx
import {
    createContext,
    useContext,
    useReducer
} from "react";

const CartContext = createContext(null);

// Initial cart state
const initialState = {
    items: []
};

// Cart reducer
function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                items: [...state.items, action.payload]
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

// Cart Provider
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(
        cartReducer,
        initialState
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

// Custom useCart hook
export function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error(
            "useCart must be used within CartProvider."
        );
    }

    return context;
}
```

---

# 11. Connecting CartProvider to App.jsx

We wrap all components that need access to the cart.

```jsx
import { CartProvider } from "./context/CartContext";

function App() {
    return (
        <CartProvider>
            <Navbar />
            <Products />
            <CartPage />
        </CartProvider>
    );
}

export default App;
```

Now all three components can access the same cart state.

If Navbar is outside CartProvider, it cannot access the shared cart using `useCart()`.

---

# 12. Creating the Components

## Navbar.jsx

Responsibility: Display the number of products in the cart.

```jsx
import { useCart } from "../context/CartContext";

function Navbar() {
    const { state } = useCart();

    return (
        <>
            You've {state.items.length} items in your cart.
        </>
    );
}

export default Navbar;
```

Important:

Navbar only needs `state` because it reads the cart count.

## Products.jsx

Responsibility: Display products and add them to the cart.

```jsx
import { useCart } from "../context/CartContext";
import { Data } from "../data.js";

function Products() {
    const { dispatch } = useCart();

    return (
        <section>
            <h2>All Products:</h2>

            <div style={{ display: "flex", gap: "12px" }}>
                {Data.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>

                        <button
                            onClick={() =>
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: product
                                })
                            }
                        >
                            Add To Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Products;
```

Important concepts:

- `.map()` renders the products.
- `key={product.id}` gives each rendered item a stable key.
- `dispatch()` sends an action to the reducer.
- `payload` carries the product data.

Why use an arrow function in `onClick`?

```jsx
onClick={() => dispatch(...)}
```

It ensures dispatch executes when the user clicks the button, not immediately during rendering.

## CartPage.jsx

Responsibility: Display cart products and clear the cart.

```jsx
import { useCart } from "../context/CartContext";

function CartPage() {
    const { state, dispatch } = useCart();

    return (
        <>
            <h1>Your Cart</h1>

            <div>
                {state.items.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                    </div>
                ))}

                <button
                    onClick={() =>
                        dispatch({ type: "CLEAR_CART" })
                    }
                >
                    Clear {state.items.length}
                </button>
            </div>
        </>
    );
}

export default CartPage;
```

CartPage needs both:

- `state` to display the products.
- `dispatch` to clear the cart.

---

# 13. Understanding the Complete Data Flow

Suppose Products dispatches:

```jsx
dispatch({
    type: "ADD_TO_CART",
    payload: {
        id: 4,
        name: "Monitor",
        price: 15000
    }
});
```

The flow:

1. Products calls `dispatch()`.
2. The action reaches the reducer managed by `useReducer`.
3. `cartReducer` receives the current state and action.
4. The reducer returns a new state containing the Monitor.
5. React updates the reducer state in CartProvider.
6. The Context Provider makes the updated value available.
7. Navbar and CartPage receive the updated Context value.
8. Navbar displays the updated cart count.

**Important:** React updates the component output and reconciles the DOM. We don't manually update the DOM.

---

# 14. Important Mistakes and Corrections

| Mistake | Correct understanding |
|---|---|
| Using `items: action.payload` | Use `[...state.items, action.payload]` |
| Thinking Context manages state | Context shares values; useReducer manages state transitions |
| Thinking importing Context gives access | A matching Provider must be above the consumer |
| Exposing only `state` | Expose both `state` and `dispatch` |
| Creating a separate reducer in each consumer | Use one shared reducer inside CartProvider |
| Thinking useCart creates a new reducer | It only reads the existing Context value |
| Directly modifying state | Return new objects and arrays |

---

# 15. Day 9 Practice Questions

These are the questions asked during the lessons.

## Lesson 1 — Context and Reducer Fundamentals

**Q1.** Why should `CartProvider` use `useReducer` instead of keeping separate cart state in every component?

**Q2.** Why do we need Context API if we already have `useReducer`?

**Q3.** What should `CartProvider` make available to its child components: only `state`, only `dispatch`, or both? Explain why.

**Q4.** If Navbar and CartPage both read cart data using `useCart()`, are they reading from the same reducer state or separate reducer states? Explain why.

## Lesson 2 — Architecture

**Q5.** Why do we put `useReducer` inside `CartProvider` instead of inside Products, Navbar, and CartPage individually?

**Q6.** What is the difference between `CartContext` and `CartProvider`?

**Q7.** Why are we using an array for `items` instead of a single object?

**Q8.** Why should the initial `items` value be an empty array?

**Q9.** Should we directly modify `initialState.items` when adding a product later? Why or why not?

## Lesson 3 — Context and Provider

**Q10.** Why do we use `createContext(null)` instead of directly putting `initialState` inside `createContext()`?

**Q11.** Does creating `CartContext` automatically make the cart state available to every component? Explain.

**Q12.** If Navbar imports CartContext but is rendered outside CartProvider, what happens when it calls `useContext(CartContext)`?

## Lesson 4 — Custom Hook

**Q13.** Why create a custom `useCart()` hook instead of directly using `useContext(CartContext)` in every component?

**Q14.** Why return the entire `context` from `useCart()` instead of returning only `context.state`?

**Q15.** What happens if a component calls `useCart()` outside `CartProvider`?

## Lesson 5 — Application Architecture

**Q16.** If Navbar is placed outside CartProvider, can it access the cart using `useCart()`?

**Q17.** If Products dispatches `ADD_TO_CART`, will Navbar receive the updated cart state? Explain why.

**Q18.** Why wrap components in App.jsx instead of creating a separate `useReducer` inside each component?

---

# 16. Day 9 Final Assessment

These were the five final assessment questions.

### Q1. Context API vs useReducer

What is the main difference between Context API and `useReducer`? Explain why we combine them in our shopping cart application.

**Expected understanding:**

Context API shares values with descendants, while `useReducer` manages state transitions through actions.

### Q2. Explain the data flow

Suppose Products dispatches:

```jsx
dispatch({
    type: "ADD_TO_CART",
    payload: {
        id: 4,
        name: "Monitor",
        price: 15000
    }
});
```

Explain the complete flow, starting from dispatch until Navbar displays the updated cart count.

**Expected understanding:**

Dispatch → Reducer → New State → CartProvider → Context consumers → Updated Navbar.

### Q3. Custom hook

Why did we create a custom `useCart()` hook instead of using `useContext(CartContext)` directly in every component? Mention at least two benefits.

**Expected understanding:**

- Less repetitive code.
- Reusable Context access logic.
- Error handling.
- Cleaner component code.

### Q4. Missing dispatch

Consider:

```jsx
function CartProvider({ children }) {
    const [state, dispatch] = useReducer(
        cartReducer,
        initialState
    );

    return (
        <CartContext.Provider value={{ state }}>
            {children}
        </CartContext.Provider>
    );
}
```

What is wrong if Products needs to add products to the cart? How would you fix it?

**Expected answer:**

The Provider exposes only `state`, not `dispatch`.

Fix:

```jsx
<CartContext.Provider value={{ state, dispatch }}>
    {children}
</CartContext.Provider>
```

### Q5. Separate reducer instance

A developer creates:

```jsx
function Products() {
    const [state, dispatch] = useReducer(
        cartReducer,
        initialState
    );

    // ...
}
```

But Navbar and CartPage are already consuming the cart through `useCart()`.

Why is this architecture problematic?

**Expected answer:**

Products now has an independent reducer instance.

Dispatching an action updates its local state, not the reducer state inside CartProvider.

Navbar and CartPage will not receive that update through Context.

We should use the shared `dispatch` from `useCart()` instead.

---

# 17. Day 9 Final Takeaways

Remember these core principles:

1. Context API helps avoid prop drilling.
2. `useReducer` manages complex state transitions.
3. CartProvider owns the shared reducer state.
4. Context Provider exposes both `state` and `dispatch`.
5. `useCart()` makes Context consumption simpler and safer.
6. All descendant consumers read from the same Provider value.
7. Reducers should return new state objects and arrays.
8. Never create unnecessary independent reducer instances for components that should share the same cart.

## The most important sentence

**CartProvider owns the state, Context shares the state, and useCart makes accessing that shared state convenient.**

---

# 18. Day 9 Completion Record

| Item | Status |
|---|---|
| Context API fundamentals | Completed |
| useReducer fundamentals | Completed |
| Initial state | Completed |
| Reducer implementation | Completed |
| Immutable updates | Completed |
| CartContext creation | Completed |
| CartProvider implementation | Completed |
| Custom useCart hook | Completed |
| Navbar implementation | Completed |
| Products implementation | Completed |
| CartPage implementation | Completed |
| Final assessment | Reviewed |

**Day 9: Completed**

**Next topic — Day 10:** Add and Remove Products from the Shopping Cart.

We will build on the Cart Context architecture created today.