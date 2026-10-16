# React Context API — Revision Notes

React Context lets components share data without passing the same prop through every intermediate component. It is useful for app-wide or tree-wide information such as a theme, signed-in user, language, or UI preferences.

> Context is a way to **make shared data available** to a component subtree. It is not a replacement for every prop or every state-management tool.

## 1. The problem: prop drilling

**Prop drilling** happens when a value must be passed through components that do not need it, only so a deeply nested component can finally use it.

```jsx
function App() {
  const theme = "dark";
  return <Layout theme={theme} />;
}

function Layout({ theme }) {
  return <Sidebar theme={theme} />;
}

function Sidebar({ theme }) {
  return <ThemeButton theme={theme} />;
}

function ThemeButton({ theme }) {
  return <button className={theme}>Save</button>;
}
```

`Layout` and `Sidebar` receive `theme` even though they do not use it. Context can remove those unnecessary passing steps.

### When normal props are still better

Use props when data is needed by a direct child or a small, explicit part of the UI. Props make a component's dependencies easy to see. Reach for Context when many nested components need the same data.

## 2. Create a context with `createContext`

Create the context outside any component—usually in its own file.

```jsx
// src/context/ThemeContext.jsx
import { createContext } from "react";

export const ThemeContext = createContext(null);
```

`createContext(defaultValue)` creates a context object. The default value is only used when a consumer has **no matching Provider above it**. Using `null` is helpful because it makes a missing Provider easier to detect.

## 3. Share a value with a Provider

A Provider supplies a value to every descendant that reads that context.

```jsx
import { ThemeContext } from "./context/ThemeContext";

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Layout />
    </ThemeContext.Provider>
  );
}
```

- `<ThemeContext.Provider>` sets the context value.
- `value` is the data to share.
- Only components **inside** the Provider can read that supplied value.
- A nested Provider can override an outer Provider for its own subtree.

## 4. Read context with `useContext`

`useContext` reads the value from the closest matching Provider above the component.

```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeButton() {
  const theme = useContext(ThemeContext);

  return <button className={theme}>Save</button>;
}
```

Now `Layout` and `Sidebar` do not need a `theme` prop. `ThemeButton` asks for it directly.

> Hooks, including `useContext`, must be called at the top level of a React function component or custom Hook—not inside a loop, condition, or nested function.

## 5. Context + `useState`: sharing state and actions

Context becomes especially useful when one Provider owns some state and multiple descendants can read or update it.

```jsx
// src/context/ThemeContext.jsx
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

Here, the Provider shares both:

- `theme`: the current state
- `toggleTheme`: an action that changes that state

The functional update, `setTheme((currentTheme) => ...)`, is safest when the new state depends on the previous state. React will re-render consumers after the context value changes.

## 6. `children` and wrapping the app

`children` means the JSX placed between a component's opening and closing tags.

```jsx
// src/main.jsx (or App.jsx)
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

`<App />` becomes the `children` prop of `ThemeProvider`. Because the Provider wraps the app, components anywhere below it can access the theme.

## 7. Theme switcher example

```jsx
// src/App.jsx
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <main className={`app ${theme}`}>
      <h1>{theme === "light" ? "Light mode" : "Dark mode"}</h1>
      <button onClick={toggleTheme}>Switch theme</button>
    </main>
  );
}

export default ThemeSwitcher;
```

Flow of data:

1. `ThemeProvider` owns `theme` state.
2. It passes `{ theme, toggleTheme }` through `value`.
3. `ThemeSwitcher` reads that object with `useContext`.
4. Clicking the button calls `toggleTheme`.
5. State changes, so React updates the UI with the new theme.

## 8. Organizing Context files

A simple beginner-friendly layout is:

```text
src/
  context/
    ThemeContext.jsx
  components/
    ThemeSwitcher.jsx
  App.jsx
  main.jsx
```

For a small context, keeping `createContext`, the Provider, and the custom Hook in one `ThemeContext.jsx` file is practical. As an app grows, use one context per clear concern: for example `AuthContext`, `ThemeContext`, or `CartContext`.

## 9. Custom Hook and guard error

A custom Hook avoids repeating imports and gives a clear error if the Provider is missing.

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
}
```

Usage becomes clean:

```jsx
import { useTheme } from "../context/ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```

The guard turns a confusing `null`/`undefined` error into a direct instruction: wrap the component tree in `ThemeProvider`.

## 10. Re-renders and object identity

Consumers re-render when the Provider receives a **different** `value`. Objects and arrays are compared by identity (whether they are the same object in memory), not by their contents.

```jsx
// A new object is created every time ThemeProvider renders.
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>
```

This is normal for many small apps. If performance becomes a real issue, memoize the value and keep unrelated state out of the same context.

```jsx
import { useMemo } from "react";

const value = useMemo(
  () => ({ theme, toggleTheme }),
  [theme, toggleTheme]
);

return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
```

Do not optimize early. First make the code clear; profile if the app actually becomes slow. Splitting one huge context into focused contexts often helps more than memoization.

## 11. Common mistakes

1. **Using a consumer outside the Provider**  
   Fix: place the Provider higher in the component tree, or use a custom Hook guard.

2. **Forgetting the `value` prop**  
   Fix: write `<MyContext.Provider value={...}>`.

3. **Calling `useContext` conditionally**  
   Fix: call it at the component's top level every render.

4. **Trying to use context in the same component before rendering its Provider**  
   A Provider only affects its descendants, not the component that returns it. Move the consumer into a child component.

5. **Mutating state directly**  
   Wrong: `theme = "dark"`.  
   Fix: use the state setter, such as `setTheme("dark")`.

6. **Putting unrelated, frequently changing data in one context**  
   This can make many consumers re-render. Prefer focused contexts.

7. **Using Context for every value**  
   Direct props are often simpler for local component communication.

## 12. Concise revision checklist

- [ ] I can explain prop drilling and when Context helps.
- [ ] I can create a context with `createContext` outside a component.
- [ ] I can wrap descendants with `<Context.Provider value={...}>`.
- [ ] I can read the closest Provider's value with `useContext(Context)`.
- [ ] I know that Provider values flow downward to descendants.
- [ ] I can combine `useState` with Context and share both state and update functions.
- [ ] I understand that `children` is the wrapped UI.
- [ ] I can organize a context in its own file and wrap the app at the right level.
- [ ] I can write a custom `useTheme` Hook with a missing-Provider guard error.
- [ ] I understand that changing the Provider value re-renders its consumers.
- [ ] I know objects have identity, so a new object can count as a changed context value.
- [ ] I know the common mistakes and when ordinary props are the clearer choice.

## One-sentence summary

Use React Context to make shared data and actions available to a component subtree without manually passing them through every intermediate component.
