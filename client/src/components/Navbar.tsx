import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Navbar() {
    const authContext = useAuth();
    return (
        <nav className="w-full h-14 text-center pt-2">
            <div className="w-full max-w-2xl h-full px-2 py-6 mx-auto border-2 border-slate-800 rounded-full flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img
                        src="/codecook.png"
                        alt="logo"
                        className="size-8 rounded-full"
                    />
                    <h2 className="text-xl font-playright">CodeCook</h2>
                </div>
                <div className="flex gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? ""
                                : isActive
                                ? "underline"
                                : "hover:underline transition-all"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/submissions"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? ""
                                : isActive
                                ? "underline"
                                : "hover:underline transition-all"
                        }
                    >
                        Submissions
                    </NavLink>
                </div>
                <div className="flex items-center gap-2">
                    {authContext.isAuthenticated ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="size-8 rounded-full bg-blue-500 text-clip grid place-items-center p-0">
                                        <p className="font-roboto text-white">
                                            {authContext.user.name[0]}
                                        </p>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={authContext.logout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            {" "}
                            <NavLink to="/login">
                                <Button
                                    className="rounded-full"
                                    variant="ghost"
                                >
                                    Log in
                                </Button>
                            </NavLink>
                            <NavLink to="/signup">
                                <Button className="rounded-full">
                                    Sign up
                                </Button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
