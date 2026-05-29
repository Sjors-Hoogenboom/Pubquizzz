import { useCallback, useEffect, useState, type ReactNode } from "react";

import { fetchDisplayNameApi } from "@/api/http";

import { AuthContext } from "./AuthContext";
import type { AuthUser } from "./authTypes";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );
    const [loading, setLoading] = useState(true);

    const login = useCallback((newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }, []);

    useEffect(() => {
        let isCancelled = false;

        setLoading(true);

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        fetchDisplayNameApi()
            .then((data: AuthUser) => {
                if (!isCancelled) {
                    setUser(data);
                }
            })
            .catch(() => {
                if (!isCancelled) {
                    logout();
                }
            })
            .finally(() => {
                if (!isCancelled) {
                    setLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [token, logout]);

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}