import {createContext, useContext, useEffect, useState} from "react";
import {fetchDisplayName} from "@/api/http.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            fetchDisplayName()
                .then(data => setUser(data))
                .catch(() => {
                    logout();
                })
        }
        else {
            setUser(null);
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);