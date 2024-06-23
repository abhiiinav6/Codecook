import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import { Toaster } from "./components/ui/toaster";
import Signup from "./routes/Signup.tsx";
import Login from "./routes/Login.tsx";
import Home from "./routes/Home.tsx";
import Problem from "./routes/Problem.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/ping", element: <h1>Pong</h1> },
            { path: "/signup", element: <Signup /> },
            { path: "/login", element: <Login /> },
            { path: "/submissions", element: <h1>Submissions</h1> },
            { path: "/problems/:problemId", element: <Problem /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AuthProvider>
    </React.StrictMode>
);
