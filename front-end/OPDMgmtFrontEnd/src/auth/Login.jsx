import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [role, setRole] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!role) return;

        login(role);

        if (role === "ADMIN") navigate("/admin");
        if (role === "DOCTOR") navigate("/doctor");
        if (role === "RECEPTIONIST") navigate("/receptionist");
        if (role === "PATIENT") navigate("/patient");
    };

    return (
        <div className="auth-page">
            <div className="auth-card slide-in">
                <h2 className="auth-title">Sign in to MediCore</h2>

                <form className="auth-form">
                    <label>
                        Role
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="RECEPTIONIST">Receptionist</option>
                            <option value="PATIENT">Patient</option>
                        </select>
                    </label>

                    <label>
                        Email
                        <input type="email" placeholder="ignored@example.com" />
                    </label>

                    <label>
                        Password
                        <input type="password" placeholder="ignored" />
                    </label>

                    <button
                        type="button"
                        className="btn-gradient full"
                        onClick={handleLogin}
                        disabled={!role}
                    >
                        Sign in
                    </button>
                </form>

                <p className="auth-footer">
                    New here?{" "}
                    <Link to="/signup" className="auth-link">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
