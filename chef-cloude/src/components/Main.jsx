import React, {useState} from "react";
export default function Main() {

    const [stateIngredients, setIngredients] = useState([])

    const IngredientsListItems = stateIngredients.map((item) => (
        <li key={item}>{item}</li>
    ));

    function addIngredients(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients((prevIngredient) => [...prevIngredient, newIngredient])
    }

    console.log(stateIngredients)
    /**
     * Challenge:
     * Using conditional rendering, only render the new <section> IF
     * there are ingredients added to the list of ingredients.
     */

    /**
     * Challenge:
     * Only display the div.get-recipe-container if the ingredients list
     * has more than 3 items in it. (Fewer than that and it might not
     * give great results from the chef 🤖👩‍🍳)
     */

    return (
        <main className="main">
            <form action={addIngredients} className="add-ingredient-form">
                <input 
                    type="text" 
                    aria-label="add ingrediant" 
                    placeholder="e.g. oregano"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            
            {stateIngredients.length > 0 ? <section>
                <h1>Ingredients on hands: </h1>
                <ul className="ingredients-list">
                    {IngredientsListItems}
                </ul>
                
                {stateIngredients.length > 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your lists of Ingredients</p>
                    </div>
                    <button>Get a recipe</button>
                </div>}
            </section> : null}
            
        </main>
    )
}