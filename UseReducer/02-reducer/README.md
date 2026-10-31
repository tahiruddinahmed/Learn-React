# Day 7 --- React Reducers: Actions, Payloads, Purity, and Testing


## 1. Day 7 learning goals

-   Design clear reducer actions using action types and payloads.
-   Explain how a reducer receives current state and an action, then
    returns next state.
-   Write pure, predictable reducer functions.
-   Implement payload-based actions.
-   Test reducers directly without rendering React.
-   Test normal cases, edge cases, and unknown actions.
-   Explain mutation, immutable updates, object references, and
    `Object.is()`.
-   Explain why React reducers should return new objects instead of
    mutating existing state.

## 2. Reducer actions: `type` and `payload`

An action describes what happened and may carry data needed by the
reducer.

``` js
const action = {
  type: "incrementBy",
  payload: 5,
};
```

-   **`type`** identifies the operation.
-   **`payload`** carries additional data for that operation.
-   **`dispatch(action)`** sends the action to the reducer when using
    `useReducer`.

`payload` is an ordinary object-property name, not a special JavaScript
or React keyword. You could use another name, such as `amount`, if the
reducer reads that property.

``` js
function counterReducer(state, action) {
  switch (action.type) {
    case "incrementBy":
      return state + action.payload;
    default:
      return state;
  }
}
```

If state is `10` and payload is `5`, the reducer returns `15`.

**Key point:** The action type chooses the operation; the payload
provides the operation's data.

## 3. Reducer execution flow

A reducer receives two arguments:

``` js
function reducer(state, action) {
  // Calculate and return the next state.
}
```

Execution flow:

1.  React (or a direct test call) supplies the current state.
2.  The reducer receives the action.
3.  The reducer checks `action.type`.
4.  It calculates the next state using the current state and any
    required payload.
5.  It returns the next state.

A reducer does not update React state by assigning to a special
variable. It returns the value that should become the next state.

## 4. Pure reducers and predictable results

A **pure function** follows two important rules:

1.  The same inputs produce the same output.
2.  It does not cause side effects or modify data outside its own
    calculation.

``` js
function counterReducer(state, action) {
  switch (action.type) {
    case "incrementBy":
      return state + action.payload;
    default:
      return state;
  }
}
```

Calling this with the same state and action repeatedly returns the same
result:

``` js
counterReducer(10, {
  type: "incrementBy",
  payload: 5,
}); // 15

counterReducer(10, {
  type: "incrementBy",
  payload: 5,
}); // 15
```

The reducer does not remember the previous call. Each call receives the
arguments supplied to that call.

Whether a call is assigned to a variable or placed directly inside
`console.log()` does not change the result:

``` js
const result = counterReducer(10, {
  type: "incrementBy",
  payload: 5,
});

console.log(result); // 15

console.log(
  counterReducer(10, {
    type: "incrementBy",
    payload: 5,
  })
); // 15
```

Both calls receive the same inputs, so both return `15`.

## 5. Build a payload-based counter reducer

  Action type       Behavior
  ----------------- --------------------------------
  `"increment"`     Add 1
  `"decrement"`     Subtract 1
  `"incrementBy"`   Add `action.payload`
  `"reset"`         Return 0
  Unknown action    Return current state unchanged

``` js
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;

    case "decrement":
      return state - 1;

    case "incrementBy":
      return state + action.payload;

    case "reset":
      return 0;

    default:
      return state;
  }
}
```

Key points:

-   Each `case` handles one action type.
-   `return` exits the reducer immediately.
-   The `default` case preserves the current state for unrecognized
    action types.
-   `"increment"` ignores any payload because its implementation always
    adds one.
-   `"incrementBy"` uses the payload.

Example calls:

``` js
counterReducer(5, { type: "increment" }); // 6
counterReducer(5, { type: "decrement" }); // 4
counterReducer(5, {
  type: "incrementBy",
  payload: 3,
}); // 8
counterReducer(5, { type: "reset" }); // 0
counterReducer(5, { type: "unknown" }); // 5
```

## 6. Test reducers without rendering React

A reducer is an ordinary JavaScript function. You can call it directly
without mounting a component, rendering JSX, or using a browser.

Use `console.assert()` to check expected results:

``` js
console.assert(
  counterReducer(5, { type: "increment" }) === 6,
  "Increment test failed"
);

console.assert(
  counterReducer(5, { type: "decrement" }) === 4,
  "Decrement test failed"
);

console.assert(
  counterReducer(5, {
    type: "incrementBy",
    payload: 3,
  }) === 8,
  "IncrementBy test failed"
);

console.assert(
  counterReducer(5, { type: "reset" }) === 0,
  "Reset test failed"
);
```

`console.assert(condition, message)` reports an assertion failure when
the condition is false. It is a simple debugging/testing aid, not a full
testing framework.

### Test edge cases too

``` js
// Reset from a larger value
console.assert(
  counterReducer(100, { type: "reset" }) === 0,
  "Reset test failed"
);

// Unknown action preserves state
console.assert(
  counterReducer(12, { type: "unknown" }) === 12,
  "Unknown action test failed"
);

// Increment by a payload of 7
console.assert(
  counterReducer(0, {
    type: "incrementBy",
    payload: 7,
  }) === 7,
  "IncrementBy payload test failed"
);

// A zero payload leaves the numeric state unchanged
console.assert(
  counterReducer(10, {
    type: "incrementBy",
    payload: 0,
  }) === 10,
  "Zero payload test failed"
);
```

### Test descriptions must match the action

This test does **not** increment by seven:

``` js
counterReducer(0, {
  type: "increment",
  payload: 7,
});
```

The `"increment"` case ignores the payload and adds only one. To test
adding seven, use `"incrementBy"`:

``` js
counterReducer(0, {
  type: "incrementBy",
  payload: 7,
}); // 7
```

**Testing lesson:** A test should verify the intended behavior, not
merely execute without an error.

## 7. Objects, references, and mutation

JavaScript objects are reference values. Assigning an object to another
variable does not automatically create a copy.

``` js
const user = {
  name: "Alex",
  age: 25,
};

const updatedUser = user;

updatedUser.age = 30;

console.log(user.age); // 30
console.log(updatedUser.age); // 30
console.log(Object.is(user, updatedUser)); // true
```

Both variables refer to the same object. Updating the object through
either variable changes the same underlying object.

### Mutation

Mutation means changing an existing object or array rather than creating
a replacement.

This reducer mutates its state:

``` js
function userReducer(state, action) {
  switch (action.type) {
    case "increaseAge":
      state.age = state.age + 1;
      return state;

    default:
      return state;
  }
}
```

The original object is modified, and the same reference is returned.

That is a problem for predictable React state updates. React uses
identity comparisons such as `Object.is()` when determining whether a
state value is unchanged. Returning the same reference after changing
its contents can prevent React from recognizing the update as a new
state value.

## 8. Immutable updates: return a new object

Instead of mutating the existing state object, create and return a new
object:

``` js
function userReducer(state, action) {
  switch (action.type) {
    case "increaseAge":
      return {
        ...state,
        age: state.age + 1,
      };

    default:
      return state;
  }
}
```

Example:

``` js
const user = {
  name: "Alex",
  age: 25,
};

const nextUser = userReducer(user, {
  type: "increaseAge",
});

console.log(user.age); // 25
console.log(nextUser.age); // 26
console.log(Object.is(user, nextUser)); // false
```

The original object remains unchanged. The reducer returns a different
object reference.

### What does `...state` do?

Inside a new object literal:

``` js
return {
  ...state,
  age: state.age + 1,
};
```

-   `...state` copies the original object's enumerable own properties
    into a new object.
-   `age: state.age + 1` sets the new object's age to the updated value.
-   The original object's top-level properties are not changed.

### Shallow-copy warning

Object spread makes a **shallow copy**, not a deep copy. Nested objects
are still shared unless copied too.

``` js
const state = {
  name: "Alex",
  address: {
    city: "Guwahati",
  },
};

const nextState = {
  ...state,
  address: {
    ...state.address,
    city: "Delhi",
  },
};
```

This creates a new outer object and a new `address` object. The original
nested address remains unchanged.

## 9. Understand `Object.is()`

`Object.is()` compares primitive values and object identity.

``` js
const first = { age: 25 };
const second = first;
const third = { age: 25 };

Object.is(first, second); // true
Object.is(first, third);  // false
```

Although `first` and `third` contain the same properties and values,
they are separate objects.

### Three patterns to remember

  Code                     New object?                                 Same reference?
  ---------------------- ------------- -----------------------------------------------
  `const b = a`                     No                                             Yes
  `const b = { ...a }`             Yes                                              No
  `b.age = 30`                      No   Depends on whether `b` shares `a`'s reference

**Remember:** Object equality by reference is different from comparing
object contents.

## 10. Connection to React `useReducer`

A component can connect a reducer to React state:

``` jsx
const initialUser = {
  name: "Alex",
  age: 25,
};

function userReducer(state, action) {
  switch (action.type) {
    case "increaseAge":
      return {
        ...state,
        age: state.age + 1,
      };

    default:
      return state;
  }
}

function UserProfile() {
  const [user, dispatch] = useReducer(
    userReducer,
    initialUser
  );

  return (
    <div>
      <p>{user.name}: {user.age}</p>
      <button
        onClick={() => dispatch({ type: "increaseAge" })}
      >
        Increase age
      </button>
    </div>
  );
}
```

When `dispatch()` is called:

1.  React sends the current state and action to the reducer.
2.  The reducer calculates and returns the next state.
3.  React uses that returned value as the next state.
4.  If the state has a new object reference, React can recognize it as a
    changed value and update the UI.

React may skip a re-render when the next state is `Object.is()`-equal to
the current state. A new object reference is important when an object
state has actually changed.

## 11. Common mistakes to avoid

1.  **Confusing `type` and `payload`:** The type selects the reducer
    case; the payload carries the data.
2.  **Assuming every action uses its payload:** The reducer
    implementation determines whether a payload is used.
3.  **Mutating state:** Avoid assignments such as `state.age = 30`
    inside a reducer.
4.  **Returning the same object after mutation:** This preserves the
    reference and can interfere with React's state-change detection.
5.  **Confusing assignment with copying:** `const next = state` does not
    create a new object.
6.  **Assuming spread makes a deep copy:** Nested objects remain shared
    unless copied separately.
7.  **Writing misleading tests:** Ensure the action type and payload
    actually test the behavior described by the test.

## 12. Quick revision checklist

-   [ ] I can explain the purpose of an action type.
-   [ ] I can explain what a payload contains.
-   [ ] I can trace how a reducer calculates the next state.
-   [ ] I understand why the same inputs to a pure reducer produce the
    same output.
-   [ ] I can implement increment, decrement, incrementBy, reset, and
    default cases.
-   [ ] I can test reducer outputs directly using `console.assert()`.
-   [ ] I can test unknown actions and edge cases.
-   [ ] I understand object mutation.
-   [ ] I can distinguish assignment from creating a new object with
    spread.
-   [ ] I understand how `Object.is()` compares object references.
-   [ ] I can write an immutable update for an object state.
-   [ ] I understand that object spread is shallow.
-   [ ] I can explain why immutable updates matter when using React
    state.

## 13. Day 7 progress status

**Core learning and guided exercises:** Reviewed and completed.

**Final assessment:** Not yet completed. The final assessment should
test conceptual understanding, reducer code analysis, and practical
implementation using object state and immutable updates.

Do not mark Day 7 fully complete until the final assessment has been
passed.
