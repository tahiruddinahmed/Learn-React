

# Day 8 --- React State Management: `useState` vs `useReducer`

**Language:** JavaScript / JSX (not TypeScript)

## 1. Learning goals

By the end of this lesson, you should be able to:

-   Explain the difference between `useState` and `useReducer`.
-   Choose the appropriate hook for a state-management problem.
-   Explain `state`, `action`, `dispatch`, `reducer`, and `payload`.
-   Write a reducer using a `switch` statement.
-   Update state immutably.
-   Manage form fields, validation, loading, success, errors, and reset
    actions.

## 2. `useState` vs `useReducer`

### `useState`

Use `useState` for straightforward state values and updates: a boolean
toggle, counter, search input, selected tab, or dropdown visibility.

``` jsx
import { useState } from "react";

function VisibilityToggle() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <button onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? "Hide" : "Show"}
        </button>
    );
}
```

### `useReducer`

Use `useReducer` when state transitions are more involved, coordinated,
or easier to understand when centralized. Examples include a shopping
cart, multi-step checkout, or a form with several related status
transitions.

``` jsx
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 };
        case "DECREMENT":
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}
```

  -----------------------------------------------------------------------
  `useState`                          `useReducer`
  ----------------------------------- -----------------------------------
  Setter functions update state       Actions are sent with `dispatch`

  Update logic often lives in event   Transition logic is centralized in
  handlers                            a reducer

  Good for simple, independent        Good for coordinated or complex
  updates                             transitions

  Usually less boilerplate            Usually more structure and
                                      boilerplate
  -----------------------------------------------------------------------

**Important:** Having many state variables does not automatically mean
you need `useReducer`. Five independent input values can still use
`useState`. Consider the complexity and relationship between
transitions, not just the number of variables.

## 3. The `useReducer` mental model

A reducer receives the current state and an action, then returns the
next state.

-   **State:** The current data.
-   **Action:** An object describing what should happen.
-   **Action type:** Identifies the operation, e.g. `"UPDATE_EMAIL"`.
-   **Payload:** Data needed to perform the operation.
-   **Reducer:** Calculates and returns the next state.
-   **Dispatch:** Sends an action to React's reducer update mechanism.

Initialize the hook:

``` jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Send an action:

``` jsx
dispatch({
    type: "UPDATE_EMAIL",
    payload: "john@example.com"
});
```

Handle it in the reducer:

``` jsx
case "UPDATE_EMAIL":
    return {
        ...state,
        email: action.payload
    };
```

**Remember:** The component calls `dispatch()`. The reducer receives the
current state and action, calculates the next state, and returns it.
React uses that returned state to render the component again when
appropriate. Do not call the reducer directly to update React state.

## 4. Complete registration form example

This JavaScript/JSX example manages name, email, password, loading,
error, and success. It includes controlled inputs, validation,
submission, and reset behavior.

``` jsx
import { useReducer } from "react";

const initialState = {
    name: "",
    email: "",
    password: "",
    loading: false,
    error: "",
    success: false
};

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_NAME":
            return {
                ...state,
                name: action.payload,
                error: "",
                success: false
            };

        case "UPDATE_EMAIL":
            return {
                ...state,
                email: action.payload,
                error: "",
                success: false
            };

        case "UPDATE_PASSWORD":
            return {
                ...state,
                password: action.payload,
                error: "",
                success: false
            };

        case "SUBMIT":
            return {
                ...state,
                loading: true,
                error: "",
                success: false
            };

        case "SUCCESS":
            return {
                ...state,
                loading: false,
                error: "",
                success: true
            };

        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        case "RESET":
            return initialState;

        default:
            return state;
    }
}

function RegistrationForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function formSubmit(e) {
        e.preventDefault();

        if (
            state.name.trim() === "" ||
            state.email.trim() === "" ||
            state.password.trim() === ""
        ) {
            dispatch({
                type: "ERROR",
                payload: "All fields are required"
            });
            return;
        }

        dispatch({ type: "SUBMIT" });

        // Simulate an asynchronous request.
        setTimeout(() => {
            dispatch({ type: "SUCCESS" });
        }, 1500);
    }

    return (
        <form onSubmit={formSubmit}>
            {state.error && <p role="alert">{state.error}</p>}

            {state.success && (
                <p role="status">Registration successful!</p>
            )}

            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_NAME",
                            payload: e.target.value
                        })
                    }
                    placeholder="Enter your name"
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={state.email}
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_EMAIL",
                            payload: e.target.value
                        })
                    }
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_PASSWORD",
                            payload: e.target.value
                        })
                    }
                    placeholder="Enter your password"
                />
            </div>

            <button type="submit" disabled={state.loading}>
                {state.loading ? "Submitting..." : "Submit"}
            </button>

            <button
                type="button"
                onClick={() => dispatch({ type: "RESET" })}
            >
                Reset
            </button>
        </form>
    );
}

export default RegistrationForm;
```

**Note:** `setTimeout` is only a demonstration of an asynchronous
operation. Replace it with a real API request in an application,
dispatching `SUCCESS` or `ERROR` based on its result. Consider
cancellation or stale responses if the component can unmount while a
request is in progress.

## 5. Immutable state updates

### Correct: return a new object

``` jsx
case "UPDATE_EMAIL":
    return {
        ...state,
        email: action.payload
    };
```

The spread operator copies the existing top-level properties into a new
object. The new `email` value overrides the old one. The original state
object is not modified.

### Incorrect: mutate the existing state

``` jsx
state.email = action.payload;
return state;
```

This directly changes the existing state object and returns the same
object reference. Do not mutate reducer state.

Immutability keeps transitions predictable, avoids modifying data other
code may rely on, and provides a new object reference for a changed
state. Remember that object spread is shallow: for nested objects, copy
each nested level you need to change.

## 6. Why the default case returns `state`

Correct:

``` jsx
default:
    return state;
```

If an action type is not recognized, returning the current state leaves
it unchanged.

Incorrect:

``` jsx
default:
    return;
```

A bare `return` returns `undefined`, not the current state. A reducer
should return a valid next state.

## 7. Form-specific lessons

### Controlled inputs

``` jsx
<input
    value={state.name}
    onChange={(e) =>
        dispatch({
            type: "UPDATE_NAME",
            payload: e.target.value
        })
    }
/>
```

The `value` prop reads from React state. The `onChange` handler
dispatches an action to update it.

### Validate whitespace with `trim()`

``` jsx
if (state.name.trim() === "") {
    // Show a validation error.
}
```

`trim()` removes whitespace at the beginning and end of a string, so an
input containing only spaces is treated as empty.

### Use a semantic form

``` jsx
<form onSubmit={formSubmit}>
    {/* fields */}
    <button type="submit">Submit</button>
</form>
```

Prevent the browser's default form navigation:

``` jsx
function formSubmit(e) {
    e.preventDefault();
}
```

This also supports submitting the form with the Enter key.

### Connect labels and inputs

``` jsx
<label htmlFor="email">Email</label>
<input id="email" name="email" />
```

The `htmlFor` value should match the input's `id`.

### Specify button types inside forms

A `<button>` inside a form defaults to submit behavior if no type is
specified.

Use `type="submit"` for submission and `type="button"` for an action
that must not submit the form:

``` jsx
<button
    type="button"
    onClick={() => dispatch({ type: "RESET" })}
>
    Reset
</button>
```

## 8. Corrections from my practical exercise

These are the mistakes and improvements identified while reviewing my
first implementation.

### 1. Unused `useState` import

**Original:**

``` jsx
import { useReducer, useState } from "react";
```

**Correction:**

``` jsx
import { useReducer } from "react";
```

I had switched to `useReducer` but left the unused `useState` import.
Remove imports that are no longer needed.

### 2. Returning nothing in the default case

**Original:**

``` jsx
default:
    return;
```

**Correction:**

``` jsx
default:
    return state;
```

A reducer should preserve its current state for an unrecognized action,
not return `undefined`.

### 3. Extra semicolon

I initially had an extra semicolon after the `UPDATE_EMAIL` case's
returned object.

**Correction:**

``` jsx
case "UPDATE_EMAIL":
    return {
        ...state,
        email: action.payload
    };
```

This was a code-cleanliness issue, not a state-management logic error.

### 4. Declaring loading state without using it

In the first `useState` version, I declared `loading` but did not update
or display it.

**Correction:** Either remove state that is not needed yet, or implement
the loading transition and use it in the UI.

### 5. Not dispatching the submit action

Initially, successful validation only logged a message.

**Correction:**

``` jsx
dispatch({ type: "SUBMIT" });
```

This starts the loading state and clears a previous error.

### 6. Not completing the loading transition

Setting `loading` to `true` is only half of the flow. The state must
eventually return to `false`.

**Correction:** Add a `SUCCESS` action and ensure both success and error
outcomes set `loading: false`.

``` jsx
case "SUCCESS":
    return { ...state, loading: false };

case "ERROR":
    return {
        ...state,
        loading: false,
        error: action.payload
    };
```

### 7. Reset button accidentally submitting the form

Initially, the reset button had no explicit `type`.

**Correction:**

``` jsx
<button
    type="button"
    onClick={() => dispatch({ type: "RESET" })}
>
    Reset
</button>
```

A button inside a form defaults to submit behavior. Setting
`type="button"` prevents unintended form submission.

### 8. Missing input IDs

Initially, labels had `htmlFor` values but the corresponding inputs did
not have matching IDs.

**Correction:** Add `id="name"`, `id="email"`, and `id="password"` to
the corresponding inputs.

### 9. Password input used text type

**Original:**

``` jsx
<input type="text" />
```

**Correction:**

``` jsx
<input type="password" />
```

This masks the password on screen.

### 10. Validation could handle whitespace better

**Original:**

``` jsx
state.name === ""
```

**Improvement:**

``` jsx
state.name.trim() === ""
```

This catches strings containing only whitespace.

## 9. Concepts I answered correctly

During the lesson, I demonstrated understanding of these concepts:

1.  **Simple boolean toggle:** Choose `useState` because the transition
    is straightforward.
2.  **Shopping cart:** `useReducer` is a good choice because it has
    multiple related actions and more complex transitions.
3.  **Several state variables:** Their number alone does not determine
    the hook; the complexity and relationship of updates matter.
4.  **Reducer action:** An action describes what should happen. It can
    include a `type` and a `payload`.
5.  **Email update:** Use
    `dispatch({ type: "UPDATE_EMAIL", payload: value })`.
6.  **Default case:** Return the current state if no action type
    matches.
7.  **Immutable update:** Spread the existing state into a new object
    instead of mutating it.
8.  **Dispatch versus reducer:** Dispatch sends the action; the reducer
    calculates and returns the next state.

## 10. Final revision checklist

Before moving to the next lesson, make sure I can explain these without
looking at the notes:

-   [ ] When should I use `useState`?
-   [ ] When should I use `useReducer`?
-   [ ] What does `initialState` represent?
-   [ ] What does `dispatch()` do?
-   [ ] What is an action?
-   [ ] What is the purpose of `action.type`?
-   [ ] What is the purpose of `action.payload`?
-   [ ] What does the reducer return?
-   [ ] Why should reducer state be updated immutably?
-   [ ] Why should the default case return `state`?
-   [ ] How do I handle loading, success, and error transitions?
-   [ ] Why should a reset button inside a form use `type="button"`?

## 11. Final takeaway

`useState` and `useReducer` are both React state-management hooks. The
difference is how state updates are organized.

-   Use `useState` for simple, straightforward state updates.
-   Use `useReducer` when related actions and complex state transitions
    benefit from centralized logic.
-   Keep reducer functions predictable and free of side effects.
-   Return new state instead of mutating existing state.
-   Make every action's effect on the state clear.

The goal is not to use `useReducer` everywhere. The goal is to choose
the simplest state-management approach that keeps your component
understandable and maintainable.
