import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role: allowedRole, children }) => {
    const { role, loading } = useAuth();

    // wait for auth hydration
    if (loading) {
        return null; // or a spinner later
    }

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
