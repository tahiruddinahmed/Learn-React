export default function IngredientsList(props) {
    const IngredientsListItems = props.stateIngredients.map((item) => (
        <li key={item}>{item}</li>
      ));
    return (
        <section>
          <h1>Ingredients on hands: </h1>
          <ul className="ingredients-list">{IngredientsListItems}</ul>

          {props.stateIngredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your lists of Ingredients</p>
              </div>
              <button onClick={props.getRecipe}>Get a recipe</button>
            </div>
          )}
        </section>
    )
}