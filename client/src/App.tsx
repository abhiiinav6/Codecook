import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
    useEffect(() => {
        name();
    }, []);
    async function name() {
        await fetch("http://localhost:3069/ping", {
            method: "POST",
        });
        await fetch("http://localhost:3069/ping");
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
