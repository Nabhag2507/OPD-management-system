import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ role: allowedRole, children }) => {
    const { role, loading } = useAuth();
    const normalizedAllowedRole = allowedRole?.toUpperCase();

    if (loading) {
        return null;
    }

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (normalizedAllowedRole && role !== normalizedAllowedRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
