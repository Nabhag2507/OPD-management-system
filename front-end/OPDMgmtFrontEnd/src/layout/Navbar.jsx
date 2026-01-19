import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (role === "ADMIN") navigate("/admin");
        else if (role === "DOCTOR") navigate("/doctor");
        else if (role === "RECEPTIONIST") navigate("/receptionist");
        else if (role === "PATIENT") navigate("/patient");
        else navigate("/");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <span
                    className="navbar-logo clickable"
                    onClick={handleLogoClick}
                >
                    MediCore
                </span>
            </div>

            <div className="navbar-right">
                <span className="navbar-role">{role}</span>
                <button className="btn-secondary" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;
