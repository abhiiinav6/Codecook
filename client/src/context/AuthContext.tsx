import axios from "axios";
import {
    useState,
    useContext,
    createContext,
    ReactNode,
    useEffect,
} from "react";

type IAuthContext = {
    isAuthenticated: boolean;
    user: IUser;
    getUserData: (token: string) => void;
    logout: () => void;
    access_token: string;
};

type IUser = {
    id: number;
    email: string;
    name: string;
};

const initialContext = {
    isAuthenticated: false,
    user: {
        id: 0,
        email: "",
        name: "",
    },
    getUserData: () => {},
    logout: () => {},
    access_token: "",
};

const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(
        initialContext.isAuthenticated
    );

    const [user, setUser] = useState(initialContext.user);
    const [access_token, setaccess_token] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user")!);
            const storedToken = localStorage.getItem("access_token")!;

            if (storedUser) {
                setUser(storedUser);
                setAuthenticated(true);
            }
            if (storedToken) {
                setaccess_token(storedToken);
            }
        };
        if (!isAuthenticated) {
            fetchUser();
        }
    }, [isAuthenticated]);

    async function logout() {
        await axios.get(`${import.meta.env.VITE_API}/auth/logout`);
        setAuthenticated(false);
        setUser({ name: "", email: "", id: 0 });
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
    }

    async function getUserData(access_token: string) {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}/auth/me`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: access_token,
                    },
                }
            );
            setAuthenticated(true);
            setUser(response.data.data);
            setaccess_token(access_token);
            localStorage.setItem("user", JSON.stringify(response.data.data));
            localStorage.setItem("access_token", access_token);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                getUserData,
                logout,
                access_token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;
