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
};

const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(
        initialContext.isAuthenticated
    );

    const [user, setUser] = useState(initialContext.user);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user")!);
            if (storedUser) {
                setUser(storedUser);
                setAuthenticated(true);
            }
        };
        fetchUser();
    }, []);

    async function logout() {
        await axios.get(`${import.meta.env.VITE_API}/auth/logout`);
        setAuthenticated(false);
        setUser({ name: "", email: "", id: 0 });
        localStorage.removeItem("user");
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
            localStorage.setItem("user", JSON.stringify(response.data.data));
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
