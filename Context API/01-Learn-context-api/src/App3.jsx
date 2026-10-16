import Dashboard from "./Components/CustomHook/Dashboard";
import { UserProvider } from "./Context/UserContext";

function App3() {
    return (
        <UserProvider>
            <Dashboard />
        </UserProvider>
    )
}

export default App3;