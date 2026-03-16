import { useState } from "react";
import AuthContext from "./auth-context";

const normalizeRole = (role) => (role || "").toUpperCase();
const getStoredAuthState = () => {
    if (typeof window === "undefined") {
        return { role: null, user: null, token: null, loading: true };
    }

    const savedRole = localStorage.getItem("role");
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    let parsedUser = null;

    if (!savedUser) {
        if (!savedToken) {
            localStorage.removeItem("token");
        }

        return { role: null, user: null, token: savedToken || null, loading: false };
    }

    try {
        parsedUser = JSON.parse(savedUser);
    } catch {
        parsedUser = null;
    }

    const normalizedRole = normalizeRole(savedRole || parsedUser?.role);

    if (!normalizedRole || !parsedUser) {
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        if (!savedToken) {
            localStorage.removeItem("token");
        }

        return { role: null, user: null, token: savedToken || null, loading: false };
    }

    const user = { ...parsedUser, role: normalizedRole };
    return { role: normalizedRole, user, token: savedToken || null, loading: false };
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(getStoredAuthState);
    const { role, user, token, loading } = authState;

    const login = (authUser, authToken) => {
        if (!authUser) {
            return;
        }

        const normalizedRole = normalizeRole(authUser?.role);
        const nextUser = { ...authUser, role: normalizedRole };

        setAuthState({
            role: normalizedRole,
            user: nextUser,
            token: authToken || null,
            loading: false,
        });

        localStorage.setItem("role", normalizedRole);
        localStorage.setItem("user", JSON.stringify(nextUser));

        if (authToken) {
            localStorage.setItem("token", authToken);
        }
    };

    const logout = () => {
        setAuthState({
            role: null,
            user: null,
            token: null,
            loading: false,
        });
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ role, user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
