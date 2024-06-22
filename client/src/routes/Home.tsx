import { useAuth } from "../context/AuthContext";

function Home() {
    const authContext = useAuth();
    return (
        <main className="w-full min-h-[100vh] px-8 py-16">
            <h1 className="text-primary">
                Cook your coding skills to next level.
            </h1>
            <h1>{authContext.isAuthenticated && authContext.user.name}</h1>
        </main>
    );
}

export default Home;
