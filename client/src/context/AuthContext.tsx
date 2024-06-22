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
    setAuthenticated: (newState: boolean) => void;
    user: IUser;
    setUser: (newState: IUser) => void;
    getUserData: (token: string) => void;
};

type IUser = {
    id: number;
    email: string;
    name: string;
};

const initialContext = {
    isAuthenticated: false,
    setAuthenticated: () => {},
    user: {
        id: 0,
        email: "",
        name: "",
    },
    setUser: () => {},
    getUserData: () => {},
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
                console.log(storedUser);
                setUser(storedUser);
                setAuthenticated(true);
            }
        };
        fetchUser();
    }, []);

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
            console.log(response);
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
                setAuthenticated,
                user,
                setUser,
                getUserData,
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
