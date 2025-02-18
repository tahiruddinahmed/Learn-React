1. Where does React put all of the elements I create in JSX when I call `root.render()`

answer: All the elements I render get put inside the div with the id of `root` (or whatever other element I might select when calling createRoot) 

2. What would show up in my console if I were to run this line of code:
```
console.log(<h1>Hello, World<h1/>)
```
answer: An Object! Unlike creating an HTML element in vanilla DOM JS, what gets created from the JSX we have inour React code is a plain JS object that React will use to fill in the view. 


3. What's wrong with this code: 
```
root.render(
    <h1>Hi there<h1/>
    <p>This is my website<p/>
)
```
answer: render() method can't render more than one element. So, it will give an error. To fix the issue we need to wrap the `h1` and `p` tag in a parent element. You can render 1 parent element at a time. That parent element can have as many children elements as you want.

4. What does it mean for something to be `declarative` instead of `imperative`?
answer: *Imperative* means we need to give specific step-by-step instructions on how to accomplish a task. 

*Delcarative* means we can write our code to simple "describe" *what* should show up on the page and allow the rool (React, e.g) to handle the details on *how* to put those things on the page. 


5. What does it mean for something to be `composable`?

answer: We have small pieces that we can put together to make something larger or greater than the individual pieces themselves. 
