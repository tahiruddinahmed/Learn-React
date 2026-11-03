import { useState } from "react"

function RegistrationForm_UseState() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    function formSubmit(e) {
        e.preventDefault();
        if(name.trim() === "" || email.trim() === "" || password.trim() === "") {
            setError("All fields are required");
            return;
        }

        setError("")
        console.log("Form submitted")
    }
    
    return (
        <form onSubmit={formSubmit}>
            <div>
                {error && (
                    <p>{error}</p>
                )}
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="enter you name..." 
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter yours@mail.com"
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your strong password"
                />
            </div>

            <button 
                type="submit"
            >Submit</button>
        </form>
    )

}


export default RegistrationForm_UseState