import { useAuth } from "./context/AuthContext";

function App() {
    const authContext = useAuth();
    console.log(authContext)
    return (
        <>
            <h1 className="text-primary">Namaste World!</h1>
            <h1>{authContext.isAuthenticated && authContext.user.name }</h1>
        </>
    );
}

export default App;
