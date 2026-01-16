import {createContext, useContext, useEffect, useState} from "react";
import {fetchDisplayNameApi} from "@/api/http.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        if (token) {
            fetchDisplayNameApi()
                .then(data => setUser(data))
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        else {
            setUser(null);
            setLoading(false);
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
        <AuthContext.Provider value={{token, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);