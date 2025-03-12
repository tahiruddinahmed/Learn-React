export default function Main() {
    return (
        <main className="main">
            <form>
                <input 
                    type="text" 
                    aria-label="add ingrediant" 
                    placeholder="e.g. oregano"
                />
                <button>Add ingredient</button>
            </form>
        </main>
    )
}