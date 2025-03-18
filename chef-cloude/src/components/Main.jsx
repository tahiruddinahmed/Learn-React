import React, {useState} from "react";
export default function Main() {

    const [stateIngredients, setIngredients] = useState([])

    const IngredientsListItems = stateIngredients.map((item) => (
        <li key={item}>{item}</li>
    ));

    /**
     * Challenge: use form action instead of onSubmit to
     * handle the data from the form
     */

    function addIngredients(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients((prevIngredient) => [...prevIngredient, newIngredient])
    }

    return (
        <main className="main">
            <form action={addIngredients}>
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