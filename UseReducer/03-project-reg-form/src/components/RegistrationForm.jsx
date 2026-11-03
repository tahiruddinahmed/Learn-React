import { useReducer } from "react"


const initialState = {
    name: "",
    email: "",
    password: "",
    loading: false,
    error: ""
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_NAME': 
            return {
                ...state,
                name: action.payload
            };
        case 'UPDATE_EMAIL': 
            return {
                ...state,
                email: action.payload
            };
        case 'UPDATE_PASSWORD': 
            return {
                ...state,
                password: action.payload
            };
        case 'SUBMIT': 
            return {
                ...state,
                loading: true,
                error: ""
            };
        case "ERROR": 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'RESET': 
            return initialState;

        default: 
            return state;
        

    }
}



function RegistrationForm() {
    const [state, dispatch] = useReducer(reducer, initialState)


    function formSubmit(e) {
        e.preventDefault();
        if(state.name.trim() === "" || state.email.trim() === "" || state.password.trim() === "") {
            // setError("All fields are required");
            dispatch({type: 'ERROR', payload: "All fields are required" })
            return;
        }

        
        console.log("Form submitted")
        dispatch({type:"SUBMIT"})
    }
    
    // console.log(state.name)
    return (
        <form 
            onSubmit={formSubmit}
        >
            <div>
                {state.error && (
                    <p>{state.error}</p>
                )}
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    value={state.name}
                    onChange={(e) => dispatch({type: 'UPDATE_NAME', payload: e.target.value})}
                    placeholder="enter you name..." 
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={state.email}
                    onChange={(e) => dispatch({type: 'UPDATE_EMAIL', payload: e.target.value})}
                    placeholder="enter yours@mail.com"
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={state.password}
                    onChange={(e) => dispatch({type: 'UPDATE_PASSWORD', payload: e.target.value})}
                    placeholder="Enter your strong password"
                />
            </div>

            <button 
                type="submit"
            >Submit</button>

            <button
                type="button" 
                onClick={() => dispatch({type: 'RESET'})}
            >Reset</button>
        </form>
    )

}


export default RegistrationForm