import React, {useState} from "react";
export default function Main() {

    /**
     * Challenge: Update our app so that when the user enters a
     * new ingredient and submits the form, it adds that new
     * ingredient to our list!
     */

    const [stateIngredients, setIngredients] = useState([])

    // const ingrediants = ['Mango', 'Orange', 'Banana'];

    const IngredientsListItems = stateIngredients.map((item) => (
        <li key={item}>{item}</li>
    ));


    function handleForm(e) {
        e.preventDefault();
        // console.log("Form is submitted");

        const formData = new FormData(e.currentTarget);
        const newIngredient = formData.get("ingredient");
        setIngredients((prevIngredient) => [...prevIngredient, newIngredient])
    }

    return (
        <main className="main">
            <form onSubmit={handleForm}>
                <input 
                    type="text" 
                    aria-label="add ingrediant" 
                    placeholder="e.g. oregano"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            <ul>
                {IngredientsListItems}
            </ul>
        </main>
    )
}