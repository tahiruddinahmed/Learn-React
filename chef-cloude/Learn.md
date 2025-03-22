# Topic Learned during this project 

 ## Event Listeners 

  - MouseEvent handler function 
     - Docs: [Learn MourseEvent](https://react.dev/reference/react-dom/components/common#mouseevent-handler)

  - Event Handlers 
     - Docs: [Learn Event Handlers](https://react.dev/learn/responding-to-events)

 ## Map Ingredient List 
    Challenge:
      - Add an `onSubmit` event listener on the form. Have the function
      - simply console.log("Form submitted!") for now
   
 ## Difference between Props VS State

 ### Props 
  Props refers to the properties being passed into a component in order for it to work correctly, Similar to how a function receives parameters: From above, A component receiving props is not allowed to modify those props (e.i, they are "immutable")

 ### State 
  State refers to values that are managed by the component, Similar to variables declare inside a function. Any time you have changing the values that should be saved/displayed, you'll likely be using `State`.

 ### View as a function of State 
  1. <b>Render<b>: React runs your functions and displays whatever gets returned. The function will only be run again if - 
    i. It receives new props from above.
    ii. its internal value change.

  2. <b>setState</b>: Changing a local, no-state variable doesn't change React to re-render the component. Changing state with a buil-in `setState` function does. 

  3. <b>view = function(state)</b>: Thus, when state changes and React re-runs(re-renders) your component, something new gets returned and replaces what used to be on the page. 


### State Quick Quize 
1. You have 2 options for what you can pass in to a
   state setter function (e.g. `setCount`). What are they?
   1. Pass the new version of state that we want to use as the 
      replacement for the old version of state.
   2. Pass a callback function. Must return what we want the new
      value of state to be. Will receive the old version of state
      as a parameter so we can use it to help determine what we want 
      the new value of state to be.

2. When would you want to pass the first option (from answer
   above) to the state setter function?
   
   Whenever we don't really care about (or need) the old value,
   we simply want to set a new value.


3. When would you want to pass the second option (from answer
   above) to the state setter function?

   Whenever we do care about the previous value in state and need
   it to help us determine what the new value should be.


## Conditional Rendering 

1. What is "conditional rendering"?
When we want to only sometimes display something on the page
based on some kind of condition.


2. When would you use &&?
When you want to either display something or NOT display something.


3. When would you use a ternary?
When you need to decide which of 2 things to display


4. What if you need to decide between > 2 options on
   what to display?
if...else if...else conditional or maybe a `switch` statement.
