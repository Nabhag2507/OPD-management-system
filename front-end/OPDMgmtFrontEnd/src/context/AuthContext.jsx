import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedRole = localStorage.getItem("role");
        if (savedRole) {
            setRole(savedRole);
        }
        setLoading(false);
    }, []);

    const login = (selectedRole) => {
        setRole(selectedRole);
        localStorage.setItem("role", selectedRole);
    };

    const logout = () => {
        setRole(null);
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{ role, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
