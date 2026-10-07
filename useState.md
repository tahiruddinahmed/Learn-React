# React `useState` — Study Notes

## 1. What is State?

**State** is data that belongs to a React component and can change over time.

When state changes, React can re-render the component so the UI reflects the new value.

Examples of state:

- Counter value
- Form input
- Modal open/closed
- Selected tab
- Loading status
- Logged-in user
- Shopping cart items
- Filters

A useful mental model:

```text
State changes
    ↓
React schedules an update
    ↓
Component renders again
    ↓
New JSX is produced
    ↓
React updates the necessary UI
```

---

# 2. Why `useState` Exists

A normal JavaScript variable does not tell React when it changes.

```jsx
function Counter() {
  let count = 0;

  function increment() {
    count++;
  }

  return (
    <button onClick={increment}>
      {count}
    </button>
  );
}
```

`count` can change as a JavaScript variable, but React does not automatically re-render because the variable changed.

`useState` solves this by giving React a state value and an updater function.

```jsx
const [count, setCount] = useState(0);
```

When `setCount()` is called, React knows that state needs to be updated.

---

# 3. Basic `useState` Syntax

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

The following:

```jsx
const [count, setCount] = useState(0);
```

contains three important concepts:

```text
count       → current state value
setCount    → function used to update the state
0           → initial state
```

`useState()` returns an array containing the current state and its setter.

Conceptually:

```jsx
const state = useState(0);

const count = state[0];
const setCount = state[1];
```

Destructuring is normally used because it is cleaner:

```jsx
const [count, setCount] = useState(0);
```

---

# 4. Different Types of State

`useState` can store many types of JavaScript values.

## Number

```jsx
const [count, setCount] = useState(0);
```

## String

```jsx
const [name, setName] = useState("");
```

## Boolean

```jsx
const [isOpen, setIsOpen] = useState(false);
```

## Array

```jsx
const [skills, setSkills] = useState([
  "HTML",
  "CSS",
  "JavaScript"
]);
```

## Object

```jsx
const [user, setUser] = useState({
  name: "Tahir",
  age: 25
});
```

---

# 5. Updating State

The setter function changes the state.

```jsx
setCount(10);
```

or:

```jsx
setCount(count + 1);
```

For example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </>
  );
}
```

The simplified flow is:

```text
User clicks
    ↓
setCount(...)
    ↓
React schedules state update
    ↓
Component renders again
    ↓
New state is available
    ↓
UI displays new value
```

---

# 6. Functional State Updates

When the new state depends on the previous state, use a functional updater.

```jsx
setCount(prevCount => prevCount + 1);
```

Instead of:

```jsx
setCount(count + 1);
```

Think of the functional form as:

```text
Previous state
      ↓
calculate next state
      ↓
new state
```

Example:

```jsx
function increment() {
  setCount(prevCount => prevCount + 1);
}
```

## When should you use it?

Use a functional update when the next state depends on the previous state.

Examples:

```jsx
setCount(prev => prev + 1);

setCount(prev => prev - 1);

setIsOpen(prev => !prev);
```

---

# 7. Why Functional Updates Matter

Consider:

```jsx
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

If the current render has:

```text
count = 0
```

all three expressions use the same `count` snapshot:

```text
setCount(1)
setCount(1)
setCount(1)
```

The resulting state is:

```text
1
```

Now consider:

```jsx
function handleClick() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

React can process the updates sequentially:

```text
0 → 1
1 → 2
2 → 3
```

Result:

```text
3
```

### Key rule

```jsx
// New state does NOT depend on previous state
setCount(0);

// New state DOES depend on previous state
setCount(prev => prev + 1);
```

---

# 8. State Is a Snapshot

One of the most important React concepts:

> State behaves like a snapshot for a particular render.

Consider:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);

    console.log(count);
  }

  return (
    <button onClick={handleClick}>
      {count}
    </button>
  );
}
```

If the current render has:

```text
count = 0
```

then:

```jsx
setCount(count + 1);
console.log(count);
```

does not mean that `count` immediately becomes `1` inside the current render.

The handler still sees the current snapshot:

```text
count = 0
```

React then performs another render, where the new state is:

```text
count = 1
```

Mental model:

```text
Current render
count = 0
     │
     ├── setCount(1)
     │
     └── console.log(count) → 0
             │
             ↓
       React updates state
             │
             ↓
Next render
count = 1
```

This concept becomes especially important later with:

- `useEffect`
- closures
- stale closures
- asynchronous code
- dependency arrays

---

# 9. Re-rendering

When state is updated, React schedules a new render.

For example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log("Component rendered");

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Initially:

```text
Component rendered
```

After clicking:

```text
setCount(...)
    ↓
React schedules update
    ↓
Counter() runs again
    ↓
count has the new state
```

Important:

> A component function running again is called a re-render.

It does not mean React blindly recreates the entire webpage.

React determines what UI needs to be updated.

---

# 10. State Belongs to React

It is useful to think of state as being preserved by React between renders.

You may write:

```jsx
const [count, setCount] = useState(0);
```

inside the component, but the state value is not simply a normal local variable that gets permanently recreated from scratch each time the function runs.

Conceptually:

```text
React
 │
 └── remembers state for the component
          │
          └── count = current value
```

On subsequent renders, React provides the component with its current state.

---

# 11. Updating Objects in State

Objects should be treated as immutable state.

Example:

```jsx
const [user, setUser] = useState({
  name: "Tahir",
  age: 25
});
```

Do NOT mutate the object directly:

```jsx
user.age = 26; // ❌
```

Instead, create a new object:

```jsx
setUser({
  ...user,
  age: 26
});
```

The spread operator copies the existing properties.

Conceptually:

```text
Old object
{
  name: "Tahir",
  age: 25
}

        ↓ spread + update

New object
{
  name: "Tahir",
  age: 26
}
```

---

# 12. Functional Updates with Objects

When the new object depends on the previous object, a functional update is a strong pattern:

```jsx
setUser(prevUser => ({
  ...prevUser,
  age: prevUser.age + 1
}));
```

This means:

```text
Take previous user
       ↓
copy existing properties
       ↓
calculate new age
       ↓
return new object
```

For a fixed value:

```jsx
setUser(prevUser => ({
  ...prevUser,
  name: "Ahmed"
}));
```

This is also valid, although the previous name is not needed to calculate `"Ahmed"`.

---

# 13. Updating Arrays in State

Arrays should also be treated as immutable state.

Example:

```jsx
const [skills, setSkills] = useState([
  "HTML",
  "CSS",
  "JavaScript"
]);
```

## Add an item

Use the spread operator:

```jsx
setSkills(prevSkills => [
  ...prevSkills,
  "React"
]);
```

Result:

```js
[
  "HTML",
  "CSS",
  "JavaScript",
  "React"
]
```

## Remove an item

Use `filter()`:

```jsx
setSkills(prevSkills =>
  prevSkills.filter(skill => skill !== "CSS")
);
```

Result:

```js
[
  "HTML",
  "JavaScript"
]
```

---

# 14. Common Array Mistake

Do NOT mutate the existing state:

```jsx
skills.push("React"); // ❌
```

or:

```jsx
skills.splice(...); // ❌
```

Instead create a new array:

```jsx
setSkills(prevSkills => [
  ...prevSkills,
  "React"
]);
```

or:

```jsx
setSkills(prevSkills =>
  prevSkills.filter(skill => skill !== "CSS")
);
```

### Important distinction

This:

```jsx
setSkills(prevSkills => [
  prevSkills.filter(skill => skill !== "CSS")
]);
```

creates a nested array:

```js
[
  ["HTML", "JavaScript"]
]
```

because the result of `filter()` is being wrapped inside another array.

Correct:

```jsx
setSkills(prevSkills =>
  prevSkills.filter(skill => skill !== "CSS")
);
```

---

# 15. Immutability Mental Model

When updating objects or arrays:

```text
Do not:

Existing state
    ↓
modify directly


Instead:

Existing state
    ↓
create new object/array
    ↓
set it as the new state
```

Common patterns:

```jsx
// Object
setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));

// Array - add
setItems(prev => [
  ...prev,
  newItem
]);

// Array - remove
setItems(prev =>
  prev.filter(item => item.id !== id)
);

// Array - transform
setItems(prev =>
  prev.map(item => ...)
);
```

---

# 16. Batching

React can batch multiple state updates together.

For example:

```jsx
function handleClick() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

React can process these updates together rather than necessarily performing a separate browser DOM update after every setter.

Conceptually:

```text
setState
setState
setState
   ↓
React processes updates
   ↓
render/update
```

Modern React batches updates in more situations than older React versions did.

The practical lesson is:

> Do not assume a state setter immediately changes the state variable in the current render.

---

# 17. Direct Updates vs Functional Updates

## Direct update

```jsx
setCount(count + 1);
```

Meaning:

> Set the next state to this value.

Useful when you already have the desired value and don't need to calculate it from previous state.

Example:

```jsx
setCount(0);
```

## Functional update

```jsx
setCount(prev => prev + 1);
```

Meaning:

> Calculate the next state using the previous state.

Preferred when the next state depends on the previous state.

---

# 18. When Should I Use `useState`?

Use `useState` when:

1. The value can change over time.
2. The value is relevant to the component.
3. Changing the value should cause the UI to update.

Good examples:

```text
Counter
Modal state
Form input
Selected tab
Loading state
Error state
User data
Cart items
Pagination
Filters
```

---

# 19. When Should I NOT Use `useState`?

Don't put every variable into state.

For example:

```jsx
const firstName = "Tahir";
const lastName = "Ahmed";

const fullName = `${firstName} ${lastName}`;
```

You generally do not need:

```jsx
const [fullName, setFullName] = useState("");
```

if `fullName` can be calculated directly from existing values.

Ask yourself:

> Does this value need to trigger a re-render when it changes?

If not, it may not need to be state.

This idea is often called **derived data** or **derived state**.

---

# 20. Common `useState` Mistakes

## Mistake 1 — Mutating state directly

```jsx
user.age = 26; // ❌
```

Use:

```jsx
setUser(prev => ({
  ...prev,
  age: 26
}));
```

---

## Mistake 2 — Mutating arrays

```jsx
items.push(newItem); // ❌
```

Use:

```jsx
setItems(prev => [
  ...prev,
  newItem
]);
```

---

## Mistake 3 — Incorrectly updating based on old state

Instead of:

```jsx
setCount(count + 1);
```

when multiple dependent updates may occur, prefer:

```jsx
setCount(prev => prev + 1);
```

---

## Mistake 4 — Expecting the state variable to change immediately

```jsx
setCount(10);

console.log(count);
```

Don't assume the console will print `10`.

The current render still has its existing state snapshot.

---

## Mistake 5 — Putting derived values unnecessarily into state

Avoid unnecessary duplicated state.

Instead of maintaining:

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");
```

you can often calculate:

```jsx
const fullName = `${firstName} ${lastName}`;
```

This prevents multiple pieces of state from getting out of sync.

---

# 21. A Complete Practical Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  function decrement() {
    setCount(prev => prev - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={decrement}>
        -
      </button>

      <button onClick={increment}>
        +
      </button>

      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
```

Notice:

```jsx
setCount(prev => prev + 1);
```

because the new value depends on the previous value.

But:

```jsx
setCount(0);
```

because reset does not depend on the previous value.

---

# 22. Core Mental Models

Keep these five ideas in mind.

### Mental Model 1

> **State is data that React remembers between renders.**

### Mental Model 2

> **Calling a state setter schedules an update; it does not magically change the current render's state variable.**

### Mental Model 3

> **Each render sees a snapshot of state.**

### Mental Model 4

> **When the next state depends on the previous state, use a functional updater.**

```jsx
setCount(prev => prev + 1);
```

### Mental Model 5

> **Treat objects and arrays in state as immutable. Create new values instead of mutating existing state.**

---

# 23. Quick Review Checklist

Before moving on from `useState`, you should be able to explain:

- [ ] What state is
- [ ] Why normal variables aren't sufficient for UI state
- [ ] What `useState()` returns
- [ ] What the setter function does
- [ ] What causes a re-render
- [ ] What a state snapshot means
- [ ] Why `setCount(count + 1)` three times doesn't necessarily produce `+3`
- [ ] Why functional updates can produce `+3`
- [ ] How to update objects without mutation
- [ ] How to add/remove items from arrays without mutation
- [ ] What batching means
- [ ] When state is unnecessary
- [ ] When to use direct values vs functional updates

---

# 24. One-Sentence Summary

> **`useState` lets a functional React component store state that React preserves between renders, and updating that state tells React to render the component again with the new state snapshot.**

---

## Next Topic

Once you're comfortable with this, the next Hook is:

# `useEffect`

We'll start with the fundamental question:

> **What is a side effect, and why does React need a Hook specifically for handling it?**

Then we'll gradually build toward:

```jsx
useEffect(() => {
  // effect
}, []);
```

including dependency arrays, cleanup, API requests, and infinite-loop mistakes.
