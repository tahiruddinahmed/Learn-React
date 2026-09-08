import { useState } from "react";

function Form() {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('')


    const handleUsername = (e) => {
        const { value } = e.target;
        setUsername(value);


        if(value.length < 6) {
            setUsernameError('Username name must be 6 character')
        } else {
            setUsernameError('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(usernameError) {
            alert('Unable to submit, form contains an error!')
        } else {
            alert(username)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex">
            Username: 
            <div>
                <input 
                    type="text" 
                    name="username" 
                    value={username}
                    className="border border-gray-300 rounded ms-4 px-2 py-1"
                    onChange={handleUsername}
                
                />
                <p className="text-sm text-red-500 mt-1">
                    {usernameError}
                </p>
            </div>

            <button className="bg-green-500 border border-green-700 px-4 py-1 text-white">Submit</button>
        </form>
    )
}


export default Form;