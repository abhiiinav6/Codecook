import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import { Toaster } from "./components/ui/toaster";
import Signup from "./routes/Signup.tsx";
import Login from "./routes/Login.tsx";

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/ping", element: <h1>Pong</h1> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AuthProvider>
    </React.StrictMode>
);
