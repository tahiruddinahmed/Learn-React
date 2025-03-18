import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // function handleForm(event) {
  //   event.preventDefault();
  //   const formEl = event.currentTarget;
  //   const formData = new FormData(formEl);
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   console.log(email, password);

  //   formEl.reset()
  // }

  function signUp(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);
  }

  return (
    <section>
      <h1 className='heading'>Sign Up Form</h1>
      <form action={signUp}>
        <label htmlFor="email">Email</label>
        <input id='email' type="email" name='email'/>

        <label htmlFor="password">Password</label>
        <input id='password' type="password" name='password' />

        <button>Submit</button>
      </form>
    </section>
  )
}

export default App
