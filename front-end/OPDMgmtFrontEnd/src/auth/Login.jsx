import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import authService from "../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const goToDashboard = (role) => {
        if (role === "ADMIN") navigate("/admin");
        if (role === "DOCTOR") navigate("/doctor");
        if (role === "RECEPTIONIST") navigate("/receptionist");
        if (role === "PATIENT") navigate("/patient");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const response = await authService.login(email, password);
            if (!response.user) {
                throw new Error("Login failed");
            }
            login(response.user, response.token);
            goToDashboard(response.user.role);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card slide-in">
                <h2 className="auth-title">Sign in to MediCore</h2>

                <form className="auth-form" onSubmit={handleLogin}>
                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit" className="btn-gradient full" disabled={submitting}>
                        {submitting ? "Signing in..." : "Sign in"}
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
