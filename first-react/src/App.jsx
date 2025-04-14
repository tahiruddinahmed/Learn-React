import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";




function App() {
  function signUp(formData) {
    const data = Object.fromEntries(formData);
    const dietaryRestrictions = formData.getAll("dietaryRestrictions");

    const allData = {
      ...data,
      dietaryRestrictions
    }
    console.log(allData)
  }
  
  return (
    <section>
      <h1 className="heading">Sign Up Form</h1>
      
      <form action={signUp}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          defaultValue="01tahirahmed@gmail.com"
          type="email"
          name="email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          defaultValue="tahir@123"
          type="password"
          name="password"
        />

        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          id="desc"
          defaultValue="This is a description"
        ></textarea>

        <fieldset>
          <legend>Employement Status</legend>
          <div>
            <input
              type="radio"
              id="unemployement"
              name="employementStatus"
              value="unemployed"
            />
            <label htmlFor="unemployement">Unemployed</label>
          </div>
          <div>
            <input
              type="radio"
              id="part-time"
              name="employementStatus"
              value="part-time"
            />
            <label htmlFor="part-time">Part-Time</label>
          </div>
          <div>
            <input
              type="radio"
              id="full-time"
              name="employementStatus"
              defaultChecked={true}
              value="full-time"
            />
            <label htmlFor="full-time">Full-Time</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Dietary Restrictions</legend>
          <div>
            <input
              type="checkbox"
              id="koshar"
              name="dietaryRestrictions"
              value="koshar"
            />
            <label htmlFor="koshar">Koshar</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="vegan"
              name="dietaryRestrictions"
              value="vegan"
            />
            <label htmlFor="vegan">Vegan</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="glutan-free"
              name="dietaryRestrictions"
              defaultChecked={true}
              value="glutan-free"
            />
            <label htmlFor="glutan-free">Glutan-free</label>
          </div>
        </fieldset>

        <label htmlFor="favColor">What is your favorite Color?</label>
        <select name="favColor" id="favColor" defaultValue="">
          <option value="">-- Choose a Color --</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="pink">Pink</option>
          <option value="violet">Violet</option>
        </select>

        <button>Submit</button>
      </form>
    </section>
  );
}

export default App;
