import { useEffect, useState } from "react";

const Network = () => {
    const [todos, setTodos] = useState([])


    useEffect(() => {
        getData()
    }, []) // empty array [] means the useEffect will run once when the component loads 


    const getData = async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');

        // convert the response to javascript object 
        const tasks = await response.json()

        // I want only 10 records 
        const data = structuredClone(tasks.slice(0, 10));

        setTodos(prevItems => [data, ...prevItems])
    }

    return (
        <>
            <h1>Hello</h1>

            {console.log(todos)}
            {todos && todos.map((todo) => todo.map(items => {
                return (
                    <div key={items.id} className="py-4 px-3 bg-white mb-2 rounded flex justify-between items-center">
                        <p className="capitalize">{items.title}</p>
                        {items.completed ? 
                            <label className="text-[12px] flex items-center gap-2">
                                <input type="checkbox" name="iscompleted"
                                    checked={items.completed}
                                    className="h-3 w-3 accent-orange-600 rounded"
                                /> 
                                Completed
                            </label>
                            
                        : 
                        <p className="text-[12px] px-4 py-2 rounded-full bg-red-400/10 border border-red-500/40 text-gray-800/90">Not Complete yet</p> 
                
                    
                    }
                    </div>
                )
            }))}

        </>

    )
}


export default Network



/*
The useEffect hook: when you create a React Application that need to synchronize with 
a system outside the react. then we need useEffect Hook


This allows you to run some code after rendering so that you can 
synchronize your component with some system outside of React. 


we will use this 
https://jsonplaceholder.typicode.com/todos/1

*/