1. What do props help us accomplish?
Props helps us to build a component dynamic. Its more like a functions property which is received in the form of objects


2. How do you pass a prop into a component?
we can pass prop into a component just like we pass properties in our regural html tags. The difference is that here we can create custom prop


3. Can I pass a custom prop (e.g. `blahblahblah={true}`) to a native
   DOM element? (e.g. <div blahblahblah={true}>) Why or why not?
No we can't pass custom prop to a native DOM element because it should not be defined

(No, because the JSX we use to describe native DOM elements will
be turned into REAL DOM elements by React. And real DOM elements
only have the prooperties/attributes specified in the HTML specification.
(Which doesn't include properties like `blahblahblah`))


4. How do I receive props in a component?
function Navbar() {
    return (
        <header>
            ...
        </header>
    )
}

I can receive prop while declaring the component 
function Navbar(prop) {
    return (
        <header>
            ...
        </header>
    )
}

5. What data type is `props` when the component receives it?
An object!