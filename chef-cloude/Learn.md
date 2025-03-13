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