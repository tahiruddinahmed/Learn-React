import React, { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import "../ai.js"
import { getRecipeFromMistral } from "../ai.js";

export default function Main() {
  const [stateIngredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");

  function addIngredients(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

    // api key = 

  async function getRecipe() {
    const generatedRecipe = await getRecipeFromMistral(stateIngredients)
    setRecipe(generatedRecipe)
  }

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

      {stateIngredients.length > 0 ? <IngredientsList stateIngredients={stateIngredients} getRecipe={getRecipe} /> : null}

      {recipe.length > 0 ? <ClaudeRecipe recipe={recipe} />  : null}
    </main>
  );
}
