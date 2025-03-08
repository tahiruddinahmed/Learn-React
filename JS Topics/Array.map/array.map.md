1. What does the `.map()` array method do?
`array.map()` in Javascript is a built-in array method that creates a new array by applying a provided function to every element in the original array.

2. What do we usually use `.map()` for in React?
In React, `.map()` is most commonly used to transform array of data into JSX elements or React Components, especially when rendering dynamic lists. 

3. Critical thinking: why is using `.map()` better than just
   creating the components manually by typing them out?
   1. We often don't have the data ahead of time when we're building
       the app, so we simply can't manually type them out.
   2. It makes our code more "self-sustaining" - not requiring additional
       changes to the code whenever the data changes.