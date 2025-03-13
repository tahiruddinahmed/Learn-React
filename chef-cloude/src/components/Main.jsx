export default function Main() {
    const ingrediants = ['Mango', 'Orange', 'Banana'];

    const IngredientsListItems = ingrediants.map((item) => (
        <li key={item}>{item}</li>
    ));

    function handleForm(e) {
        e.preventDefault();
        // console.log("Form is submitted");

        const formData = new FormData(e.currentTarget);
        const newIngredient = formData.get("ingredient");
        console.log(newIngredient);
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